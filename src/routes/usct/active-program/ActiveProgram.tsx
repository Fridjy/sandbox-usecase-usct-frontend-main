import { ReactComponent as BanknoteIcon } from "@assets/icons/banknote.svg";
import { ReactComponent as MaybeCircleIcon } from "@assets/icons/maybe-circle.svg";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
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

const getConfig = (state: string | null) => {
  switch (state) {
    case "done":
      return {
        description: {
          title: "CITIZEN REVIEWS CONVERSATION WITH Ulson",
          subtitle: "PRIMARY TASK",
        },
        nextStep: "../conversation/300",
        previousStep: "../review-case/2895379235",
      };
    default:
      return {
        description: {
          title: "CITIZEN STARTS A NEW CONVERSATION",
          subtitle: "PRIMARY TASK",
        },
        nextStep: "../new-conversation",
        previousStep: "../review-candidate/2895379235?state=scheduling",
      };
  }
};

export default function ActiveProgram() {
  const { state, dispatch } = useContext(SimulationContext);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN,
      userAuthorized: true,
      ...getConfig(searchParams.get("state")),
    });
  }, [location]);

  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);

  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: false,
      [BUILDING_BLOCK.IDENTITY]: false,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
      [BUILDING_BLOCK.MESSAGING]: true,
      [BUILDING_BLOCK.PAYMENT]: true,
      [BUILDING_BLOCK.REGISTRATION]: false,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: true,
    });
  }, []);

  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);
  useEffect(() => {
    setLetterContextualTitleMap({
      A: ContextualTitle.CONVERSATIONS,
      B: ContextualTitle.PROGRAM_RELATED_INFORMATION,
      C: ContextualTitle.PAYMENT_HISTORY,
    });
  }, []);

  return (
    <Flex direction="column" gap="2.5rem" width="100%">
      <Flex direction="column">
        <Heading fontSize="2.25rem">Active Program:</Heading>
        <Heading fontSize="1.5rem">Unconditional Social Cash Transfer</Heading>
      </Flex>
      <Flex direction="column" maxW="60%">
        <Text>
          Unconditional Social Cash Transfer helps families meet their basic
          needs for well-being and safety and serves as their path to
          self-sufficiency.
        </Text>
      </Flex>

      <Box background="theme.light" px="3.75rem" mx="-3.75rem">
        <Tooltip
          py="1.25rem"
          letter="A"
          display="flex"
          flexDirection="column"
          gap="1.25rem"
        >
          <Heading>Conversations</Heading>
          <Text>
            Please start a conversation if you need any help or have any
            question.
          </Text>

          <Tabs isFitted>
            <TabList>
              {searchParams.get("state") === "done" ? (
                <Tab>My Active Conversations (1)</Tab>
              ) : (
                <Tab>My Active Conversations (0)</Tab>
              )}
              <Tab>Closed Conversations (0)</Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                gap="1.25rem"
                display="flex"
                flexDirection="column"
                padding={0}
              >
                <TableContainer
                  backgroundColor={
                    searchParams.get("state") === "done"
                      ? "white"
                      : "transparent"
                  }
                >
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Date</Th>
                        <Th>Topic</Th>
                        <Th>Program</Th>
                        <Th>Status</Th>
                        <Th>#</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        {searchParams.get("state") === "done" ? (
                          <>
                            <Td>01.01.2023</Td>
                            <Td>Package Information</Td>
                            <Td>USCT - Monthly Benefit Package</Td>
                            <Td>
                              <Flex gap=".625rem" alignItems="center">
                                <MaybeCircleIcon /> In Progress
                              </Flex>
                            </Td>
                            <Td>3779394</Td>
                          </>
                        ) : (
                          <Td colSpan={5}>
                            <Flex
                              direction="column"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Heading size="sm">
                                There are no active conversations.
                              </Heading>
                              <Text>
                                Please start a conversation if you need any help
                                or questions.
                              </Text>
                            </Flex>
                          </Td>
                        )}
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>

          <Button as={Link} to={state.nextStep} colorScheme="citizen" ml="auto">
            {searchParams.get("state") === "done"
              ? "Review Conversation"
              : "Start New Conversation"}
          </Button>
        </Tooltip>
      </Box>

      <Tooltip letter="B">
        <Flex direction="column" gap="1.25rem">
          <Flex direction="column">
            <Heading fontSize="1.125rem">Assigned Benefit Package:</Heading>
            <Text>Monthly Benefit Package</Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1.25rem">
            <Flex alignItems="center" gap="1.25rem">
              <Flex
                borderRadius=".5rem"
                alignItems="center"
                justifyContent="center"
                flexShrink="0"
                w="4rem"
                h="4rem"
                border=".125rem dashed black"
              >
                <BanknoteIcon
                  width="2.125rem"
                  height="2.125rem"
                  color="var(--chakra-colors-secondary-1000)"
                />
              </Flex>
              <Flex direction="column" gap=".5rem">
                <Text>
                  Monthly cash help for you and your family without any
                  additional conditions.
                </Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" gap="1.25rem">
              <Flex
                borderRadius=".5rem"
                alignItems="center"
                justifyContent="center"
                flexShrink="0"
                w="4rem"
                h="4rem"
                border=".125rem dashed black"
              >
                <BanknoteIcon
                  width="2.125rem"
                  height="2.125rem"
                  color="var(--chakra-colors-secondary-1000)"
                />
              </Flex>
              <Flex direction="column" gap=".25rem">
                <Text>
                  Career assessment
                </Text>
              </Flex>
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1.25rem">
            <Box>
              <Text fontWeight="600">Payment Amount</Text>
              <Text>1 234.00 at the beginning of each month</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Consultation Date</Text>
              <Text>Please select a date for your consultation</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Duration</Text>
              <Text>01.01.2023 - 01.06.2023 (6 Months)</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Location</Text>
              <Text> Link will be shared ...</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Payment Method</Text>
              <Text>Cash</Text>
            </Box>
          </SimpleGrid>
        </Flex>
      </Tooltip>

      <Tooltip letter="C">
        <Flex direction="column" gap="1.25rem">
          <Heading fontSize="1.125rem">Payment History</Heading>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Method</Th>
                  <Th>Amount</Th>
                  <Th>Payment Details</Th>
                  <Th>Status</Th>
                  <Th>Invoice</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>01.01.2023</Td>
                  <Td>Bank Payment</Td>
                  <Td>1 234.00</Td>
                  <Td>USCT - Monthly Benefit Package</Td>
                  <Td>
                    <Flex gap=".625rem" alignItems="center">
                      <MaybeCircleIcon /> In Progress
                    </Flex>
                  </Td>
                  <Td>#123456789</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Text fontWeight="600">Next Payment: 02.01.2024</Text>
        </Flex>
      </Tooltip>
    </Flex>
  );
}
