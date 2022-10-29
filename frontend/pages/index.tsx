import React from 'react'
import { useIsMobileDevice } from '../modules/hooks/is_mobile'
import { MetamaskMobile } from '../components/atoms'

import { Account, TokenList } from '../components/organisms'
import { useWeb3Client } from '../modules/hooks/web3client'
import { useTokens } from '../modules/hooks/tokens'

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function Home() {
  const isMobile = useIsMobileDevice()
  const { account, chain, client } = useWeb3Client()
  const { tokens } = useTokens(client)

  return (
    <>
      {!account && isMobile && <MetamaskMobile />}
      <Account account={account} chain={chain} />
      <TokenList tokens={tokens} />
    </>
  )
}
