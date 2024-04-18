import { ReactComponent as HighPriorityIcon } from "@assets/icons/high-priority.svg";
import { ReactComponent as MoreIcon } from "@assets/icons/more-horizontal.svg";
import {
  Button,
  Flex,
  Heading,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Pagination from "@ui/Pagination/Pagination";
import { useContext, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { colors } from "../../../chakra-overrides/colors";
import Tooltip from "../../../ui/Tooltip/Tooltip";
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
    case "scheduling":
    case "enrolled":
      return {
        description: {
          title: "Ulson REVIEWS ASSIGNED CANDIDATE",
          subtitle: "PRIMARY TASK",
        },
        previousStep: "../enrolment",
        nextStep: "../review-candidate/2895379235?state=scheduling",
      };
    case "submitted":
      return {
        description: {
          title: "Ulson REVIEWS ASSIGNED CANDIDATE",
          subtitle: "PRIMARY TASK",
        },
        previousStep: "../case-management?state=submitted",
        nextStep: "../review-candidate/2895379235?state=done",
      };
    default:
      return {
        description: {
          title: "Ulson REVIEWS ASSIGNED CANDIDATE",
          subtitle: "PRIMARY TASK",
        },
        nextStep: "../review-candidate/2895379235",
        previousStep: "../case-management",
      };
  }
};

export default function CandidateList() {
  const { state, dispatch } = useContext(SimulationContext);
  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);
  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isScheduling = searchParams.get("state") === "scheduling";
  const isSubmitted = searchParams.get("state") === "submitted";

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN_SERVANT,
      ...getConfig(searchParams.get("state")),
    });
  }, [location]);

  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: false,
      [BUILDING_BLOCK.IDENTITY]: false,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: false,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
      [BUILDING_BLOCK.MESSAGING]: false,
      [BUILDING_BLOCK.PAYMENT]: false,
      [BUILDING_BLOCK.REGISTRATION]: false,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: false,
    });
  }, []);

  useEffect(() => {
    setLetterContextualTitleMap({
      A: ContextualTitle.ASSIGNED_CANDIDATES,
      B: ContextualTitle.CANDIDATE_LIST,
    });
  }, []);

  return (
    <Flex w="100%" direction="column" gap="3.75rem">
      <Flex gap="1.25rem" direction="column">
        <Heading>Review Candidate</Heading>
        <Flex justifyContent="space-between">
          <Flex gap=".625rem" flexShrink="0" alignItems="center">
            <Flex
              backgroundColor="secondary.1000"
              flexShrink="0"
              alignItems="center"
              justifyContent="center"
              borderRadius="100%"
              w="1.5rem"
              h="1.5rem"
            >
              <Text color="white" fontWeight="700" fontSize="12">
                1
              </Text>
            </Flex>
            <Text fontSize="12" color="secondary.700">
              ASSIGNED CANDIDATES
            </Text>
          </Flex>
        </Flex>
        <Tooltip letter="A" letterPosition="top">
          <Tabs isFitted defaultIndex={isScheduling ? 1 : 0}>
            <TabList>
              <Tab>Eligibility ({isScheduling ? 0 : 1})</Tab>
              <Tab>Enrollment ({isScheduling ? 1 : 0})</Tab>
              <Tab>Active Beneficiaries (21)</Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding="0">
                <Flex direction="column" gap="1.25rem">
                  <TableContainer>
                    <Table variant="simple">
                      <Thead
                        backgroundColor={colors.secondary[800]}
                        color={colors.secondary[0]}
                      >
                        <Tr>
                          <Th color={colors.secondary[0]}>Social ID</Th>
                          <Th color={colors.secondary[0]}>Household Size</Th>
                          <Th color={colors.secondary[0]}>Location</Th>
                          <Th color={colors.secondary[0]}>Latest Update</Th>
                          <Th color={colors.secondary[0]}>Status</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {!isScheduling && (
                          <Tr>
                            <Td>37793946215</Td>
                            <Td>5</Td>
                            <Td>
                              <Flex gap=".625rem" alignItems="center">
                                <HighPriorityIcon /> Ouanaminthe
                              </Flex>
                            </Td>
                            <Td>Yesterday</Td>
                            <Td>
                              <Tag justifyContent="center" w="8.75rem">
                                Action Required
                              </Tag>
                            </Td>
                            <Td>
                              <MoreIcon />
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Flex justifyContent="flex-end">
                    {isScheduling ? (
                      <Button as={Button} colorScheme="secondary" isDisabled>
                        Review Next Candidate
                      </Button>
                    ) : (
                      <Button
                        as={Link}
                        to={
                          isSubmitted
                            ? "../review-candidate/2895379235?state=done"
                            : "../review-candidate/2895379235"
                        }
                        colorScheme="admin"
                      >
                        Review Next Candidate
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel padding="0">
                <Flex direction="column" gap="1.25rem">
                  <TableContainer>
                    <Table variant="simple">
                      <Thead
                        backgroundColor={colors.secondary[800]}
                        color={colors.secondary[0]}
                      >
                        <Tr>
                          <Th color={colors.secondary[0]}>Social ID</Th>
                          <Th color={colors.secondary[0]}>Household Size</Th>
                          <Th color={colors.secondary[0]}>Location</Th>
                          <Th color={colors.secondary[0]}>Latest Update</Th>
                          <Th color={colors.secondary[0]}>Status</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {isScheduling && (
                          <Tr>
                            <Td>37793946215</Td>
                            <Td>5</Td>
                            <Td>
                              <Flex gap=".625rem" alignItems="center">
                                <HighPriorityIcon /> Ouanaminthe
                              </Flex>
                            </Td>
                            <Td>Today</Td>
                            <Td>
                              <Tag justifyContent="center" w="8.75rem">
                                Action Required
                              </Tag>
                            </Td>
                            <Td>
                              <MoreIcon />
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Flex justifyContent="flex-end">
                    {isScheduling ? (
                      <Button
                        as={Link}
                        to="../review-candidate/2895379235?state=scheduling"
                        colorScheme="admin"
                      >
                        Review the Candidate
                      </Button>
                    ) : (
                      <Button
                        as={Link}
                        to="../review-candidate/2895379235?state=scheduling"
                        isDisabled
                        colorScheme="secondary"
                        variant="solid"
                        backgroundColor={colors.secondary[400]}
                      >
                        Review the Candidate
                      </Button>
                    )}
                  </Flex>
                </Flex>
              </TabPanel>
              <TabPanel padding="0"></TabPanel>
            </TabPanels>
          </Tabs>
        </Tooltip>
      </Flex>
      <Flex gap="1.25rem" direction="column">
        <Heading>Candidate List</Heading>
        <Flex justifyContent="space-between">
          <Flex gap=".625rem" flexShrink="0" alignItems="center">
            <Text>
              <strong>211</strong> ACTIVE CANDIDATES
            </Text>
          </Flex>
        </Flex>
        <Tooltip letter="B" letterPosition="top">
          <TableContainer mb="1.25rem">
            <Table variant="simple">
              <Thead
                backgroundColor={colors.secondary[800]}
                color={colors.secondary[0]}
              >
                <Tr>
                  <Th color={colors.secondary[0]}>Candidate No</Th>
                  <Th color={colors.secondary[0]}>Household Size</Th>
                  <Th color={colors.secondary[0]}>Latest Update</Th>
                  <Th color={colors.secondary[0]}>Reviewer</Th>
                  <Th color={colors.secondary[0]}>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>37793946215</Td>
                  <Td>6</Td>
                  <Td>Yesterday</Td>
                  <Td>Joseph Jacques</Td>
                  <Td>
                    <Tag justifyContent="center" w="8.75rem">
                      Pending
                    </Tag>
                  </Td>
                  <Td>
                    <MoreIcon />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <Flex
            justifyContent="space-between"
            gap="1.25rem"
            flexDirection={{ base: "column", xl: "row" }}
          >
            <Pagination />
            <Button
              isDisabled
              colorScheme="secondary"
              backgroundColor={colors.secondary[400]}
              variant="solid"
            >
              Request to Assign New Candidate
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
