// Injected component used to connect MetaMask to specific blockchains

import { InjectedConnector } from ‘@web3-react/injected-connector’



// The supportedChainIds will help to make sure MetaMask is connected to the proper chains my app is using, otherwise it won’t show active in our custom hook
  // 1 = Ethereum mainnet
  // 42 = Kovan testnet
  // 1337 = Local Host chain

export const injected = new InjectedConnector({ supportedChainIds: [1, 42, 1337] })