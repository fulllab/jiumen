const fs = require('fs');
const path = require('path');
const Arweave = require('arweave');
const { SmartWeaveNodeFactory, LoggerFactory } = require('redstone-smartweave');
const { default: ArLocal } = require('arlocal');
const jwk = require('../../.secrets/jwk.json');

(async () => {
  const env = process.env.NODE_ENV || 'arlocal';
  require('dotenv').config({ path: `.env.${env}` })
  console.log(process.env.VITE_ARWEAVE_HOST);

  const readJson = file => {
    return fs.readFileSync(path.join(__dirname, file), 'utf8');
  }

  const write = (name, data) => {
    return fs.writeFileSync(path.join(__dirname, name), JSON.stringify(data))
  }

  const isArLocal = env == 'arlocal';
  const isPro = env == 'production';

  const { VITE_ARWEAVE_HOST, VITE_ARWEAVE_PROTOCOL, VITE_PORT } = process.env

  // Start arlocal
  if (isArLocal) {
    const arLocal = new ArLocal({
      port: VITE_PORT,
      showLogs: false
    });
    await arLocal.start();
  }

  // Set up Arweave client
  const arweave = Arweave.init({
    port: VITE_PORT,
    host: VITE_ARWEAVE_HOST,
    protocol: VITE_ARWEAVE_PROTOCOL,
    timeout: 200000,
  });

  const mine = () => isPro && arweave.api.get('mine');

  const address = await arweave.wallets.jwkToAddress(jwk);

  // Minting token for deployment
  if (!isPro) {
    // It is not necessary to get balance
    const balance = await arweave.wallets.getBalance(address)
    if (balance < 10000000000) {
      await arweave.api.get(`mint/${address}/1000000000000000`);
      await mine();
    }
  }
  LoggerFactory.INST.logLevel('debug');

  const smartweave = SmartWeaveNodeFactory.memCached(arweave)
  // ?
  // : SmartWeaveWebFactory.memCachedBased(arweave)
  //   .setInteractionsLoader(
  //     new RedstoneGatewayInteractionsLoader(redstoneGateway),
  //   )
  //   .build()

  const contractSrc = readJson('./jiumen/contract.js');
  // push contract deployer to members
  let initialState = JSON.parse(readJson('./jiumen/initial-state.json'));

  if (initialState[env].members.indexOf(address) == -1) {
    initialState[env].members.push(address)
    await write('./jiumen/initial-state.json', initialState)
  }

  console.log(initialState[env]);

  const contractTxId = await smartweave.createContract.deploy({
    wallet: jwk,
    initState: JSON.stringify(initialState[env]),
    src: contractSrc,
  });
  await mine();

  let deployed = JSON.parse(readJson('./deployed.json'))
  deployed[env] = contractTxId
  await write('./deployed.json', deployed)
  console.log('Deployment completed: ' + contractTxId);
})();
