import { Text, Flex, Spacer, Box } from "@chakra-ui/react";
import { NextButton } from "../components/NextButton";
import { ProgressBar } from "../components/ProgressBar";

export const StartLessonPage = () => {
  return ( 
    <>
      <Flex flexDirection='column' height='100vh' p='53px'>
        <ProgressBar target={1} value={0} />
        <Spacer />
        <Text fontSize='20px' lineHeight='24px' fontWeight='800'>TIME: APPROX. 5 MIN</Text>
        <Box height="10px"/>
        <Text fontSize='40px' lineHeight='45px' fontWeight='800'>Ready to learn?</Text>
        <Box height='20px'/>
        <NextButton text="let's go!" link="/lesson"/>
      </Flex>
    </>
  )
}
