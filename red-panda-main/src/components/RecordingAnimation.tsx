import { Box, HStack } from "@chakra-ui/react";

import "./RecordingAnimations.css"

export const RecordingAnimation = () => (
  <HStack alignItems="center" justifyItems="center">
    <Box className="audio-bar-animation" width="20%" px={2} height={20} bg="#fff" />
    <Box className="audio-bar-animation" width="20%" px={2} height={20} bg="#fff" />
    <Box className="audio-bar-animation" width="20%" px={2} height={20} bg="#fff" />
  </HStack>
)
