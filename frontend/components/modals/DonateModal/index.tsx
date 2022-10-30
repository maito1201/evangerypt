import React, { useState, useCallback, useEffect } from 'react'
import { Box, Modal, Typography, TextField, Button } from '@mui/material'
import { ethers } from 'ethers'

type DonateModalProps = {
  open: boolean
  onClose: () => void
  tokenId?: number
  client: ethers.Contract
}

export const DonateModal = (props: DonateModalProps) => {
  const { open, onClose, client, tokenId } = props
  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState(false)
  const [amountErrorMessage, setAmountErrorMessage] = useState('')
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
    if (typeof(tokenId) === 'undefined') return
    let eth: ethers.BigNumber | undefined = undefined
    try {
      eth = ethers.utils.parseEther(amount)
    } catch {
      // nothing TODO
    }
    if (!isValidEth(eth, balance)) return
    await client.donateToToken(tokenId, { value: eth })
    onClose()
  }, [amount, balance, client, isValidEth, onClose, tokenId])

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

  if (typeof(tokenId) === 'undefined') return <></>

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
        <Typography variant='h4'>Donate to Token</Typography>
        <Typography variant='body1'>
          Increase reward amount
        </Typography>
        <Typography variant='body1'>
          by donating to this Token.
        </Typography>
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
  