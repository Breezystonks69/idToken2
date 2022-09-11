import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal"
import WalletConnectProvider from '@walletconnect/web3-provider'
import React, {useState} from "react"
import {ethers} from "ethers"
import ReactDOM from "react-dom"

let web3Modal;
let respuesta = ""


let contractAddress_ ="0x7070D932F88be3C757Bb1165a91e7107714fCED9"
let abi_ = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "address"
      }
    ],
    "name": "getStudent",
    "outputs": [
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "birthdate",
        "type": "string"
      },
      {
        "name": "department",
        "type": "string"
      },
      {
        "name": "location",
        "type": "string"
      },
      {
        "name": "email",
        "type": "string"
      },
      {
        "name": "mobile_no",
        "type": "uint256"
      }
    ],
    "name": "registerPerson",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 4: "https://rinkeby.infura.io/v3/711081a7c4fb42409319962ba07322fc" }, // required
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
      const contractAddress = contractAddress_;
      const abi = abi_
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        
        const lal1 = document.getElementById("col1").value
        const lal2 = document.getElementById("col2").value
        const lal3 = document.getElementById("col3").value
        const lal4 = document.getElementById("col4").value
        const lal5 = document.getElementById("col5").value
        const lal6 = document.getElementById("col6").value
        
        let respuesta = await contract.registerPerson(lal1, lal2, lal3, lal4, lal5, lal6);

      } catch (error) {
        console.log(error);
      }
  }

  async function queNum() {
      const contractAddress = contractAddress_;
      const abi = abi_
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

       let myAddress = await signer.getAddress()
       let respuesta = await contract.getStudent(myAddress)
       
       
       
        ReactDOM.render(<div>
          {respuesta[0]}
        </div>,
        document.getElementById("dol1"))

        ReactDOM.render(
          <span>{respuesta[1]}</span>,
        
         document.getElementById("dol2"))

        ReactDOM.render(<div>
          {respuesta[2]}
        </div>,
        document.getElementById("dol3"))
    
        ReactDOM.render(<div>
          {respuesta[3]}
        </div>,
        document.getElementById("dol4"))

        ReactDOM.render(<div>
          {respuesta[4]}
        </div>,
        document.getElementById("dol5"))
        
        
        ReactDOM.render(<div>
          {respuesta[5] - 0}
        </div>,
        document.getElementById("dol6"))
        



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
        <button onClick={() => execute()}>Register</button>
        <button onClick={() => queNum()}>call data</button>
        <button>shhh</button>
        <button>shhhh</button>
    </div>
    <div>
        <input type="text" id="col1" placeholder='Name'></input>
        <div id="dol1"></div>
        <div id='respu'></div>
        <div id="resp"></div>
    </div>
    <div>
    <input type="text" id="col2" placeholder='Birthday'></input>
        <div id="dol2"></div>
        <div id='resp'></div>
        <div id="resp"></div>
    </div>
    <div>
    <input type="text" id="col3" placeholder='Department'></input>
        <div id="dol3"></div>
        <div id='resp'></div>
        <div id="resp"></div>
    </div>
    <div>
    <input type="text" id="col4" placeholder='Email'></input>
        <div id="dol4"></div>
        <div id='resp'></div>
        <div id="resp"></div>
    </div>
    <div>
    <input type="text" id="col5" placeholder='location'></input>
        <div id="dol5"></div>
        <div id='resp'></div>
        <div id="resp"></div>
    </div>
    <div>
    <input type="number" id="col6" placeholder='Phone number'></input>
        <div id="dol6"></div>
        <div id='resp'></div>
        <div id="resp"></div>
        
    </div>
    
    
</div>




</div>
  );
}
