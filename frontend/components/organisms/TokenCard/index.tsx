import React from 'react'
import { TokenItem } from '../../../types/tokenItem'
import { OGPImage } from '../../molecules'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import { useOGP } from '../../../modules/hooks/buildOGP'

type TokenItemProps = {
  token: TokenItem
}

export const TokenCard = (props: TokenItemProps) => {
  const { token } = props
  const ogp = useOGP(token.url)
  const etherString = useMemo(() => {
    return ethers.utils.formatEther(token.earn.toString())
  }, [token.earn])

  return (
    <div>
      { ogp && <OGPImage ogp={ogp} /> }
      {token.id}: {token.url}, {etherString}MATIC
    </div>
  )
}
