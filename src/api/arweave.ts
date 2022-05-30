// @ts-nocheck
import Arweave from 'arweave'
import deployedContracts from '@/contract/deployed.json'
import { url } from '@/settings/url'

const { MODE, VITE_ARWEAVE_HOST, VITE_ARWEAVE_PROTOCOL, VITE_PORT } = import.meta.env

const arMode = MODE == 'arlocal' ? 'arlocal' : 'production'

// Set up Arweave client
const arweave = Arweave.init({
  port: VITE_PORT,
  host: VITE_ARWEAVE_HOST,
  protocol: VITE_ARWEAVE_PROTOCOL,
});

// Set up SmartWeave client
// LoggerFactory.INST.logLevel('debug')
const smartweave = arMode == 'arlocal'
  ? rsdk.SmartWeaveWebFactory.memCached(arweave)
  : rsdk.SmartWeaveWebFactory.memCachedBased(arweave)
      .setInteractionsLoader(new rsdk.RedstoneGatewayInteractionsLoader(url.redstoneGateway))
      .build()

// Interacting with the contract
const contract = smartweave
  .contract(deployedContracts[arMode])
  .connect('use_wallet');

export default contract
