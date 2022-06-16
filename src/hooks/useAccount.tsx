import { ref } from 'vue'

export function useAddress() {
  const walletLoaded = ref(false)
  const address = ref('')

  const connectToArconnect = async () => {
    console.log('Connecting to ArConnect')
    console.log(address.value, walletLoaded.value);

    if (window.arweaveWallet) {
      window.addEventListener('walletSwitch', async e => {
        console.log('walletSwitch', e)
        walletLoaded.value = true
        loadArweaveAddress()
      })
      window.addEventListener('arweaveWalletLoaded', async e => {
        console.log('arweaveWalletLoaded', e)
        walletLoaded.value = true
        loadArweaveAddress()
      })

      try {
        await loadArweaveAddress()
      } catch (e) {
        console.error(e)
        if (!address.value) {
          console.warn('Failed to get address. Connecting to ArConnect')
          await window.arweaveWallet.connect([
            'ACCESS_ADDRESS',
            'ACCESS_ALL_ADDRESSES',
            'SIGN_TRANSACTION',
            'ENCRYPT'
          ])
          await loadArweaveAddress()
        }
      }
    }
  }

  const loadArweaveAddress = async () => {
    if (!window.arweaveWallet) {
      throw new Error('Can not get address without arweaveWallet')
    } else {
      address.value = await window.arweaveWallet.getActiveAddress()
      walletLoaded.value = true
    }
  }

  return {
    address,
    walletLoaded,
    connectToArconnect,
  }
}

export default {
  useAddress
}
