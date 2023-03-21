import { Box, HStack, Icon, Text, Flex } from "@chakra-ui/react";
import { NextButton } from "../components/NextButton";

export const Drawer = ({
  background,
  icon,
  title,
  text,
  color,
  onClick,
  className
}: {
  background: string,
  icon: JSX.Element,
  text: string,
  title: string,
  color: string,
  onClick: () => void,
  className: string
}) => (
  <Box width='100vw' position='absolute' background={background} bottom={0} p='53px' pt='15px' className={className}>
    <HStack>
      {icon}
      <Box width='20px'/>
      <Box>
        <b><Text color={color} fontSize='30px' align='left'>{title}</Text></b>
        <b><Text color='black' fontSize='20px' align='left'>{text}</Text></b>
      </Box>
    </HStack>
    <Box height='20px'/>
    <Flex width='100%' direction="column">
      <NextButton text="continue" onClick={onClick} background={color} />
    </Flex>
  </Box>
)
