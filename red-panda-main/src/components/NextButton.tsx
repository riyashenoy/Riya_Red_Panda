import { Text, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { DARK_RED, GREY, RED } from '../constants/Colors';


export const NextButton = ({
  active = true,
  text,
  link,
  onClick,
  background,
  hoverBackground,
}: {
  active?: boolean,
  text: string,
  link?: string,
  onClick?: () => void,
  background?: string,
  hoverBackground?: string
}) => {
  const navigate = useNavigate();
  return ( 
    <>
      <Button 
        position='relative' 
        bg={active ? (background ?? RED) : GREY}
        color="#fff"
        height='60px' 
        rounded='40px'
        onClick={() => onClick ? onClick() : (link && active ? navigate(link) : null)}
        py={4}
        _hover={{
          background: background ?? RED
        }}
        _active={{
          background: background ?? DARK_RED
        }}
      >
        <Text fontSize='1.5em' mt='-3px'>{text}</Text>
        <ArrowForwardIcon mt='0' position='absolute' right='5' fontSize='2em'/>
      </Button>
    </>
  )
}
