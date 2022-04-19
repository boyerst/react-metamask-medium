import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'
import { MetaMaskProvider } from './hooks/useMetaMask.js'

import 'bootstrap/dist/css/bootstrap.min.css';

function getLibrary(provider, connector) {
  return new Web3(provider)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
{/* Web3ReactProvider is what our web3ReactProvider depends on & also paves the way for using Web3 in our app 
    We wrap our entire app with it so we can have the state of our custom hook existing at all times
*/}
    <Web3ReactProvider getLibrary={getLibrary} >
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
