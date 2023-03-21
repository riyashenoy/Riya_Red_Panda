import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GREY, RED } from "../constants/Colors";

import "./ProgressBar.css";

const HEIGHT = 15;

export const ProgressBar = ({
  value,
  target
}: {
  value: number,
  target: number
}) => {
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    if (value !== 0) {
      setShowSparkle(true);
      const timeout = setTimeout(() => {
        setShowSparkle(false)
      }, 500)

      return () => clearTimeout(timeout);
    }    
  }, [value])

  return (
    <Box rounded={999} width="100%" height={HEIGHT} bg={GREY}>
      <Box rounded={999} width={`${Math.max(value / target, 0.08) * 100}%`} height={HEIGHT} bg={RED} transition="width 0.3s" position="relative">
        {showSparkle ? <Box position="absolute" right="0" width={6} height={6} background={RED} rounded={999} className="sparkle" /> : null}
      </Box>
    </Box>
  )
}
