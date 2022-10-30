import React, { useState, useCallback, useEffect } from 'react'
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

const isValidDistribute = (num: number) => {
  return !isNaN(num) && num > 0
}

export const MintModal = (props: MintModalProps) => {
  const { open, onClose, client } = props
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState(false)
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [amountErrorMessage, setAmountErrorMessage] = useState('')
  const [distribute, setDistribute] = useState('')
  const [distributeError, setDistributeError] = useState(false)
  const [balance, setBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from(0))

  useEffect(() => {
    client.signer.getBalance().then((b: ethers.BigNumber) => {
      setBalance(b)
    })
  }, [client.signer])

  const isValidEth = useCallback((pay?: ethers.BigNumber, have?: ethers.BigNumber) => {
    if (pay?.lt(ethers.BigNumber.from(100))) {
      setAmountErrorMessage('more donate needded')
      return false
    } else if (have?.lt(pay || 0)) {
      setAmountErrorMessage('input must be less than you have')
      return false
    }
    return true
  }, [])

  const handleSubmit = useCallback(async () => {
    let eth: ethers.BigNumber | undefined = undefined
    const num = parseInt(distribute)
    try {
      eth = ethers.utils.parseEther(amount)
    } catch {
      // nothing TODO
    }
    if (!isValidUrl(url) || !isValidEth(eth, balance) || !isValidDistribute(num)) return
    await client.safeMint(await client.signer.getAddress(), url, num, { value: eth })
    onClose()
  }, [url, amount, distribute, balance, client, isValidEth, onClose])

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
    setAmountError(!isValidEth(eth, balance))
  }, [balance, isValidEth])

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
            helperText={ amountError ? amountErrorMessage : ''}
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
        <Box mt='8px'>
          <Typography variant='body2'>
            {`you have ${ethers.utils.formatEther(balance)}MATIC`}
          </Typography>
        </Box>
      </Box>
    </Modal>
  )
}
  