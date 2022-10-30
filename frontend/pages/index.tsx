import React, { useState } from 'react'

import { Box } from '@mui/material'

import { TokenList, Navigation } from 'components/organisms'
import { useWeb3Client } from 'modules/hooks/web3client'
import { useTokens } from 'modules/hooks/tokens'
import { AddArea } from 'components/organisms/AddArea'
import { MintModal } from 'components/modals'

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function Home() {
  const { account, chain, client } = useWeb3Client()
  const { tokens } = useTokens(client)
  const [showModal, setShowModal] = useState(false)

  if (!client) return <>conecting...</>

  return (
    <>
      <Navigation account={account} chain={chain} />
      <Box padding='0 8px' minHeight='100vh'>
        <TokenList tokens={tokens} client={client} />
      </Box>
      <AddArea onClick={() => {setShowModal(true)}}/>
      <MintModal open={showModal} onClose={() => setShowModal(false)} client={client} />
    </>
  )
}
