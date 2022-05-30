// @ts-nocheck
import Arweave from 'arweave'
import deployedContracts from '@/contract/deployed.json'
import { url } from '@/settings/url'

const { MODE, ARWEAVE_HOST, ARWEAVE_PROTOCOL, PORT } = import.meta.env

const arMode = MODE == 'arlocal' ? 'arlocal' : 'production'

// Set up Arweave client
const arweave = Arweave.init({
  port: PORT,
  host: ARWEAVE_HOST,
  protocol: ARWEAVE_PROTOCOL,
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
