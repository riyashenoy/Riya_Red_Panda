import { CheckIcon, LockIcon, StarIcon } from "@chakra-ui/icons";
import { Flex, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TapIndicator } from "../components/TapIndicator";
import { DARK_GREY, DARK_RED, DARK_YELLOW, GREY, RED, SHINE, YELLOW } from "../constants/Colors";

const lessonButtonWidth = 60

const renderLessonButton = ({
  unlocked,
  finished,
  i
}: {
  unlocked: boolean,
  finished: boolean,
  i: number
}) => {
  const background = unlocked ? RED : (finished ? `linear-gradient(135deg, ${SHINE} 33%, ${YELLOW} 34%, ${YELLOW} 47%, ${SHINE} 48%, ${SHINE} 66%, ${YELLOW} 67%)` : GREY);
  const color = unlocked ? "#fff" : (finished ? DARK_YELLOW : DARK_GREY);
  const shadow = unlocked ? DARK_RED : (finished ? DARK_YELLOW : DARK_GREY);
  const icon = unlocked ? <StarIcon color={color} fontSize="1.5em" /> : ( finished ? <CheckIcon color={color} fontSize="1.5em" /> : <LockIcon color={color} fontSize="1.5em" /> )
  const border = finished ? "4px #FFC107 solid" : undefined

  return (
    <Link to={"/startLesson"}>
      <Flex
        rounded={999}
        background={background}
        w={`${lessonButtonWidth}px`}
        h={`${lessonButtonWidth}px`}
        position="absolute"
        top={`${i * 140 + 100}px`}
        left={`${(Math.sin(i) + 1) * (window.innerWidth / 2 - lessonButtonWidth * 2) + lessonButtonWidth}px`}
        alignItems="center"
        justifyContent="center"
        border={border}
        boxShadow={`0 6px ${shadow}`}
        _hover={{
          boxShadow: `0 3px ${shadow}`,
          top: `${i * 140 + 100 + 3}px`
        }}
      >
        {icon}
        {unlocked ? <TapIndicator zIndex={-1} left={`${lessonButtonWidth / 2}px`} top={`${lessonButtonWidth / 2 + 3}px`} /> : null}
      </Flex>
    </Link>
  )
}

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, window.document.body.scrollHeight)
  }, [])

  return (
    <>
      <Image position="absolute" src="/images/path/bamboo.png" width="100vw" />
      {
        (new Array(16)).fill(0).map((v, i) => renderLessonButton({ unlocked: i === 12, finished: i > 12, i }))
      }
    </>
  )
};
