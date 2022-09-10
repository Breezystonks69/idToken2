import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal"
import WalletConnectProvider from '@walletconnect/web3-provider'
import React, {useState} from "react"
import {ethers} from "ethers"
import ReactDOM from "react-dom"

let web3Modal;
let respuesta = "Value"

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 42: "https://rinkeby.infura.io/v3/711081a7c4fb42409319962ba07322fc" }, // required
    },
  },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}


export default function Home() {

  const [isConnected, setIsConnected] = useState(false);
  
  const [signer, setSigner] = useState(undefined);
  

  

  async function connect() {
    
      try {
        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
  }

  async function execute() {
      const contractAddress = "0xD6c6dbD21A4F5eF492F5C175494C0b8F6D6c7c44";
      const abi = [
        {
          "inputs": [],
          "name": "retrieve",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "num",
              "type": "bytes"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(0x55);
      } catch (error) {
        console.log(error);
      }
  }

  async function queNum() {
      const contractAddress = "0xD6c6dbD21A4F5eF492F5C175494C0b8F6D6c7c44";
      const abi = [
        {
          "inputs": [],
          "name": "retrieve",
          "outputs": [
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes",
              "name": "num",
              "type": "bytes"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
       
        let respuesta = await contract.retrieve();
        ReactDOM.render(<div>{respuesta - 0}</div>, document.getElementById("pap"))
      } catch (error) {
        console.log(error);
      }
  } 


  return (
    <div>
      <header>
        <input type="button" id="upper" value="Hello"></input>
        <input type="button" id="upper" value="White Paper"></input>
        <input type="button" id="upper" value="GLR"></input>
        {
            isConnected ? (
              <input type="button" id="upper" value="Connected" ></input>
            ) : (
              <input type="button" id="upper" value="Connect Wallet" onClick={() => connect()}></input>
            )
          }
    </header>
<div class="container">
    <div>
        <button onClick={() => execute()}>Create ID</button>
        <button onClick={() => queNum()}>Attest</button>
    </div>

    <div>
        <button>Revoke</button>
        <button id="pap">{respuesta}</button>
    </div>
    
    
</div>




</div>
  );
}
