import { ActionableElement as ActionableElementT } from "../types/ActionableElement"
import { Box, Center, Text } from "@chakra-ui/react"
import { TapIndicator } from "./TapIndicator"
import { DragIndicator } from "./DragIndicator"
import { useCallback, useEffect, useState } from "react"

export const ActionableElement = ({
  state,
  onActionCorrect,
  onActionIncorrect,
}: {
  state: ActionableElementT,
  onActionCorrect?: () => void,
  onActionIncorrect?: () => void,
}) => {
  const [percentDone, setPercentDone] = useState(0);
  const [sentActionDone, setSentActionDone] = useState(false);

  const sendActionDone = useCallback(() => {
    if (!sentActionDone) {
      onActionCorrect?.()
      setSentActionDone(true);
    }
  }, [onActionCorrect, sentActionDone])

  useEffect(() => {
    setSentActionDone(false);
    setPercentDone(0);
  }, [state])

  useEffect(() => {
    if (state.drag?.animate) {
      for (const animation of state.drag?.animate) {
        const element = window.document.getElementById(animation.id)
        if (element) {
          const lower = Math.min(animation.from, animation.to)
          const upper = Math.max(animation.from, animation.to)
          const value = Math.max(lower, Math.min(upper, animation.from + (animation.to - animation.from) * percentDone))
          let object = element as Record<string, any>;
          for (let i = 0; i < animation.property.length - 1; ++i) {
            object = object[animation.property[i]]
          }
          object[animation.property[animation.property.length - 1]] = animation.formatNumber(value);
          if (value === animation.to) {
            sendActionDone()
          }
        }
      }
    }
  }, [percentDone, state.drag?.animate, sendActionDone]);

  return <>
    <Text py={4}>{state.text}</Text>
    <Center>
      <Box width="70%" mt={4} position="relative">
        <>
          {state.renderComponent()}
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
        </>
      </Box>
    </Center>
  </>
}
