import { ReactComponent as EditIcon } from "@assets/icons/edit.svg";
import { ReactComponent as PlusIcon } from "@assets/icons/plus.svg";
import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Spinner,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import { ConsentTag } from "../usct/consent/ConsentTag";
import { RPCContext } from "./rpc";
import { Package } from "./types";
import { getRole } from "./utils/user";

export default function CandidatesList() {
  const rpc = useContext(RPCContext);
  const navigate = useNavigate();
  const isRegistryOfficer = getRole() === "ROLE_REGISTRY_OFFICER";
  const { data: candidates, isLoading } = useQuery(
    "candidates",
    rpc.getCandidateList,
  );
  return (
    <>
      <Heading mb="2.5rem">Candidate List</Heading>
      <Text mb="2.5rem">
        Please choose a candidate from the list of program candidates to modify
        their information. If you wish to register a new candidate, please use
        the 'Create Candidate' option.
      </Text>
      <Heading mb="1.25rem" size="md">
        Program Candidates
      </Heading>
      <Flex alignItems="center" mb="1.25rem" gap=".625rem">
        <Flex
          w="1.5rem"
          h="1.5rem"
          alignItems="center'"
          justifyContent="center"
          borderRadius="100%"
          backgroundColor={colors.secondary[1000]}
          color={colors.secondary[0]}
        >
          <Text>{candidates?.length}</Text>
        </Flex>
        <Text variant="caps" color={colors.secondary[800]}>
          CANDIDATES
        </Text>
        <Spacer />
        {isRegistryOfficer && (
          <Flex>
            <Button
              onClick={() => navigate(`/driver-poc/candidate/create`)}
              colorScheme="admin"
              leftIcon={<PlusIcon />}
            >
              Create Candidate
            </Button>
          </Flex>
        )}
      </Flex>
      <Table variant="simple">
        <Thead
          backgroundColor={colors.secondary[800]}
          color={colors.secondary[0]}
        >
          <Tr>
            <Th color={colors.secondary[0]}>#</Th>
            <Th color={colors.secondary[0]}>Name</Th>
            <Th color={colors.secondary[0]}>ID Number</Th>
            <Th color={colors.secondary[0]}>Consent</Th>
            <Th color={colors.secondary[0]}>Eligible Packages</Th>
            { isRegistryOfficer && <Th color={colors.secondary[0]}></Th> }
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={isRegistryOfficer?6:5}>
                <Flex justifyContent="center" alignItems="center" w="100%">
                  <Spinner size="md" />
                </Flex>
              </Td>
            </Tr>
          )}
          {candidates?.map((candidate, index) => (
            <Tr
              key={candidate.id}
              onClick={() => navigate(`/driver-poc/candidate/${candidate.id}`)}
              _hover={{
                cursor: "pointer",
                background: colors.secondary[100],
              }}
            >
              <Td borderStartRadius={16}>{index + 1}</Td>
              <Td>
                <Text>{`${candidate.person.firstName} ${candidate.person.lastName}`}</Text>
              </Td>
              <Td>
                <Text>{candidate.person.personalIdCode}</Text>
              </Td>
              <Td>
                <ConsentTag consent={candidate.consent} />
              </Td>
              <Td borderEndRadius={isRegistryOfficer?0:16}>
                {candidate.packages?.length > 0 ? (
                  <HStack gap=".625rem">
                    {candidate?.packages
                      .sort((a: Package, b: Package) =>
                        b.name.localeCompare(a.name),
                      )
                      .map((p) => {
                        return (
                          <Tag
                            justifyContent="center"
                            color={colors.secondary[0]}
                            backgroundColor={colors.secondary[800]}
                            w="8.75rem"
                            key={p.id}
                          >
                            {p.name}
                          </Tag>
                        );
                      })}
                  </HStack>
                ) : (
                  <Tag
                    justifyContent="center"
                    color={colors.secondary[0]}
                    backgroundColor={colors.info[600]}
                    w="8.75rem"
                  >
                    Not Eligible
                  </Tag>
                )}
              </Td>
              {isRegistryOfficer &&
                <Td borderEndRadius={16}>
                  <IconButton
                    variant="borderless"
                    aria-label="Edit candidate"
                    icon={<EditIcon />}
                    onClick={() =>
                      navigate(`/driver-poc/candidate/${candidate.id}`)
                    }
                  />
                </Td>
              }
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
