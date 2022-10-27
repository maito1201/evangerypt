import { useEffect, useState } from 'react'
import { TokenItem } from '../../types/tokenItem'
import { ethers } from 'ethers'

export const useTokens = (client?: ethers.Contract) => {
  const [tokens, setTokens] = useState<Array<TokenItem>>([])
  useEffect(() => {
    const getTokens = async () => {
      if (!client) return
      const { totalSupply, tokenByIndex, tokenURI, estimateEarn } = client.functions
      const supply = parseInt(await totalSupply())
      const items: TokenItem[] = []
      for (let i = 0; i < supply; i++) {
        const id = parseInt(await tokenByIndex(i))
        const url = await tokenURI(id)
        const earn = await estimateEarn(id)
        const tokenItem: TokenItem = { id, url, earn}
        items.push(tokenItem)
      }
      setTokens(items)
    }
    getTokens()
  }, [client])
  return { tokens }
}
