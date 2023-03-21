import { Box, Spacer, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BLUE, DARK_GREY, GREY, GREY_TEXT, LIGHT_BLUE } from "../../constants/Colors"
import { Exercise } from "../../types/Exercise"
import { shuffle } from "../../util/shuffle"
import { NextButton } from "../NextButton"

export const MultipleChoice = ({
  exercise,
  onExerciseDone
}: {
  exercise: Exercise & { type: "MULTIPLE_CHOICE" }
  onExerciseDone: (correct: boolean) => void
}) => {
  const [allChoices, setAllChoices] = useState<string[]>([])
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)

  useEffect(() => {
    setAllChoices(shuffle([...exercise.data.distractors, exercise.data.correctAnswer]))
    setSelectedChoice(null)
  }, [exercise.data.correctAnswer, exercise.data.distractors])

  return (
    <>
      <Text fontSize="2em" fontWeight="bold" m={0} pt={4} pb={2} lineHeight="1em">Select the correct answer</Text>
      <Text fontSize="1.1em" color={GREY_TEXT} m={0}>Not sure? Give it your best guess!</Text>
      <Box rounded="20px" border={`${GREY} 3px solid`} mt={10} mb={8}>
        <Text fontSize="1.5em" p={30} align="center" color={DARK_GREY}>
          {exercise.data.question}
        </Text>
      </Box>
      {
        allChoices.map((choice, index) => (
          <Box
            rounded="20px"
            borderWidth="3px"
            borderStyle="solid"
            borderColor={selectedChoice === index ? BLUE : GREY}
            mt={4}
            p={4}
            bg={selectedChoice === index ? LIGHT_BLUE : undefined}
            onClick={() => setSelectedChoice(index)}
          >
            <Text align="center" fontWeight="bolder">{choice}</Text>
          </Box>
        ))
      }
      <Spacer />
      {
        selectedChoice !== null
        ? (
          <NextButton text="continue" active={true} onClick={() => onExerciseDone(allChoices[selectedChoice] === exercise.data.correctAnswer)} />
        )
        : null
      }
    </>
  )
}
