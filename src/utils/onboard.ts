import { init } from '@web3-onboard/vue'
import injectedModule from "@web3-onboard/injected-wallets";

// RPC urls
const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/";

// Injected wallet
const injected = injectedModule();

export const initWeb3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: MAINNET_RPC_URL,
    },
  ],
  appMetadata: {
    name: "Passport",
    icon: "/assets/gitcoinLogo.svg",
    logo: "/assets/gitcoinLogo.svg",
    description: "Decentralized Identity Verification",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    }
  }
});
