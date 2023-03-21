import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { RED } from '../constants/Colors'
import './DragIndicator.css'

export const DragIndicator = ({
  direction,
  length,
  pixelLength,
  onDragged,
  onPartDragged,
  ...props
}: {
  direction: string,
  length: string,
  pixelLength: number,
  onDragged: (direction?: number) => void,
  onPartDragged: (percent: number) => void
} & Record<string, any>) => {
  const [mouseDownPosition, setMouseDownPosition] = useState<{x: number, y: number}>()

  useEffect(() => {
    const onMouseDown = (e: TouchEvent) => {
      const touch = e.touches.item(0)
      if (touch) {
        setMouseDownPosition({x: touch.clientX, y: touch.clientY})
      }
    }

    const onMouseUp = (e: TouchEvent) => {
      const touch = e.touches.item(0)
      if (mouseDownPosition && touch) {
        const draggedDirection = Math.atan2(touch.clientY - mouseDownPosition.y, touch.clientX - mouseDownPosition.x) / Math.PI * 180
        const draggedLength = Math.sqrt(Math.pow(mouseDownPosition.y - touch.clientY, 2) + Math.pow(mouseDownPosition.x - touch.clientX, 2))
        if (Math.abs(draggedDirection - parseInt(direction)) <= 30) {
          if (draggedLength >= pixelLength) {
            onDragged()
          } else {
            onPartDragged(draggedLength / pixelLength);
          }
        }
      }
    }

    window.addEventListener('touchstart', onMouseDown)
    window.addEventListener('touchmove', onMouseUp)

    return () => {
      window.removeEventListener('touchstart', onMouseDown)
      window.removeEventListener('touchmove', onMouseUp)
    }
  }, [mouseDownPosition, setMouseDownPosition, onDragged, onPartDragged, direction, pixelLength])

  return (
    <Box
      w={length}
      h={60}
      transform={`rotate(${direction}deg)`}
      transformOrigin="15px 15px"
      position="absolute"
      {...props}
    >
      <Box
        className="drag-indicator"
        position="absolute"
        bg={RED}
        rounded={999}
        w={30}
        h={30}
        mt={15}
      />
    </Box>
  )
}
