import React from 'react'
import { TokenItem } from '../../../types/tokenItem'
import { TokenCard } from '../'

type TokenListProps = {
  tokens: TokenItem[]
}

export const TokenList = (props: TokenListProps) => {
  const { tokens } = props
  if (!tokens) return <></>
  return (
    <>
      {tokens.map((token) => (
        <TokenCard token={token} key={token.id} />
      ))}
    </>
  )
}
