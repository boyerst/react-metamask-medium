// Custom Hook used...
  // To call connect and disconnect on our <Buttons>
  // To keep track of state and fetch data (account info, balance, etc.)

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { injected } from '../components/wallet/connectors'
import { useWeb3React } fr, '@web3-react/core'

// Use createContext to keep track of the State of this hook through the app's lifecycle
export const MetaMaskContext = React.createContext(null)



export const MetaMaskProvider = ({ children }) => {

  // Gather important info used to connect to MetaMask
  const { activate, account, library, connector, active, deactivate } = useWeb3React()

  // Use to tell if MetaMask is currently connected to the dapp via proper chain
  const [isActive, setIsActive] = useState(false)
  // Use to tell when MetaMask hook is loading to read its connection with MetaMask
  const [isLoading, setIsLoading] = useState(true)  


  // Accepts two args
    // 1. A function to connect
    // 2. An array that will store values that the 'connect' effect depends on
      // This useEffect will only execute when that anything in that dependent arg changes
  useEffect(() => {
    connect().then(val => {
      setIsLoading(false)
    })
  }, [])


  // We use callbacks so that the app does not rerender more than needed - only when called
  const connect = async () => {
    console.log('Connecting to MetaMask...')
    try {
      await activate(injected)
    } catch(error) {
      console.log('Error connecting to MetaMas: ', error)
    } 
  }

  const disconnect = async () => {
    console.log('Disconnecting wallet from Dapp...')
    try {
      await deactivate()
    } catch(error) {
      console.log('Error disconnecting from Dapp: ', error)
    }
  }






  return <MetaMaskContext.Provider value={values}> {children} </MetaMaskContext.Provider>
}
























export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask hook must be used with a MetaMaskProvider component')
  }
  return context
}