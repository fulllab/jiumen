// @ts-nocheck
import Arweave from 'arweave'
import deployedContracts from '@/contract/deployed.json'
import { url } from '@/settings/url'
import jwk from '../../.secrets/jwk.json'
import { useMessage } from '@/hooks/useMessage'
import { pushJob, removeJob} from '@/hooks/useScheduler'

const { MODE, VITE_ARWEAVE_HOST, VITE_ARWEAVE_PROTOCOL, VITE_PORT } = import.meta.env

const arMode = MODE == 'arlocal' ? 'arlocal' : 'production'

const isArlocal = arMode == 'arlocal'

// Set up Arweave client
const arweave = Arweave.init({
  port: VITE_PORT,
  host: VITE_ARWEAVE_HOST,
  protocol: VITE_ARWEAVE_PROTOCOL,
})

// Set up SmartWeave client
// LoggerFactory.INST.logLevel('debug')
const smartweave = isArlocal
  ? rsdk.SmartWeaveNodeFactory.memCached(arweave)
  : rsdk.SmartWeaveWebFactory.memCachedBased(arweave)
      .setInteractionsLoader(
        new rsdk.RedstoneGatewayInteractionsLoader(url.redstoneGateway),
      )
      .build()

// Interacting with the contract
const contract = smartweave
  .contract(deployedContracts[arMode])
  .connect(isArlocal ? jwk : 'use_wallet')

const mineOrWait = (transactionId) => {
  if (isArlocal) {
    return arweave.api.get('mine')
  }else {
    pushJob(
      waitForConfirmation,
      transactionId
    )
  }
}

function waitForConfirmation(transactionId) {
  const { notification } = useMessage()
  getStatus(transactionId).then((status)=>{
    if (status) {
      removeJob(
        waitForConfirmation,
        transactionId
      )
      notification.success({
        message: `Confirmed`,
        description: `Transaction ${transactionId} confirmed`,
        duration: 3,
      })
    }
  })
  .catch((err)=>{
    removeJob(
      waitForConfirmation,
      transactionId
    )
    notification.error({
      message: `Fail`,
      description: `Transaction ${transactionId} Fail: ${err}`,
      duration: 3,
    })
  })
}

const getStatus = transactionId => {
  return new Promise((resolve, reject) => {
    arweave.transactions
      .getStatus(transactionId)
      .then(statusAfterMine => {
        if (statusAfterMine.confirmed === null) {
          console.log(
            `Transaction ${transactionId} not yet confirmed.`,
            statusAfterMine,
          )
          resolve(false)
        } else {
          resolve(true)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export { contract, mineOrWait, getStatus, waitForConfirmation }
