import { IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';

type AddButtonProps = {
  onClick: () => void
}

export const AddButton = (props: AddButtonProps) => {
  const { onClick } = props
  return (
    <IconButton sx={{ color: '#9d75ca'}} aria-label='add token' onClick={onClick} size='large'>
      <AddCircleIcon sx={{ fontSize: '40px' }} />
      <Typography sx={{ display:'inline', fontSize: '26px' }}>Mint</Typography>
    </IconButton>
  )
}
