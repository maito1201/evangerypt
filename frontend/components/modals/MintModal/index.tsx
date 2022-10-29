import React from 'react'
import { Box, Modal, Typography, TextField, Button } from '@mui/material'

type MintModalProps = {
  open: boolean
  onClose: () => void
}

export const MintModal = (props: MintModalProps) => {
  const { open, onClose } = props
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
            variant='outlined'
            placeholder='https:// URL to promote'
            InputProps={{
              sx: {
                width: '320px',
                color: 'white',
                border: '1px solid white'
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
            variant='outlined'
            placeholder='donate'
            InputProps={{
              sx: {
                width: '260px',
                color: 'white',
                border: '1px solid white'
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
            variant='outlined'
            placeholder='distribution ratio'
            InputProps={{
              sx: {
                width: '260px',
                color: 'white',
                border: '1px solid white'
              }
            }}
          />
          <Typography display='inline' ml='8px'>People</Typography>
        </Box>
        <Button variant='contained' color='success' sx={{ mt: '32px', borderRadius: '18px' }}>
          submit
        </Button>
      </Box>
    </Modal>
  )
}
  