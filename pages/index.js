import Web3Modal from "web3modal"
import WalletConnectProvider from '@walletconnect/web3-provider'
import React, {useState} from "react"
import {ethers} from "ethers"
import ReactDOM from "react-dom"

let web3Modal;

let contractAddress_ ="0x0D453E02967EaC280B439Bd93C01196571AFC271"
let abi_ = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nature",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "RevokeAttestation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "GetAttestations",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "nature",
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
					},
					{
						"internalType": "bool",
						"name": "status",
						"type": "bool"
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
				"name": "_address",
				"type": "address"
			}
		],
		"name": "GetIDInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					}
				],
				"internalType": "struct Registry.IDInfo",
				"name": "",
				"type": "tuple"
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

  async function regId() {
      const contractAddress = contractAddress_;
      const abi = abi_
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        
        const lal1 = document.getElementById("col1").value
        const lal2 = document.getElementById("col2").value
        
        
        await contract.RegisterIDInfo(lal1, lal2);
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
	  const lal3 = document.getElementById("dol3").value

      
      let respuesta = await contract.RegisterAttestation(lal1, lal2, lal3);

    } catch (error) {
      console.log(error);
    }
  }

  async function revAtt() {
    const contractAddress = contractAddress_;
    const abi = abi_
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {

     let theAddress = document.getElementById("tespo1").value
	await contract.RevokeAttestation(theAddress)

    } catch (error) {
      console.log(error);
    }
  } 

  async function getAtt () {
	const contractAddress = contractAddress_;
	const abi = abi_
	const contract = new ethers.Contract(contractAddress, abi, signer);
	try {

	 let myAddress = document.getElementById("pespo1").value
	 let respuesta = await contract.GetAttestation(myAddress)
	 
	 
	 
	  ReactDOM.render(<div>
		{respuesta[0]}
	  </div>,
	  document.getElementById("pespo2"))

	} catch (error) {
	  console.log(error);
	}
  }

  async function ID () {
      const contractAddress = contractAddress_;
      const abi = abi_
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {

       let myAddress = document.getElementById("respo1").value
       let respuesta = await contract.GetIDInfo(myAddress)
       
       
       
        ReactDOM.render(<div>
          {respuesta[0]}
        </div>,
        document.getElementById("respo2"))

        ReactDOM.render(<div>
          {respuesta[1] - 0}
        </div>,
        document.getElementById("respo3"))


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
        <button onClick={() => regId()}>Register ID</button>
        <button onClick={() => regAtt()}>Register Attestation</button>
        <button onClick={() => revAtt()}>Revoke Attestation </button>
        <button onClick={() => getAtt()}> Get Attestation</button>
        <button onClick={() => ID()}>ID Info</button>
    </div>
    <div>
        <input type="text" id="col1" placeholder='Name'></input>
        <select id="dol1" name="Nature">
			<option value="null">select type</option>
			<option value="_name">name</option>
			<option value="_number">number</option>
		</select>
        <input type="text" id='tespo1' placeholder="index"></input>
        <input type="text" id="pespo1" placeholder="Address"></input>
        <input type="text" id="respo1" placeholder="address"></input>
    </div>
    <div>
        <input type="number" id="col2" placeholder='Number'></input>
        <input type="time" id="dol2" placeholder="datetime-local"></input>
        <div id='dis'></div>
        <div id="pespo2"></div>
        <div id="respo2"></div>
    </div>
    <div>
        <div id="dis"></div>
        <input id="dol3" type="text" placeholder="To"></input>
        <div id='dis'></div>
        <div id="dis"></div>
        <div id="respo3"></div>
    </div>
    <div>
        <input type="text" id="dis" ></input>
        <div id="dis"></div>
        <div id='dis'></div>
        <div id="dis"></div>
        <div id="dis"></div>
    </div>  
</div>
</div>
  );
}
