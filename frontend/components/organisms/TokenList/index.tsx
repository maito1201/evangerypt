import React, { useState, useCallback } from 'react'
import { Box } from '@mui/material'
import { ethers } from 'ethers'

import { TokenItem } from 'types/tokenItem'
import { TokenCard } from 'components/organisms'
import { DonateModal } from 'components/modals'
import { CircularProgress } from '@mui/material'

type TokenListProps = {
  tokens: TokenItem[]
  client: ethers.Contract
}

export const TokenList = (props: TokenListProps) => {
  const { tokens, client } = props
  const sortedTokens = tokens.sort((a, b) => (a.earn > b.earn) ? -1 : 1 )
  const [showModal, setShowModal] = useState(false)
  const [tokenId, setTokenId] = useState<number | undefined>(undefined)
  const handleClickLink = async (tokenId: number | undefined)=> {
    if (typeof(tokenId) === 'undefined') return
    try {
      await client.withdrawFromToken(tokenId)
    } catch(e) {
      console.log(e)
    }
  }
  const handleClickDonate = (tokenId: number | undefined)=> {
    if (typeof(tokenId) === 'undefined') return
    setTokenId(tokenId)
    setShowModal(true)
  }

  if (!tokens.length) return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <CircularProgress />
    </Box>
  )
    
  return (
    <>
      <Box sx={{
        width: '100%',
        maxWidth: '800px',
        borderRadius: '20px',
        backgroundColor: '#3d3d3d',
        margin: '16px auto'
      }}>
        {sortedTokens.map((token, index) => (
          <TokenCard
          key={token.id}
          token={token}
          isLast={index + 1 === tokens.length}
          onClickLink={(n: number | undefined) => handleClickLink(n)}
          onClickDonate={(n: number | undefined) => handleClickDonate(n)}
          />
          ))}
      </Box>
    <DonateModal
      open={showModal}
      onClose={() => setShowModal(false)}
      tokenId={tokenId}
      client={client}
    />
    </>
  )
}
