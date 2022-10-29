import { Box } from '@mui/material'
import { AddButton } from 'components/atoms'

type AddAreaProps = {
  onClick: () => void
}

export const AddArea = (props: AddAreaProps) => {
  const { onClick } = props
  return (
    <Box sx={{
      position: 'sticky',
      bottom: '0',
      backgroundColor: '#2d2d2d',
      borderTop: 'solid 1px #ddd',
      textAlign: 'center'
    }}>
      <AddButton onClick={onClick} />
    </Box>
  )
}
  