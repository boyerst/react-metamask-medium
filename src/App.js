import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button variant="secondary">
          <img src="images/metamask.svg" alt="MetaMask" width="50" height="50" />
        </button>
        <div className="mt-2 mb-2">
          Connected Account:
        </div>
        <button variant="danger">
          Disconnect MetaMask <img src="images/noun_waving_3666509.svg" width="50" height="50" />
        </button>
      </header>
    </div>
  );
}

export default App;
