// Custom Hook used...
  // To call connect and disconnect on our <Buttons>
  // To keep track of state and fetch data (account info, balance, etc.)

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { injected } from '../components/wallet/injected.js'
import { useWeb3React } from '@web3-react/core'

// Use createContext to keep track of the State of this hook through the app's lifecycle
export const MetaMaskContext = React.createContext(null)



export const MetaMaskProvider = ({ children }) => {

  // Gather important info used to connect to MetaMask
  const { activate, account, library, connector, active, deactivate } = useWeb3React()

  // Use to tell if MetaMask is currently connected to the dapp via proper chain
    // Active False = Disconnected
    // Active True = Connected
  const [isActive, setIsActive] = useState(false)
  // Use to tell when MetaMask hook is loading to read its connection with MetaMask
  const [isLoading, setIsLoading] = useState(true)  


  // HOOK TO INITIALIZE connect() when app is first ran and after useWeb3React hook is initialized
  // Accepts two args
    // 1. A function to connect
    // 2. A dependency - no dependency in this case
  useEffect(() => {
    connect().then(val => {
      setIsLoading(false)
    })
  }, [])


  // CHECK IF METAMASK IS CURRENTLY CONNECTED TO APP
  // Accepts two args
    // 1. An inline callback
    // 2. A dependent property
  // The useCallback will only re-render when the dependency changes - in this case anytime active beomes true or false
    // When active becomes true, setIsActive will be true
  const handleIsActive = useCallback(() => {
    console.log('Dapp is connected with MetaMask', active)
    // Pass in the 'active' prop from useWeb3React() hook above
    setIsActive(active)
  }, [active])


  // TELL APP TO USE EFFECT handleIsActive()
    // The function passed to useEffect will run...
        // 1. After every completed render
        // 2. Anytime that the dependency (handleIsActive) changes
          // This will update our app anytime it becomes Active True (connected) or Active False (disconnected)

    // ORDER OF OPERATIONS ❓
      // useEffect() called after initial render is completed
      // useEffect() calls handleIsActive()
      // handleIsActive updates our apps connection status (Active True = connected) by updating the 'active' property from our useWeb3React hook
      // Beyond the initial render...
        // If handleIsActive() dependency ('active' state property) has changed to true or false (user connects or disconnects), then handleIsActive will run and re render
        // Else if the dependency (active) stays the same, no re-rendering is necessary
  useEffect(() => {
    handleIsActive()
  }, [handleIsActive])


  // We use callbacks so that the app does not rerender more than needed - only when called
  const connect = async () => {
    console.log('Connecting to MetaMask...')
    try {
      await activate(injected)
    } catch(error) {
      console.log('Error connecting to MetaMask: ', error)
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


  // Update the rest of the app if any dependencies of of this hook change
  // This will change properties of our hook accordingly
  // This is tell the rest of the app if isActive or isLoading is updated
    // and give access to 'connect' and 'disconnect' functions + 'account'
  // These values will only be updated when the dependencies that we pass useMemo change
    // These dependencies are passed in as the second arg (the array)
  const values = useMemo(
    () => ({
        isActive,
        account,
        isLoading,
        connect,
        disconnect
    }),
    [isActive, isLoading]
  )




  return <MetaMaskContext.Provider value={values}> {children} </MetaMaskContext.Provider>
}
























export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask hook must be used with a MetaMaskProvider component')
  }
  return context
}