import { Box, Spacer, Text } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { ActionableElement as ActionableElementT } from "../../types/ActionableElement"
import { ActionableElement } from "../ActionableElement"
import { NextButton } from "../NextButton"

const renderCondomOnBamboo = () => (
  <Box position="relative" height="50vh">
    <Box id="bamboo" backgroundImage="url('/images/condoms/bamboo.png')" position="absolute" width="100%" backgroundSize="100%" backgroundRepeat="no-repeat" style={{ height: '50vh' }} />
    <Box id="condom" backgroundImage="url('/images/condoms/condom.png')" position="absolute" width="100%" backgroundSize="100%" backgroundRepeat="no-repeat" style={{ height: '10vh' }} />
    <Box id="base" backgroundImage="url('/images/condoms/base.png')" position="absolute" width="100%" backgroundSize="100%" backgroundRepeat="no-repeat" style={{ top: '-17vh' }} height="50vh" />
  </Box>
)

const renderWrapper = () => (
  <Box position="relative" height="50vh">
    <Box id="wrapper" backgroundImage="url('/images/condoms/wrapper.png')" position="absolute" width="100%" backgroundSize="100%" backgroundRepeat="no-repeat" style={{ height: '50vh' }} />
  </Box>
)

const renderWrapperPieces = () => (
  <Box position="relative" height="50vh">
    <Box id="wrapper-base" backgroundImage="url('/images/condoms/wrapper-open-base.png')" position="absolute" width="100%" backgroundSize="100%" backgroundRepeat="no-repeat" style={{ height: '50vh' }} />
    <Box id="wrapper-piece" backgroundImage="url('/images/condoms/wrapper-open-piece.png')" position="absolute" width="100%" backgroundSize="100%" backgroundRepeat="no-repeat" style={{ height: '50vh', transform: 'rotate(0deg)' }} />
  </Box>
)

const CONDOM_STATES: ActionableElementT[] = [
  {
    renderComponent: renderWrapper,
    text: "Feel for a bubble in the middle of the wrapper to make sure there are no punctures",
    click: {
      x: "50%",
      y: "30%"
    }
  },
  {
    renderComponent: renderWrapperPieces,
    text: "Open the packaging gently",
    drag: {
      xStart: "50%",
      yStart: "10%",
      length: "70%",
      direction: "140",
      animate: [
        {
          id: "wrapper-piece",
          property: ["style", "transform"],
          from: 0,
          to: -30,
          formatNumber: (val) => `rotate(${val}deg)`
        }
      ]
    }
  },
  {
    renderComponent: renderCondomOnBamboo,
    text: "Put the condom on the head of the penis, pull back foreskin if uncircumcised, and pinch the tip of the condom",
    click: {
      x: "52%",
      y: "7%"
    }
  },
  {
    renderComponent: renderCondomOnBamboo,
    text: "Roll the condom to the base of the penis",
    drag: {
      xStart: "52%",
      yStart: "10%",
      direction: "90",
      length: "70%",
      animate: [
        {
          id: "condom",
          property: ["style", "height"],
          from: 10,
          to: 27,
          formatNumber: (val) => `${val}vh`
        },
        {
          id: "base",
          property: ["style", "top"],
          from: -17,
          to: 0,
          formatNumber: (val) => `${val}vh`
        }
      ]
    }
  }
]

export const Condom = ({
  onExerciseDone
}: {
  onExerciseDone: (correct: boolean) => void
}) => {
  const [condomState, setCondomState] = useState(0)
  const [opacityState, setOpacityState] = useState(1)
  const [showNextButton, setShowNextButton] = useState(false)

  const fadeToNext = useCallback(() => {
    if (condomState === CONDOM_STATES.length - 1) {
      setShowNextButton(true)
    } else {
      setOpacityState(0)
      setTimeout(() => {
        setCondomState(condomState => condomState + 1)
        setOpacityState(1)
      }, 1000)
    }
  }, [condomState])

  return (
    <>
      <Text fontSize="2em" fontWeight="bold" m={0} py={4} lineHeight="1em">Practice using male condoms</Text>
      <Box opacity={opacityState} transition="opacity 0.7s">
        {
          CONDOM_STATES[condomState]
          ? (
            <ActionableElement
              state={CONDOM_STATES[condomState]}
              onActionCorrect={() => {
                fadeToNext()
              }}
              onActionIncorrect={() => {}}
            />
          ) : null
        }
      </Box>
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
