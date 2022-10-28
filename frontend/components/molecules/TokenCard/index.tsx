import { TokenItem } from '../../../types/tokenItem'
import { ethers } from 'ethers'
import { useMemo } from 'react'
//import ogs from 'open-graph-scraper'

type TokenItemProps = {
  token: TokenItem
}

export const TokenCard = (props: TokenItemProps) => {
  const { token } = props
  const etherString = useMemo(() => {
    return ethers.utils.formatEther(token.earn.toString())
  }, [token.earn])
  //const og = ogs({ url: token.url })
  //console.log(og)

  return (
    <div>
      {token.id}: {token.url}, {etherString}MATIC
    </div>
  )
}
