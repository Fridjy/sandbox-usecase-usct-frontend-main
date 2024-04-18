import { Box, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { colors } from "../../chakra-overrides/colors";

export const PopupContainer = styled(Box)`
  position: absolute;
  z-index: 10;
  left: calc(100% + 1rem);
  bottom: 4.5rem;

  @media (max-width: 520px) {
    left: -0.5rem;
    bottom: 5.5rem;
  }
`;

export const Popup = styled(Flex)`
  flex-direction: column;
  background-color: ${colors.primary[900]};
  border: 0.125rem solid #ffc107;
  width: 25rem;
  max-width: 25rem;
  height: 33rem;
  color: ${colors.secondary[0]};
  overflow: auto;
  border-radius: 0.75rem;
  gap: 1rem;
  position: relative;
  padding: 2rem 1.5rem 2rem 1.5rem;

  @media (max-width: 400px) {
    width: calc(100vw - 1rem);
  }
`;
