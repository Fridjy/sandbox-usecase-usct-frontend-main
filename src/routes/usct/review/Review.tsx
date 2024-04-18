import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Tooltip from "@ui/Tooltip/Tooltip";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ContextualHelpContext } from "../ContextualHelpContext";
import { ContextualTitle } from "../ContextualHelpUtils";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";

export default function Review() {
  const location = useLocation();
  const { state, dispatch } = useContext(SimulationContext);

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN,
      description: {
        title: "CITIZEN VALIDATES THEIR INFORMATION",
        subtitle: "PRIMARY TASK",
      },
      nextStep: "../personal?validation=true",
      previousStep: "../personal",
      userAuthorized: true,
    });
  }, [location]);

  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);

  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: true,
      [BUILDING_BLOCK.IDENTITY]: false,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
      [BUILDING_BLOCK.MESSAGING]: false,
      [BUILDING_BLOCK.PAYMENT]: true,
      [BUILDING_BLOCK.REGISTRATION]: true,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: true,
    });
  }, []);

  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);

  useEffect(() => {
    setLetterContextualTitleMap({
      A: ContextualTitle.VALIDATING_INFO,
    });
  }, []);
  return (
    <Box w="100%">
      <Button
        as={Link}
        to="../personal"
        mb="7.25rem"
        variant="ghost"
        leftIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <Tooltip letter="A" letterPosition="right-center">
        <Flex direction="column" w="100%" mb="4.75rem">
          <Heading mb="1.5rem">Validate the Information</Heading>
          <Box>
            <Text mb="1rem">
              Please confirm that the information shown below is correct
            </Text>
            <Flex direction="column" gap="1rem" w={{ sm: "100%", xl: "50%" }}>
              <FormControl
                flexDirection={{ sm: "column", lg: "row" }}
                alignItems={{ sm: "flex-start", lg: "center" }}
                display="flex"
                gap="1rem"
              >
                <FormLabel
                  fontWeight="600"
                  width={{ sm: "100%", lg: "30%" }}
                  m="0"
                >
                  Email Address
                </FormLabel>
                <Input
                  w={{ sm: "100%", lg: "70%" }}
                  defaultValue="tom@myspace.com"
                  isReadOnly
                />
              </FormControl>
              <FormControl
                flexDirection={{ sm: "column", lg: "row" }}
                alignItems={{ sm: "flex-start", lg: "center" }}
                display="flex"
                gap="1rem"
              >
                <FormLabel
                  fontWeight="600"
                  width={{ sm: "100%", lg: "30%" }}
                  m="0"
                >
                  Phone Number
                </FormLabel>
                <Input
                  defaultValue="(+00) 94 843 432"
                  w={{ sm: "100%", lg: "70%" }}
                  isReadOnly
                />
              </FormControl>
            </Flex>
          </Box>
        </Flex>
        <Flex gap=".5rem" alignItems="center" justifyContent="flex-end">
          <ButtonGroup colorScheme="citizen">
            <Button as={Link} to="../personal" variant="outline">
              Back
            </Button>
            <Button
              rightIcon={<ArrowForwardIcon />}
              as={Link}
              to="../personal?validation=true"
            >
              Next
            </Button>
          </ButtonGroup>
        </Flex>
      </Tooltip>
    </Box>
  );
}
