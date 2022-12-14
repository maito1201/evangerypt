import React from 'react'
import Image from 'next/image'
import { ethers } from 'ethers'
import { useMemo } from 'react'

import { Box, Typography, Button } from '@mui/material'

import { TokenItem } from 'types/tokenItem'
import { OGPImage, EmbedTwitter } from 'components/molecules'
import { useOGP } from 'modules/hooks/buildOGP'


type TokenItemProps = {
  token: TokenItem,
  isLast: boolean,
  onClickLink: (n: number) => void
  onClickDonate: (n: number) => void
}

const hasTwitterUrl = (text: string) => {
  const regexpTweet = /(https?:\/\/twitter\.com\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+\/status\/[0-9]+)/g;
  return regexpTweet.test(text) 
}

export const TokenCard = (props: TokenItemProps) => {
  const { token, isLast, onClickLink, onClickDonate } = props
  const ogp = useOGP(token.url)
  const isTwitter = hasTwitterUrl(token.url)
  const etherString = useMemo(() => {
    return ethers.utils.formatEther(token.earn.toString())
  }, [token.earn])

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: '16px 8px',
      borderBottom: isLast ? '' : 'solid #aaa 1px'
    }}>
      <Box sx ={{
        width: '40%',
        minWidth: '340px',
        textAlign: 'center' 
      }}>
        { isTwitter &&
          <EmbedTwitter text={token.url}/>
        }
        { !isTwitter &&
          <Box onClick={() => onClickLink(token.id)}>
            <OGPImage ogp={ogp} />
          </Box>
        }
      </Box>
      <Box sx={{
        padding:'8px 16px',
        width: '340px'
      }}>
        <Box sx={{
          wordBreak: 'break-all',
          display: 'flex',
          alignItems: 'center',
          minWidth: '250px'
        }}>
          <Image alt='CURRENCY' src='/polygon.png' width={28} height={28} />
          <Typography variant='h5' display='inline' ml='8px'>
            {etherString}MATIC
          </Typography>
        </Box>
        <Box onClick={() => onClickLink(token.id)} sx={{ wordBreak: 'break-all' }}>
          <a href={ogp.url || token.url} target='_blank' rel='noopener noreferrer'>
            <Typography variant='body1' color='#1d9bd1'>
              {token.url}
            </Typography>
          </a>
        </Box>
        <Box sx={{ wordBreak: 'break-all' }}>
          <Typography variant='body1'>
          {ogp.siteName}
          </Typography>
        </Box>
        <Button
          onClick={() => {onClickDonate(token.id)}}
          variant='contained'
          color='success'
          sx={{ mt: '16px', borderRadius: '18px' }}
        >
          donate
        </Button>
      </Box>
    </Box>
  )
}
