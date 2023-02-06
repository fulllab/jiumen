import { readdir, readFile, writeFile } from "node:fs/promises";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ModelManager } from "@glazed/devtools";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";
import path from 'path';

import fs from "fs";

const dirPath = "./scripts/models";

const env = process.env.NODE_ENV || 'arlocal';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${env}` });

const VITE_CERAMIC_CLIENT = process.env.VITE_CERAMIC_CLIENT;
const SEED = process.env.VITE_SEED;

const seed = fromString(SEED.toLowerCase(), "base16");

// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(seed),
  resolver: getResolver(),
});
await did.authenticate();

// Connect to the local Ceramic node
const ceramic = new CeramicClient(VITE_CERAMIC_CLIENT);
ceramic.did = did;

// Create a manager for the model
const manager = new ModelManager(ceramic);

let files = await readdir(dirPath);
files.forEach(async (filename) => {
  let filedir = path.join(dirPath, filename);
  let stats = fs.statSync(filedir);
  let isFile = stats.isFile();
  if (isFile) {
    const file = await readFile(filedir, "utf-8")
    const model = JSON.parse(file);

    // Pass in schema name and json
    const schemaId = await manager.createSchema(model.title, model);

    // Create the definition using the created schema ID
    await manager.createDefinition(model.title, {
      name: model.title,
      description: model.description,
      schema: manager.getSchemaURL(schemaId),
    });

    await writeFile(
      new URL("create-model.json", import.meta.url),
      JSON.stringify(manager.toJSON())
    );
  }
});

console.log("Encoded model written to scripts/create-model.json file");
