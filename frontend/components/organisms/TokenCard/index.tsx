import React from 'react'
import Image from 'next/image'
import { ethers } from 'ethers'
import { useMemo } from 'react'

import { Box, Typography, Button } from '@mui/material'

import { TokenItem } from 'types/tokenItem'
import { OGPImage } from 'components/molecules'
import { useOGP } from 'modules/hooks/buildOGP'


type TokenItemProps = {
  token: TokenItem,
  isLast: boolean
}

export const TokenCard = (props: TokenItemProps) => {
  const { token, isLast } = props
  const ogp = useOGP(token.url)
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
        { ogp && <OGPImage ogp={ogp} /> }
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
        <a href={ogp.url} target='_blank' rel='noopener noreferrer'>
          <Box sx={{ wordBreak: 'break-all' }}>
            <Typography variant='body1' color='#1d9bd1'>
              {token.url}
            </Typography>
          </Box>
        </a>
        <Box sx={{ wordBreak: 'break-all' }}>
          <Typography variant='body1'>
          {ogp.siteName}
          </Typography>
        </Box>
        <Button variant='contained' color='success' sx={{ mt: '16px', borderRadius: '18px' }}>
          donate
        </Button>
      </Box>
    </Box>
  )
}
