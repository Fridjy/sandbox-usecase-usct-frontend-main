import { ReactComponent as BanknoteIcon } from "@assets/icons/banknote.svg";
import { ReactComponent as CardIcon } from "@assets/icons/credit-card-simple.svg";
import { ReactComponent as FileWarningIcon } from "@assets/icons/file-warning.svg";
import { ReactComponent as MoreIcon } from "@assets/icons/more-horizontal.svg";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Timeline from "@ui/Timeline/Timeline";
import Tooltip from "@ui/Tooltip/Tooltip";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { colors } from "../../../chakra-overrides/colors";
import { ContextualHelpContext } from "../ContextualHelpContext";
import { ContextualTitle } from "../ContextualHelpUtils";
import BankInformation from "../personal/BankInformation";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";
import { ActionAlert } from "./ActionAlert";
import { bankData, getHistoryData, householdData, personData } from "./data";

const getConfig = (state: string | null) => {
  if (state === "done") {
    return {
      description: {
        title: "Ulson REQUESTS TO ASSIGN THE CANDIDATE",
        subtitle: "PRIMARY TASK",
      },
      nextStep: "../info?done=true",
      previousStep: "../candidate-list?state=submitted",
    };
  }
  if (state === "scheduling") {
    return {
      description: {
        title: "Ulson ENROLLS THE CANDIDATE",
        subtitle: "PRIMARY TASK",
      },
      nextStep: "../active-program",
      previousStep: "../candidate-list?state=scheduling",
    };
  }
  return {
    description: {
      title: "Ulson ASKS FOR VALIDATION",
      subtitle: "PRIMARY TASK",
    },
    nextStep: "../authorise-citizen",
    previousStep: "../candidate-list",
  };
};

export default function ReviewCandidate() {
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContext(SimulationContext);
  const citizen = personData;
  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);
  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN_SERVANT,
      userAuthorized: true,
      ...getConfig(searchParams.get("state")),
    });
  }, []);

  useEffect(() => {
    if (searchParams.get("state") === "scheduling") {
      setActiveBuildingBlocks({
        [BUILDING_BLOCK.CONSENT]: false,
        [BUILDING_BLOCK.IDENTITY]: false,
        [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
        [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
        [BUILDING_BLOCK.MESSAGING]: false,
        [BUILDING_BLOCK.PAYMENT]: true,
        [BUILDING_BLOCK.REGISTRATION]: true,
        [BUILDING_BLOCK.SCHEDULING]: true,
        [BUILDING_BLOCK.WORKFLOW]: true,
      });
    } else {
      setActiveBuildingBlocks({
        [BUILDING_BLOCK.CONSENT]: false,
        [BUILDING_BLOCK.IDENTITY]: false,
        [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
        [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
        [BUILDING_BLOCK.MESSAGING]: false,
        [BUILDING_BLOCK.PAYMENT]: true,
        [BUILDING_BLOCK.REGISTRATION]: false,
        [BUILDING_BLOCK.SCHEDULING]: false,
        [BUILDING_BLOCK.WORKFLOW]: true,
      });
    }
  }, []);

  useEffect(() => {
    setLetterContextualTitleMap({
      A: ContextualTitle.REQUESTING_INFO,
      B: ContextualTitle.PERSONAL_INFO,
      C: ContextualTitle.PROGRAM_RELATED_INFORMATION,
      D: ContextualTitle.BANK_INFO,
    });
  }, []);

  const currentState = searchParams.get("state");

  return (
    <Flex w="100%" direction="column" gap="3.75rem">
      <Flex direction="column" gap="1.25rem">
        <Flex justifyContent="space-between">
          <Flex alignItems="center" gap=".75rem">
            <Heading variant="h2" fontSize="1.5rem">
              Candidate Info
            </Heading>
            <Tag colorScheme="info">Action Required</Tag>
          </Flex>
        </Flex>
        <Tooltip letter="A">
          <ActionAlert state={searchParams.get("state")} />
        </Tooltip>

        <Tooltip letter="B" mb=".625rem">
          <Box mb="1.25rem">
            <Heading variant="h3" fontSize="1.125rem">
              Personal Information
            </Heading>
            <Heading variant="h3" fontSize="1.125rem" color="secondary.800">
              Social ID: {citizen?.socialCode}
            </Heading>
          </Box>
          <Grid
            w="100%"
            gridTemplateRows="repeat(4, min-content)"
            gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
            gap="1.4375rem"
          >
            <Box>
              <Text fontWeight="600">Name</Text>
              <Text>{citizen?.fullName}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Occupation</Text>
              <Text>{citizen?.occupation}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Personal ID Code</Text>
              <Text>{citizen?.idCode}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Address</Text>
              <Text>{citizen?.fullAddress}</Text>
            </Box>
            <Box>
              <Flex gap=".75rem">
                <Text fontWeight="600">Phone Number</Text>
                {!currentState && <FileWarningIcon></FileWarningIcon>}
              </Flex>
              <Text color="gray">{citizen?.phoneNumber}</Text>
            </Box>
            <Box>
              <Flex gap=".75rem">
                <Text fontWeight="600">E-mail</Text>
                {!currentState && <FileWarningIcon></FileWarningIcon>}
              </Flex>
              <Text color="gray">{citizen?.email}</Text>
            </Box>
            <Box>
              <Text fontWeight="600">Date of Birth</Text>
              <Text>
                {citizen?.dateOfBirth
                  ? new Date(citizen?.dateOfBirth).toLocaleString("et", {
                      day: "2-digit",
                      year: "numeric",
                      month: "2-digit",
                    })
                  : ""}
              </Text>
            </Box>
          </Grid>
        </Tooltip>

        <Tooltip letter="C">
          <Flex direction="column" gap="3.75rem">
            <Flex direction="column" gap="1.875rem">
              <Flex direction={{ base: "column", lg: "row" }}>
                <Flex w="100%" direction="column" gap=".75rem">
                  <Heading variant="h3" fontSize="1.125rem">
                    Household needs
                  </Heading>
                  <Flex flexWrap="wrap" gap=".25rem">
                    {citizen.householdNeeds.map((need) => {
                      return (
                        <Tag
                          p=".375rem .75rem"
                          mb=".75rem"
                          colorScheme="gray"
                          variant="outline"
                          key={need}
                        >
                          <TagLabel>{need}</TagLabel>
                        </Tag>
                      );
                    })}
                  </Flex>
                </Flex>
                <Flex w="100%" direction="column" gap=".75rem">
                  <Heading variant="h3" fontSize="1.125rem">
                    Recommended Benefit Package
                  </Heading>
                  {!searchParams.get("state") ? (
                    <Text>
                      Additional information required to decide eligibility and
                      recommend benefit packages
                    </Text>
                  ) : (
                    <Flex gap="1.25rem">
                      <Flex
                        h="3.5rem"
                        w="3.5rem"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius=".5rem"
                        border=".125rem solid var(--chakra-colors-secondary-1000)"
                      >
                        <BanknoteIcon color="var(--chakra-colors-secondary-1000)" />
                      </Flex>
                      <Text>
                        Monthly Package <br /> Monthly Cash help for families in
                        need.
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              {searchParams.get("state") === "scheduling" && (
                <Box>
                  <Heading variant="h3" fontSize="1.125rem" mb=".75rem">
                    Selected Payment Method
                  </Heading>
                  <Flex gap="1.25rem">
                    <Flex
                      h="3.5rem"
                      w="3.5rem"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius=".5rem"
                      border=".125rem solid var(--chakra-colors-secondary-1000)"
                    >
                      <CardIcon color="var(--chakra-colors-secondary-1000)" />
                    </Flex>
                    <Box>
                      <Text>Bank Payment</Text>
                      <Text size="sm" fontWeight="500">
                        Direct cash transfer to beneficaries bank account.
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              )}
            </Flex>
            <Flex direction="column" gap="1.25rem">
              <Heading variant="h3" fontSize="1.125rem">
                Household information
              </Heading>
              <TableContainer>
                <Table variant="simple" size="sm">
                  <Thead
                    backgroundColor={colors.secondary[800]}
                    color={colors.secondary[0]}
                  >
                    <Tr>
                      <Th color={colors.secondary[0]}>National ID</Th>
                      <Th color={colors.secondary[0]}>Name</Th>
                      <Th color={colors.secondary[0]}>Relation</Th>
                      <Th color={colors.secondary[0]}>Date of Birth</Th>
                      <Th color={colors.secondary[0]}>Individual Needs</Th>
                      <Th>
                        <IconButton
                          borderRadius="100%"
                          icon={<AddIcon />}
                          aria-label="asd"
                          size="xs"
                        />
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {householdData.map((person) => {
                      return (
                        <Tr key={person.personalCode}>
                          <Td>{person.personalCode}</Td>
                          <Td>{person.name}</Td>
                          <Td>{person.relation}</Td>
                          <Td>{person.dateOfBirth}</Td>
                          <Td>
                            <Flex wrap="wrap" gap=".25rem">
                              {person.needs.map((need) => (
                                <Tag
                                  p=".375rem .75rem"
                                  variant="outline"
                                  colorScheme="gray"
                                  key={need}
                                >
                                  <TagLabel>{need}</TagLabel>
                                </Tag>
                              ))}
                            </Flex>
                          </Td>
                          <Td>
                            <MoreIcon />
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Tooltip>
      </Flex>

      <Tooltip letter="D">
        <Box>
          <BankInformation {...bankData} />
        </Box>
      </Tooltip>

      <Box>
        <Heading variant="h3" size="sm" mb="1.25rem">
          Candidate's Program History
        </Heading>
        <Flex flexDirection="column" gap="1.25rem">
          {getHistoryData(currentState).map(
            (historyItem: { title: string; icon: JSX.Element }) => (
              <Timeline key={historyItem?.title} {...historyItem}></Timeline>
            ),
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
