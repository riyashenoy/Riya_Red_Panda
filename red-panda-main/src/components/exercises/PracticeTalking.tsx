import { Button, Center, Spacer, Text } from "@chakra-ui/react"
import { Exercise } from "../../types/Exercise"
import { FaMicrophone } from "react-icons/fa"
import { DARK_RED, GREY_TEXT, RED } from "../../constants/Colors"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useCallback, useEffect, useState } from "react"
import { NextButton } from "../NextButton"
import { RecordingAnimation } from "../RecordingAnimation"

export const PracticeTalking = ({
  exercise,
  onExerciseDone
}: {
  exercise: Exercise & { type: "INTERACTION"},
  onExerciseDone: (correct: boolean) => void
}) => {
  const {
    listening
  } = useSpeechRecognition();
  const [showNextButton, setShowNextButton] = useState(false)
  const [micButtonClicked, setMicButtonClicked] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showListeningAnimation, setShowListeningAnimation] = useState(false)

  const toggleListening = useCallback(() => {
    setMicButtonClicked(true)
    if (!showNextButton) {
      if (showListeningAnimation) {
        SpeechRecognition.stopListening()
        setShowListeningAnimation(false);
      } else {
        SpeechRecognition.startListening()
      }
    }
  }, [showNextButton, showListeningAnimation])

  useEffect(() => {
    if (listening) {
      setShowListeningAnimation(true);
    } else if (!listening && micButtonClicked && !showListeningAnimation) {
      const timeout = setTimeout(() => { setShowNextButton(true); }, 1000);
      return () => clearTimeout(timeout)
    } else if (!listening && micButtonClicked && showListeningAnimation) {
      setShowNextButton(false);
    }else if (!listening) {
      const timeout = setTimeout(() => {
        setShowListeningAnimation(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [listening, micButtonClicked, showListeningAnimation])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHint(true)
    }, 10000)

    return () => clearTimeout(timeout)
  }, [exercise])

  return (
    <>
      <Text fontSize="2em" fontWeight="bold" m={0} py={4} lineHeight="1em">Practice difficult conversations</Text>
      <Text pb={12}>{exercise.data.prompt}</Text>
      <Center>
        <Button
          width="calc(60vw - 30px)"
          height="calc(60vw - 30px)"
          bg={RED}
          _hover={{
            background: DARK_RED
          }}
          rounded="25px"
          onClick={toggleListening}
        >
          {
            showListeningAnimation
            ? <RecordingAnimation />
            : <FaMicrophone fontSize={100} color="#fff" />
          }
        </Button>
      </Center>
      <Text pt={10} color={GREY_TEXT} opacity={showHint ? 1 : 0} transition="opacity 0.6s">{exercise.data.hint}</Text>
      <Spacer />
      {
        showNextButton
        ? (
          <NextButton text="continue" active={true} onClick={() => onExerciseDone(true)} />
        )
        : null
      }
    </>
  )
}
