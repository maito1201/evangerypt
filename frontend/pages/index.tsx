import React, { useState } from 'react'

import { Box } from '@mui/material'

import { MetamaskMobile } from 'components/atoms'
import { TokenList, Navigation } from 'components/organisms'
import { useIsMobileDevice } from 'modules/hooks/is_mobile'
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
  const isMobile = useIsMobileDevice()
  const { account, chain, client } = useWeb3Client()
  const { tokens } = useTokens(client)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Navigation account={account} chain={chain} />
      <Box padding='0 8px' minHeight='100vh'>
        {!account && isMobile && <MetamaskMobile />}
        <TokenList tokens={tokens} />
      </Box>
      {account && <AddArea onClick={() => {setShowModal(true)}}/>}
      <MintModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
