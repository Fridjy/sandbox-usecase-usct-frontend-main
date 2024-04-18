import { ReactComponent as InfoIcon } from "@assets/icons/info.svg";
import { ReactComponent as DeleteIcon } from "@assets/icons/trash.svg";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  CircularProgress,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import Consent from "../usct/consent/Consent";
import BankInformation from "../usct/personal/BankInformation";
import PersonalInformation from "../usct/personal/PersonalInformation";
import { RPCContext } from "./rpc";
import { Package } from "./types";
import { useAuthentication } from "./utils/useAuthentication";
import { getRole } from "./utils/user";

export default function CandidateDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const rpc = useContext(RPCContext);
  const [selectedPackage, setSelectedPackage] = useState<Package>();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const isEnrollmentOfficer = getRole() === "ROLE_ENROLLMENT_OFFICER";
  const isRegistryOfficer = getRole() === "ROLE_REGISTRY_OFFICER";

  const { data: packages } = useQuery("packages", rpc.getPackages);

  const { data: candidate, isFetching } = useQuery(
    `candidate-${id}`,
    async () => {
      if (id) {
        const res = await rpc.getCandidateInfo(+id);
        return res.person != null ? res : navigate("/driver-poc");
      }
    },
  );
  const deleteCandidate = async (id: number) => {
    rpc.deleteCandidate(id);
    return navigate("/driver-poc/candidates");
  };

  const handleEnroll = async (selectedPackage?: Package) => {
    if (candidate && selectedPackage) {
      setIsEnrolling(true);
      const res = await rpc.enrollCandidate(candidate, selectedPackage);
      if (res) {
        setIsEnrolled(true);
      }
    }
  };

  const { logout } = useAuthentication();
  const handleLogOut = () => {
    logout();
  };

  if (isFetching) {
    <Center>
      <Spinner />
    </Center>;
  }
  if (isEnrolled) {
    return (
      <Center display="flex" margin="auto">
        <VStack maxW="40rem" gap="2.5rem">
          <Heading size="md" mb="1.25rem">
            Thank you! Candidate Enrolled into the program.
          </Heading>
          <Box>
            <Text size="lg" mb="1.25rem">
              The Candidate has been successfully enrolled in the Unconditional
              Social Cash Transfer Program and has become a beneficiary of the
              program.
            </Text>
            <Flex gap="10px" direction="column" padding="10px" border="1px solid" borderColor={colors.admin[500]} borderRadius="10px">
              <Flex gap="10px" direction="row">
                <InfoIcon stroke={colors.admin[500]}/>
                <Text>
                  To continue the demo and order a payment to the enrolled candidate, log out of the current role and log in as a Payment Officer.<br/><br/>
                  Please find credentials in the documentation.
                </Text>
              </Flex>
              <Flex justifyContent="center">
                <Button mb=".625rem" maxW="23.75rem" variant="outline" colorScheme="admin" onClick={handleLogOut}>
                  Log out
                </Button>
              </Flex>
            </Flex>
            {/* <Text size="lg">
              To initiate a payment for the beneficiary, kindly access the
              beneficiary list.
            </Text> */}
          </Box>
          <Box>
            {/* <Button mb=".625rem" maxW="23.75rem" w="100%" colorScheme="admin">
              Home
            </Button> */}
            <ButtonGroup
              maxW="23.75rem"
              w="100%"
              colorScheme="admin"
              variant="solid"
              gap="1.25rem"
            >
              <Button as={Link} to="/driver-poc/candidates" w="100%">
                Candidate List
              </Button>
            </ButtonGroup>
          </Box>
        </VStack>
      </Center>
    );
  }
  if (isEnrolling) {
    return (
      <Center display="flex" margin="auto">
        <VStack gap="2.5rem">
          <CircularProgress isIndeterminate size={100} mb="2.5rem" />
          <Heading mb="1.25rem">Enrolling!</Heading>
          <Text>Please wait! This process might take some time.</Text>
        </VStack>
      </Center>
    );
  }
  return (
    <Flex direction="column" gap="3.75rem">
      {/* <Heading>Assign candidate to the program</Heading> */}
      {candidate ? (
        <>
        <PersonalInformation person={candidate.person} />
          <Consent allowRequest={isEnrollmentOfficer} candidate={candidate} />
          <BankInformation candidate={candidate} />
          {isEnrollmentOfficer ? (
          <Flex direction="column" gap="1.25rem">
              <Heading size="md">Select a Benefit Package</Heading>
            <SimpleGrid columns={4} gap="2.5rem">
              {packages?.map((p) => {
                return (
                  <button
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-start",
                      borderRadius: ".5rem",
                      flexDirection: "column",
                      border: `.0625rem solid ${colors.secondary[1000]}`,
                      padding: "1.25rem",
                      color: candidate.packages.some(
                        (candidatePackage: Package) =>
                          candidatePackage.id === p.id,
                      )
                        ? colors.secondary[1000]
                        : colors.secondary[200],
                    }}
                    key={p.id}
                    disabled={
                      !candidate.packages.some(
                        (candidatePackage) => candidatePackage.id === p.id,
                      )
                    }
                    onClick={() => setSelectedPackage(p)}
                  >
                    <Flex justifyContent="space-between" gap="1.25rem" w="100%">
                      <Text textAlign="left" size="lg">
                        <strong>{p.name}</strong>
                      </Text>
                        <Box
                          w="1.25rem"
                          h="1.25rem"
                          flexShrink="0"
                          borderRadius="100%"
                          border={`.0625rem solid ${colors.secondary[1000]}`}
                          backgroundColor={
                            selectedPackage?.id === p.id
                              ? colors.secondary[1000]
                              : colors.secondary[0]
                          }
                        ></Box>
                    </Flex>
                    <Text textAlign="left">{p.description}</Text>
                    <Text textAlign="left">Payment Amount: 1 234 €</Text>
                    {!candidate.packages.some(
                      (candidatePackage: Package) =>
                        candidatePackage.id === p.id,
                    ) && (
                      <Text
                        color={colors.secondary[200]}
                        size="sm"
                        textAlign="right"
                        w="100%"
                        mt="auto"
                      >
                        Not eligible
                      </Text>
                    )}
                  </button>
                );
              })}
            </SimpleGrid>
          </Flex>
          ) : (
            ""
          )}
          <Flex>
            {isRegistryOfficer ? (
              <Flex>
                <Button
                  onClick={() => deleteCandidate(candidate.id)}
                  colorScheme="red"
                  leftIcon={<DeleteIcon />}
                  w="11.25rem"
                >
                  Delete candidate
                </Button>
              </Flex>
            ) : (
              ""
            )}
            <Spacer />
            <Flex>
              <ButtonGroup colorScheme="admin">
                <Button
                  as={Link}
                  to="/driver-poc/candidates"
                  w="11.25rem"
                  variant={isEnrollmentOfficer ? "outline" : "solid"}
                >
                  Back
                </Button>
                {isEnrollmentOfficer ? (
                  <Button
                    w="11.25rem"
                    onClick={() => handleEnroll(selectedPackage)}
                  >
                    Enroll
                  </Button>
                ) : (
                  ""
                )}
              </ButtonGroup>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" w="100%">
          <Spinner size="lg" />
        </Flex>
      )}
    </Flex>
  );
}
