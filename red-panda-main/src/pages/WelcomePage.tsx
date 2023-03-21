import { Text, Flex, Box, Spacer, Image } from "@chakra-ui/react";
import { NextButton } from "../components/NextButton";

import "./WelcomePages.css"

export const WelcomePage = () => {
  return (
    <>
      <Flex flexDirection='column' height='100vh' p='53px'>
        <Box height='370px'/>
        <Image src='/images/WelcomePage/Stars_Drawing.png' boxSize='60px' ml='auto' position='relative' left='35px'/>
        <Text fontSize='2.8em' lineHeight='54px' fontWeight='800'>
          <span className="scribble-span">All </span>
          the sex-ed resources you need in
          <span className="circle-span"> one </span> 
          place
        </Text>
        <Spacer />
        <NextButton text="get started" link="/onboarding"/>
      </Flex>
    </>
  )
}
