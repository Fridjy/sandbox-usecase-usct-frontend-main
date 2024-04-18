import { ReactComponent as MoreIcon } from "@assets/icons/more-horizontal.svg";
import {
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Pagination from "@ui/Pagination/Pagination";
import Tooltip from "@ui/Tooltip/Tooltip";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../../chakra-overrides/colors";
import { ContextualHelpContext } from "../ContextualHelpContext";
import { ContextualTitle } from "../ContextualHelpUtils";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";

export default function CaseList() {
  const { state, dispatch } = useContext(SimulationContext);
  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);
  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN_SERVANT,
      description: {
        title: "Ulson REVIEWS THE BENEFICIARY CASE",
        subtitle: "PRIMARY TASK",
      },
      userAuthorized: true,
      previousStep: "../case-management?state=done",
      nextStep: "../review-case/2895379235",
    });
  }, []);

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
      A: ContextualTitle.ASSIGNED_CASES,
      B: ContextualTitle.CASE_LIST,
    });
  }, []);

  return (
    <Flex w="100%" direction="column" gap="3.75rem">
      <Flex gap="1.25rem" direction="column">
        <Heading>Active Cases</Heading>
        <Flex justifyContent="space-between">
          <Flex gap=".625rem" flexShrink="0" alignItems="center">
            <Flex
              color="white"
              backgroundColor="secondary.1000"
              flexShrink="0"
              alignItems="center"
              justifyContent="center"
              borderRadius="100%"
              w="1.5rem"
              h="1.5rem"
              fontSize=".75rem"
              fontWeight="700"
            >
              1
            </Flex>
            <Text color="secondary.500" fontSize=".75rem">
              ACTIVE CASES
            </Text>
          </Flex>
        </Flex>
        <Tooltip letter="A" letterPosition="top">
          <Flex direction="column" gap="1.25rem">
            <TableContainer>
              <Table variant="simple">
                <Thead
                  backgroundColor={colors.secondary[800]}
                  color={colors.secondary[0]}
                >
                  <Tr>
                    <Th color={colors.secondary[0]}>#</Th>
                    <Th color={colors.secondary[0]}>Topic</Th>
                    <Th color={colors.secondary[0]}>Case Created</Th>
                    <Th color={colors.secondary[0]}>Latest Update</Th>
                    <Th color={colors.secondary[0]}>Status</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>3779394</Td>
                    <Td>Package Information</Td>
                    <Td>01/01/2023</Td>
                    <Td>Yesterday</Td>
                    <Td>Action Required</Td>
                    <Td>
                      <MoreIcon />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Flex justifyContent="flex-end">
              <Button
                as={Link}
                to="../review-case/2895379235"
                colorScheme="admin"
              >
                Review Next Case
              </Button>
            </Flex>
          </Flex>
        </Tooltip>
      </Flex>
      <Flex gap="1.25rem" direction="column">
        <Heading>Canditate List</Heading>
        <Flex justifyContent="space-between">
          <Flex gap=".5rem" flexShrink="0" alignItems="center">
            <Text fontSize="12" fontWeight="bold">
              211
            </Text>
            <Text color="secondary.700" fontSize="12">
              ACTIVE CANDIDATES
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
                  <Th color={colors.secondary[0]}>#</Th>
                  <Th color={colors.secondary[0]}>Topic</Th>
                  <Th color={colors.secondary[0]}>Case Created</Th>
                  <Th color={colors.secondary[0]}>Case Closed</Th>
                  <Th color={colors.secondary[0]}>Status</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>37793946215</Td>
                  <Td>Other</Td>
                  <Td>01/01/2023</Td>
                  <Td>01/01/2023</Td>
                  <Td>
                    <Tag width="8.75rem" justifyContent="center">
                      Resolved
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
            direction={{ base: "column", md: "row" }}
            gap="1.25rem"
            justifyContent="space-between"
          >
            <Pagination />
            <Button isDisabled>Request to Assign New Candidate</Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
