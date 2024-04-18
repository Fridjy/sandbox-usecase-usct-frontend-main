import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import Tooltip from "@ui/Tooltip/Tooltip";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContextualHelpContext } from "../ContextualHelpContext";
import { ContextualTitle } from "../ContextualHelpUtils";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";

export default function AuthoriseCitizen() {
  const { state, dispatch } = useContext(SimulationContext);
  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN,
      description: {
        title: "CITIZEN LOGS IN",
        subtitle: "PRIMARY TASK",
      },
      userAuthorized: false,
      previousStep: "../review-candidate/2895379235",
      nextStep: "../info",
    });
  }, [location]);

  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);

  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: false,
      [BUILDING_BLOCK.IDENTITY]: true,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: false,
      [BUILDING_BLOCK.MESSAGING]: false,
      [BUILDING_BLOCK.PAYMENT]: false,
      [BUILDING_BLOCK.REGISTRATION]: false,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: false,
    });
  }, []);

  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);

  useEffect(() => {
    setLetterContextualTitleMap({
      A: ContextualTitle.LOG_IN,
    });
  }, []);

  return (
    <Center w="100%">
      <VStack maxW="19.5rem" textAlign="center" gap="1.25rem">
        <Heading>Log In</Heading>
        <Tooltip
          letter="A"
          letterPosition="right-center"
          display="flex"
          flexDirection="column"
          gap="1.25rem"
        >
          <Text>
            Our self-service environment is your opportunity to communicate with
            us conveniently and paper-free.
          </Text>
          <Button colorScheme="citizen" as={Link} to="../info" w="100%">
            ID Card
          </Button>
          <Button colorScheme="citizen" as={Link} to="../info" w="100%">
            Mobile ID
          </Button>
          <Button colorScheme="citizen" as={Link} to="../info" w="100%">
            e-ID CARE
          </Button>
          <Button colorScheme="citizen" as={Link} to="../info" w="100%">
            Bank
          </Button>
        </Tooltip>
      </VStack>
    </Center>
  );
}
