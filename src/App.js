import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  async function requestAccount() {
    console.log("Requesting Account.....");
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
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
        <form>
          <label>
            WalletAddress:
            <input
              type="text"
              name="toAddress"
              onInput={(e) => setToAddress(e.target.value)}
            />
          </label>
          <br></br>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              min={1}
              onInput={(e) => setAmount(e.target.value)}
            />
          </label>
          <br></br>
        </form>
        <br></br>
        <button
          onClick={() => {
            const obj = { from: walletAddress, to: toAddress, amount: amount };
            console.log(JSON.stringify(obj));
            fetch("/api/transaction/transfer", {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json",
              },
              // (var) payload looks like this {Header: "Sending", . . .}
              body: JSON.stringify(obj),
            })
              .then((res) => res.json())
              .then((resp) => console.log(resp))
              .catch((err) => console.log(err));
          }}
        >
          Transfer
        </button>
      </header>
    </div>
  );
}

export default App;
