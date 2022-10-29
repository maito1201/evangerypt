import React from 'react'
import { Box } from '@mui/material'

import { TokenItem } from 'types/tokenItem'
import { TokenCard } from 'components/organisms'

type TokenListProps = {
  tokens: TokenItem[]
}

export const TokenList = (props: TokenListProps) => {
  const { tokens } = props
  if (!tokens) return <></>
  return (
    <Box sx={{
      width: '100%',
      maxWidth: '800px',
      borderRadius: '20px',
      backgroundColor: '#3d3d3d',
      margin: '16px auto'
    }}>
      {tokens.sort((a, b) => (a.earn > b.earn) ? 0 : 1 ).map((token, index) => (
        <TokenCard token={token} key={token.id} isLast={index + 1 === tokens.length} />
      ))}
    </Box>
  )
}
