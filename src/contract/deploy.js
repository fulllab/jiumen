const fs = require('fs');
const path = require('path');
const Arweave = require('arweave');
const { SmartWeaveNodeFactory, LoggerFactory } = require('redstone-smartweave');
const { default: ArLocal } = require('arlocal');
const jwk = require('../../.secrets/jwk.json');

(async () => {
  const env = process.env.NODE_ENV || 'arlocal';
  require('dotenv').config({ path: `.env.${env}` })
  console.log(process.env.ARWEAVE_HOST);

  const readJson = file => {
    return fs.readFileSync(path.join(__dirname, file), 'utf8');
  }

  const write = (name, data) => {
    return fs.writeFileSync(path.join(__dirname, name), JSON.stringify(data))
  }

  const isArLocal = env == 'arlocal';

  const { ARWEAVE_HOST, ARWEAVE_PROTOCOL, PORT } = process.env

  // Start arlocal
  if (isArLocal) {
    const arLocal = new ArLocal({
      port: PORT,
      showLogs: false
    });
    await arLocal.start();
  }

  // Set up Arweave client
  const arweave = Arweave.init({
    port: PORT,
    host: ARWEAVE_HOST,
    protocol: ARWEAVE_PROTOCOL,
  });

  const mine = () => isArLocal && arweave.api.get('mine');

  const address = await arweave.wallets.jwkToAddress(jwk);

  // Minting token for deployment
  if (isArLocal) {
    // It is not necessary to get balance
    const balance = await arweave.wallets.getBalance(address)
    if (balance < 10000000000) {
      await arweave.api.get(`mint/${address}/10000000000000`);
      await mine();
    }
    // Set up SmartWeave client
    LoggerFactory.INST.logLevel('debug');
  }

  const smartweave = SmartWeaveNodeFactory.memCached(arweave);

  const contractSrc = readJson('./jiumen/contract.js');
  // push contract deployer to members
  let initialState = JSON.parse(readJson('./jiumen/initial-state.json'));

  if (initialState[env].members.indexOf(address) == -1) {
    initialState[env].members.push(address)
    await write('./jiumen/initial-state.json', initialState)
  }

  const contractTxId = await smartweave.createContract.deploy({
    wallet: jwk,
    initState: JSON.stringify(initialState),
    src: contractSrc,
  });
  await mine();

  let deployed = JSON.parse(readJson('./deployed.json'))
  deployed[env] = contractTxId
  await write('./deployed.json', deployed)
  console.log('Deployment completed: ' + contractTxId);
})();
