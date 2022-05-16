import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  async function requestAccount() {
    console.log("Requesting Account.....");
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error fetching accounts:" + error);
      }
    } else {
      console.log("Meta Mask not detected");
    }
  }
  async function connectWallet() {
    if (typeof window.ethereum != "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            requestAccount();
          }}
        >
          Connect Wallet
        </button>
        <h3>Wallet Address: "{walletAddress}"</h3>
      </header>
    </div>
  );
}

export default App;
