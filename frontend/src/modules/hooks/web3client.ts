import { useEffect, useState } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'

import artifact from '../../abi/EvangeryptToken.json'

const nft_address = '0xC74d41a1e76A59590D59DF53f151B505f206d8c8'

const chainId = '0x13881'

const chainConfig = {
  chainId: '0x13881',
  blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  chainName: 'Mumbai Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Polygon',
    symbol: 'MATIC'
  },
  rpcUrls: ['https://rpc-mumbai.maticvigil.com']
}

export const useWeb3Client = () => {
  const [client, setClient] = useState<ethers.Contract>()
  const [account, setAccount] = useState('')
  const [chain, setChain] = useState('')
  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider()
      if (provider && window.ethereum?.isMetaMask) {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAccount(address)

        const contract = new ethers.Contract(nft_address, artifact.abi, provider)
        setClient(contract.connect(signer))

        if (process.env.NODE_ENV === 'development') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainId }]
            })
          } catch {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [chainConfig]
            })
          } finally {
            provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(nft_address, artifact.abi, provider)
            const signer = await provider.getSigner()
            setClient(contract.connect(signer))
          }
        }

        const network = await provider.getNetwork()
        setChain(`chain id: ${network.chainId} ${network.name}`)
      } else {
        setAccount('Please Install MetaMask')
      }
    }
    init()
  }, [window.ethereum])
  return { account, setAccount, chain, client }
}
