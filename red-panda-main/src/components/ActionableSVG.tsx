import { ActionableSVG as ActionableSVGT } from "../types/ActionableSVG"
import { ReactSVG } from 'react-svg'
import { Box, Center, Text } from "@chakra-ui/react"
import { TapIndicator } from "./TapIndicator"
import { DragIndicator } from "./DragIndicator"
import { useCallback, useEffect, useState } from "react"

export const ActionableSVG = ({
  state,
  onActionCorrect,
  onActionIncorrect
}: {
  state: ActionableSVGT,
  onActionCorrect?: () => void,
  onActionIncorrect?: () => void
}) => {
  const [percentDone, setPercentDone] = useState(0);
  const [sentActionDone, setSentActionDone] = useState(false);

  useEffect(() => {
    setSentActionDone(false);
  }, [state])

  useEffect(() => {
    if (state.drag?.animate) {
      const element = window.document.getElementById(state.drag.animate.id)
      if (element) {
        const value = state.drag.animate.from + (state.drag.animate.to - state.drag.animate.from) * percentDone
        element.setAttribute(state.drag.animate.property, state.drag.animate.formatNumber(value))
      }
    }
  }, [percentDone, state.drag?.animate]);

  useEffect(() => {
    setPercentDone(0)
  }, [state])

  const sendActionDone = useCallback(() => {
    setSentActionDone(true);
    if (!sentActionDone) {
      onActionCorrect?.()
    }
  }, [onActionCorrect, sentActionDone])

  return <>
    <Text py={4}>{state.text}</Text>
    <Center>
      <Box width="70%" mt={4} position="relative">
        <ReactSVG src={state.image} />
        {
          state.click
          ? (
            <TapIndicator
              left={state.click.x}
              top={state.click.y}
              onClick={() => sendActionDone()}
            />
          ) : null
        }
        {
          state.drag
          ? (
            <DragIndicator
              left={state.drag.xStart}
              top={state.drag.yStart}
              direction={state.drag.direction}
              length={state.drag.length}
              pixelLength={window.innerWidth * 0.6 * parseInt(state.drag.length) / 100}
              onDragged={() => {
                sendActionDone()
              }}
              onPartDragged={(percent: number) => setPercentDone(percent)}
            />
          ) : null
        }
      </Box>
    </Center>
  </>
}
