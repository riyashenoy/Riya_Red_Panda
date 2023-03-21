import { Box } from '@chakra-ui/react'
import { RED } from '../constants/Colors'
import './TapIndicator.css'

export const TapIndicator = (props: Record<string, any>) => (
  <Box
    w={100}
    h={100}
    mt={-50}
    ml={-50}
    position="absolute"
    {...props}
  >
    <Box
      className="tap-indicator"
      bg={RED}
      rounded={999}
      w={50}
      h={50}
      mt={25}
      ml={25}
    />
  </Box>
)
