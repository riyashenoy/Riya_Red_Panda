import { Text, Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import { BirthYearSelector } from "../components/BirthYearSelector";
import { NextButton } from "../components/NextButton";

export const LandingPage = () => {
  const [birthYear, setBirthYear] = useState<string|null>(null);
  return ( 
    <>
      <Flex flexDirection='column' height='100vh' p='53px'>
        <Box height='80px' />
        <Text fontSize='2.8em' fontWeight='800' lineHeight='54px' m={0}>Select your birth year</Text>
        <Box height='35px' />
        <BirthYearSelector setBirthYear={setBirthYear}/>
        <Box height="500px" />
        <NextButton active={birthYear != null} text="next" link="/startTest" />
      </Flex>
    </>
  )
}
