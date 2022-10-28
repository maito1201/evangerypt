import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'

import { MetaMaskProvider } from 'metamask-react'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <React.StrictMode>
    <MetaMaskProvider>
      <Component {...pageProps} />
    </MetaMaskProvider>
  </React.StrictMode>
  )
}
