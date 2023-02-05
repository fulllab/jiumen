import { readFile, writeFile } from "node:fs/promises";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ModelManager } from "@glazed/devtools";

const env = process.env.NODE_ENV || 'arlocal';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${env}` });

const VITE_CERAMIC_CLIENT = process.env.VITE_CERAMIC_CLIENT;

console.log("VITE_CERAMIC_CLIENT", VITE_CERAMIC_CLIENT);
const ceramic = new CeramicClient(VITE_CERAMIC_CLIENT);

// Load and create a manager for the model
const bytes = await readFile(new URL("create-model.json", import.meta.url));
const manager = ModelManager.fromJSON(ceramic, JSON.parse(bytes.toString()));

// Write model to JSON file
const model = await manager.toPublished();
await writeFile(
  new URL("publish-model.json", import.meta.url),
  JSON.stringify(model)
);

console.log("Model written to publish-model.json file:", model);
