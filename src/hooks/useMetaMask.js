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


  // HOOK TO INITIALIZE connect() when app is first ran and after useWeb3React hook is initialized
  // Accepts two args
    // 1. A function to connect
    // 2. An array that will store values that the 'connect' effect depends on
      // This useEffect will only execute when that anything in that dependent arg changes
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
  const handleIsActive = useCallback(() => {
    console.log('Dapp is connected with MetaMask', active)
    // Pass in the 'active' prop from useWeb3React() hook above
    setIsActive(active)
  }, [active])


  // TELL APP TO USE EFFECT handleIsActive()
    // "The function passed to useEffect will run after the render is committed to the screen"
    // ↑ However, we have changed it so that it will only fire when a certain value has changed
    // In this case it will only fire when 'active' (inside of handleIsActive callback) has changed to true or false
    // This is the purpose of passing the array in as the second arg
    // ORDER OF OPERATIONS ❓
      // useEffect() called after render
      // useEffect() calls handleIsActive()
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