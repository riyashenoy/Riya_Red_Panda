import { Text, Flex, Link, Spacer, Box } from "@chakra-ui/react";
import { NextButton } from "../components/NextButton";
import { ProgressBar } from "../components/ProgressBar";
import { DARK_GREY } from '../constants/Colors';

export const StartTestPage = () => {
  return ( 
    <>
      <Flex flexDirection='column' height='100vh' p='53px'>
        <ProgressBar target={1} value={0} />
        <Spacer />
        <Text fontSize='20px' lineHeight='24px' fontWeight='800'>TIME: APPROX. 5 MIN</Text>
        <Box height="10px"/>
        <Text fontSize='40px' lineHeight='45px' fontWeight='800'>Time for a diagnostic test!</Text>
        <Box height='10px'/>
        <Text fontSize='24px'><Link href='/lesson' color={DARK_GREY}><u>Start from scratch instead</u></Link></Text>
        <Box height='20px'/>
        <NextButton text="get started" link="/lesson?diagnostic"/>
      </Flex>
    </>
  )
}
