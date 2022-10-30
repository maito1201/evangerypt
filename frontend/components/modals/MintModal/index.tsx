import React, { useState, useCallback } from 'react'
import { Box, Modal, Typography, TextField, Button } from '@mui/material'
import { ethers } from 'ethers'

type MintModalProps = {
  open: boolean
  onClose: () => void
  client: ethers.Contract
}

const isValidUrl = (s: string) => {
  return /^http:\/\/.|^https:\/\/./.test(s)
}

const isValidEth = (e?: ethers.BigNumber) => {
  return e?.gte(ethers.BigNumber.from(100))
}

const isValidDistribute = (num: number) => {
  return !isNaN(num) && num > 0
}

export const MintModal = (props: MintModalProps) => {
  const { open, onClose, client } = props
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState(false)
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [distribute, setDistribute] = useState('')
  const [distributeError, setDistributeError] = useState(false)

  const handleSubmit = useCallback(async () => {
    let eth: ethers.BigNumber | undefined = undefined
    const num = parseInt(distribute)
    try {
      eth = ethers.utils.parseEther(amount)
    } catch {
      // nothing TODO
    }
    if (!isValidUrl(url) || !isValidEth(eth) || !isValidDistribute(num)) return
    await client.safeMint(await client.signer.getAddress(), url, num, { value: eth })
  }, [url, amount, distribute])

  const handleChangeUrl = useCallback((s: string) => {
    setUrl(s)
    setUrlError(!isValidUrl(s))
  }, [])

  const handleChangeAmount = useCallback((s: string) => {
    setAmount(s)
    let eth: ethers.BigNumber | undefined = undefined
    try {
      eth = ethers.utils.parseEther(s)
    } catch {
      // nothing TODO
    }
    setAmountError(!isValidEth(eth))
  }, [])

  const handleChangeDistribute = useCallback((s: string) => {
    setDistribute(s)
    const num = parseInt(s)
    setDistributeError(!isValidDistribute(num))
  }, [])

  return (
    <Modal open={open} onClose={onClose} sx={{
      px: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      maxWidth: '728px'
    }}>
      <Box sx={{
        background: '#3d3d3d',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        px: '24px',
        py: '24px',
        position: 'relative',
        borderRadius: '8px'
      }}>
        <Typography variant='h4'>Mint Token</Typography>
        <Typography variant='body1'>
          {"Let's tell us what to know"}
        </Typography>
        <Typography variant='body1'>
          by mint and donate Evangerypt Token.
        </Typography>
        <Box marginTop='16px'>
          <TextField
            onChange={e => handleChangeUrl(e.target.value)}
            error={urlError}
            helperText={ urlError ? 'url must start http:// or https://' : ''}
            variant='outlined'
            placeholder='https:// URL to promote'
            InputProps={{
              sx: {
                width: '320px',
                color: 'white',
                border: urlError ? '' : '1px solid white'
              }
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '32px'
        }}>
          <TextField
            onChange={e => handleChangeAmount(e.target.value)}
            error={amountError}
            helperText={ amountError ? 'more donate needded' : ''}
            variant='outlined'
            placeholder='donate'
            InputProps={{
              sx: {
                width: '260px',
                color: 'white',
                border: amountError ? '' : '1px solid white'
              }
            }}
          />
          <Typography display='inline' ml='8px'>MATIC</Typography>
        </Box>
        <Typography variant='body2' mt='8px'>will divided by</Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '8px'
        }}>
          <TextField
            onChange={e => handleChangeDistribute(e.target.value)}
            error={distributeError}
            helperText={ distributeError ? 'must be greater than 1' : ''}
            variant='outlined'
            placeholder='distribution ratio'
            InputProps={{
              sx: {
                width: '260px',
                color: 'white',
                border: distributeError ? '' : '1px solid white'
              }
            }}
          />
          <Typography display='inline' ml='8px'>People</Typography>
        </Box>
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='success'
          sx={{ mt: '32px', borderRadius: '18px' }}
        >
          submit
        </Button>
      </Box>
    </Modal>
  )
}
  