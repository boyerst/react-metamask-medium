import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { injected } from '../components/wallet/connectors'
import { useWeb3React } fr, '@web3-react/core'

export const MetaMaskContext = React.createContext(null)

export const MetaMaskProvider = ({ children }) => {
  return <MetaMaskContext.Provider value={values}> {children} </MetaMaskContext.Provider>
}

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask hook must be used with a MetaMaskProvider component')
  }
  return context
}