import { ReactComponent as CheckIcon } from "@assets/icons/check-circle.svg";
import { ReactComponent as FileWarningIcon } from "@assets/icons/file-warning.svg";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Tooltip from "@ui/Tooltip/Tooltip";
import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ContextualHelpContext } from "../ContextualHelpContext";
import { ContextualTitle } from "../ContextualHelpUtils";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";

const getConfig = (done: string | null) => {
  if (done) {
    return {
      description: {
        title: "CITIZEN CHECKS ENROLMENT",
        subtitle: "PRIMARY TASK",
      },
      previousStep: "../review-candidate/2895379235?state=done",
      nextStep: "../enrolment",
    };
  } else {
    return {
      description: {
        title: "CITIZEN REVIEWS ELIGIBILITY",
        subtitle: "PRIMARY TASK",
      },
      previousStep: "../authorise-citizen",
      nextStep: "../personal",
    };
  }
};

export default function Info() {
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContext(SimulationContext);

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN,
      ...getConfig(searchParams.get("done")),
      userAuthorized: true,
    });
  }, [location]);

  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);

  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: false,
      [BUILDING_BLOCK.IDENTITY]: false,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
      [BUILDING_BLOCK.MESSAGING]: false,
      [BUILDING_BLOCK.PAYMENT]: false,
      [BUILDING_BLOCK.REGISTRATION]: false,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: true,
    });
  }, []);

  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);
  useEffect(() => {
    if (searchParams.get("done")) {
      setLetterContextualTitleMap({
        A: ContextualTitle.ELIGIBILITY_STATUS,
        B: ContextualTitle.PERSONAL_INFO,
      });
    } else {
      setLetterContextualTitleMap({
        A: ContextualTitle.ELIGIBILITY_STATUS,
      });
    }
  }, []);

  return (
    <Flex
      mt={{ base: ".5rem", md: "8rem" }}
      gap={{ base: "1.25rem", lg: "7.8125rem" }}
      direction={{ base: "column", lg: "row" }}
    >
      <Box>
        <Box marginBottom="2.5rem">
          <Heading>Social Welfare Progam:</Heading>
          <Heading marginBottom="1.25rem">
            Unconditional Social Cash Transfer
          </Heading>
          <Text>
            Unconditional Social Cash Transfer helps families meet their basic
            needs for well-being and safety and serves as their path to
            self-sufficiency. Unconditional Social Cash Transfer program
            provides temporary cash benefits and supportive services to the
            neediest families.
          </Text>
        </Box>
        <Accordion>
          <AccordionItem>
            <Heading variant="h2" size="md">
              <AccordionButton style={{ font: "inherit" }} px="0">
                <Box as="span" flex="1" textAlign="left">
                  How does it work?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4} px="0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Heading variant="h2" size="md">
              <AccordionButton style={{ font: "inherit" }} px="0">
                <Box as="span" flex="1" textAlign="left">
                  Eligibility and Requirements
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4} px="0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <Heading variant="h2" size="md">
              <AccordionButton style={{ font: "inherit" }} px="0">
                <Box as="span" flex="1" textAlign="left">
                  Similar Programs
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4} px="0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Flex
        direction="column"
        gap="1.25rem"
        width={{ lg: "25%" }}
        flexShrink="0"
      >
        <Tooltip
          letter="A"
          letterPosition="right-center"
          display="flex"
          flexDirection="column"
          gap="1rem"
        >
          {searchParams.get("done") ? (
            <>
              <Flex gap=".5rem">
                <CheckIcon />
                <Heading as="h3" fontSize="1.125rem" lineHeight="1.5rem">
                  Your Eligibility
                </Heading>
              </Flex>
              <Text fontSize=".875rem">
                <strong>You are eligible</strong> for Unconditional Social Cash
                Transfer Program!
              </Text>
              <Text fontSize=".875rem">
                Please check your enrolment status from enrolment page.
              </Text>
              <Button as={Link} to="../enrolment" colorScheme="citizen">
                Enrolment
              </Button>
            </>
          ) : (
            <>
              <Flex gap=".5rem">
                <FileWarningIcon />
                <Heading as="h3" fontSize="1.125rem" lineHeight="1.5rem">
                  Your Eligibility
                </Heading>
              </Flex>
              <Text fontSize=".875rem">
                For deciding your eligibility, some of the Information needs to
                be <strong>validated</strong>.
              </Text>
              <Text fontSize=".875rem">
                Please review your information and provide missing information
                if needed.
              </Text>
              <Button colorScheme="citizen" to="../personal" as={Link}>
                Review
              </Button>
            </>
          )}
        </Tooltip>
        {!!searchParams.get("done") && (
          <Tooltip letter="B">
            <Button
              w="100%"
              colorScheme="citizen"
              variant="outline"
              as={Link}
              to="../personal?done=true"
            >
              My Information
            </Button>
          </Tooltip>
        )}
      </Flex>
    </Flex>
  );
}
