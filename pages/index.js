import Web3Modal from "web3modal"
import WalletConnectProvider from '@walletconnect/web3-provider'
import React, {useState} from "react"
import {ethers} from "ethers"
import ReactDOM from "react-dom"

let web3Modal;

let contractAddress_ ="0x60235224F2301CDFA14464f1dB2788375bF9B55c"
let abi_ = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_Atype",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "RegisterAttestation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_number",
				"type": "uint256"
			}
		],
		"name": "RegisterIDInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Attestation",
		"outputs": [
			{
				"internalType": "string",
				"name": "Atype",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AttestationLog",
		"outputs": [
			{
				"internalType": "string",
				"name": "Atype",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetAttestatioLog",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "Atype",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "time",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					}
				],
				"internalType": "struct Registry.AttestationInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "ID",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
        
        
        let respuesta = await contract.RegisterIDInfo(lal1, lal2, lal3);
        setSigner(respuesta.getSigner())
      } catch (error) {
        console.log(error);
      }
  }

  async function regAtt() {
    const contractAddress = contractAddress_;
    const abi = abi_
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      
      const lal1 = document.getElementById("dol1").value
      const lal2 = document.getElementById("dol2").value
      
      let respuesta = await contract.RegisterAttestation(lal1, lal2);

    } catch (error) {
      console.log(error);
    }
  }

  async function ID() {
      const contractAddress = contractAddress_;
      const abi = abi_
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

       let myAddress = document.getElementById("respo1").value
       console.log(myAddress)
       let respuesta = await contract.ID(myAddress)
       
       
       
        ReactDOM.render(<div>
          {respuesta[0]}
        </div>,
        document.getElementById("respo2"))

        ReactDOM.render(<div>
          {respuesta[1]}
        </div>,
        document.getElementById("respo3"))

        ReactDOM.render(<div>
          {respuesta[2] - 0}
        </div>,
        document.getElementById("respo4"))

      } catch (error) {
        console.log(error);
      }
  }
  
  async function att() {
    const contractAddress = contractAddress_;
    const abi = abi_
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {

     let theAddress = document.getElementById("tespo1").value
     let index = document.getElementById("tespo2").value
     console.log(theAddress)
     console.log(index)
     
     let respuesta = await contract.Attestation(theAddress, index)
     console.log(respuesta)
     
      ReactDOM.render(<div>
        {respuesta[0]}
      </div>,
      document.getElementById("tespo3"))

      ReactDOM.render(<div>
        {respuesta[1]}
      </div>,
      document.getElementById("tespo4"))

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
    <div id="botones">
        <button onClick={() => execute()}>Register ID</button>
        <button onClick={() => regAtt()}>Register Attestation</button>
        <button onClick={() => att()}>Attestation </button>
        <button>Attestation Log</button>
        <button onClick={() => ID()}>ID</button>
    </div>
    <div>
        <input type="text" id="col1" placeholder='Name'></input>
        <input type="text" id="dol1" placeholder="Type"></input>
        <input type="text" id='tespo1' placeholder="address"></input>
        <div id="dis"></div>
        <input type="text" id="respo1" placeholder="address"></input>
    </div>
    <div>
        <input type="text" id="col2" placeholder='Email'></input>
        <input type="text" id="dol2" placeholder="to"></input>
        <input type="number" id='tespo2' placeholder="index"></input>
        <div id="dis"></div>
        <div id="respo2"></div>
    </div>
    <div>
        <input type="number" id="col3" placeholder='Number'></input>
        <div id="dis"></div>
        <div id='tespo3'></div>
        <div id="dis"></div>
        <div id="respo3"></div>
    </div>
    <div>
        <input type="text" id="dis" ></input>
        <div id="dis"></div>
        <div id='tespo4'></div>
        <div id="dis"></div>
        <div id="respo4"></div>
    </div>  
</div>
</div>
  );
}
