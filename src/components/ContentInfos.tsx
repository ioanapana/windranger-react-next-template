import { useState } from 'react'

interface ContentInfosProp {
  account?: string
  storesData?: string
}

const ContentInfos = ({}: ContentInfosProp) => {
  const [walletData, setWalletData] = useState<ContentInfosProp>()
  // const [errorMessage, setErrorMessage] = useState();
  const [connectButtonText, setConnectButtonText] = useState('Connect Wallet')
  // const [currentContractVal, setCurrentContractVal] = useState(null);

  //ether js functions

  // const [provider, setProvider] = useState(null);
  // const [singer, setSigner] = useState(null);
  // const [contract, setContract] = useState(null);

  const connectWalletHandler = () => {
    console.log(window.ethereum)
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result: string[]) => {
          accountChangeHandler(result[0])
          setConnectButtonText('Wallet Connected')
        })
    } else {
    }
  }

  const accountChangeHandler = (newAccount: string) => {
    console.log(newAccount, '^^^^')
    setWalletData({ ...walletData, account: newAccount })
  }

  return (
    <div>
      <button onClick={connectWalletHandler}>{connectButtonText}</button>
      <p>Your account adress: {walletData?.account}</p>
    </div>
  )
}

export default ContentInfos
