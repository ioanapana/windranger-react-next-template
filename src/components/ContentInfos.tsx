/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers'
import { useState } from 'react'
import  Contract_Abi from '../Contract_Abi.json'

interface ContentInfosProp {
  account?: string
  storesData?: string
}

const ContentInfos = ({}: ContentInfosProp) => {

  const contractAddress = '0xf9fCd29A68854098c4a7e4BcE4Bb8a92F0285056';
  const [walletData, setWalletData] = useState<ContentInfosProp>()
  const [errorMessage, setErrorMessage] = useState('');
  const [connectionButtonText, setConnectionButtonText] = useState('Connect Wallet')
  const [currentContractVal, setCurrentContractVal] = useState(null);

  //ether js functions

   const [provider, setProvider] = useState(null);
   const [singer, setSigner] = useState(null);
   const [contract, setContract] = useState<any | null>(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts'})
        .then((result: string[]) => {
            accountChangedHandler(result[0]);
            setConnectionButtonText('Wallet Connected');
        })
        .catch((error: any) => {
            setErrorMessage(error.message);
        });

    } else {
		setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  //when connect wallet, update account and content
  const accountChangedHandler = (newAccount: string) => {
    setWalletData({ ...walletData, account: newAccount })
    updateEthers();
  }

  // listen for account changes
  if (typeof window !== "undefined") {
	window.ethereum.on('accountsChanged', accountChangedHandler);
  }
    
  const getCurrentValue =   async () => {
    const val = await contract.get();
    setCurrentContractVal(val);
  }


  const updateEthers = async () => {
    const tempProvider: any= new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    const tempSigner: any = tempProvider.getSigner();
    setSigner(tempSigner);

    const tempContract = new ethers.Contract(contractAddress, Contract_Abi, tempSigner);
    setContract(tempContract)
  }

  const setHandler = (event: any) => {
    event.preventDefault();
    console.log('sending ' + event.target.setText.value + ' to the contract');
    contract.set(event.target.setText.value);
  }

  return (
    <div>
      <button onClick={connectWalletHandler}>{connectionButtonText}</button>
      <p>Your account adress : {walletData?.account}</p>
      <form onSubmit={setHandler}>
        <input type="text" id='setText' />
        <button type={"submit"}> Update Contract </button>
      </form>
      <button onClick={getCurrentValue}>Show current string value from contract: </button>
      <p>{currentContractVal}</p>
      {errorMessage}
    </div>
  )
}

export default ContentInfos
