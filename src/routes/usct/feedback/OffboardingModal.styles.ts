import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const ModalFlex = styled(Flex)`
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;
