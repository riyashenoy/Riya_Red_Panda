import { Box, Spacer, Text } from '@chakra-ui/react'
import Confetti from 'react-confetti'
import { BLUE, DARK_RED, LIGHT_BLUE, ORANGE, RED, YELLOW } from '../../constants/Colors'
import CountUp from 'react-countup';
import { NextButton } from '../NextButton';

export const SessionEndScreen = ({
  score,
  message
}: {
  score: number,
  message: string
}) => {
  return (
    <>
      <Box position="absolute" top={-20} left={-20}>
        <Confetti
          width={window.innerWidth + 30}
          height={window.innerHeight + 30}
          recycle={false}
          colors={[RED, RED, DARK_RED, BLUE, LIGHT_BLUE, YELLOW, ORANGE]}
        />
      </Box>
      <Spacer />
      <Text fontSize="2em" fontWeight="bold" m={0} pt={4} pb={1} lineHeight="1em" align="center">Well done!</Text>
      <Text fontSize="8em" fontWeight="bold" align="center" pt={0} mt={0}><CountUp end={score * 100} useEasing={true} delay={0.25} duration={6} /></Text>
      <Text fontSize="2em" align="center" pt={0} mt={0}>{message}</Text>
      <Spacer />
      <NextButton text="done" link="/home" />
    </>
  )
}
