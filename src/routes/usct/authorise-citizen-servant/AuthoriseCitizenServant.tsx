import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Tooltip from "../../../ui/Tooltip/Tooltip";
import { EUserType, SimulationContext } from "../USCT";

export default function AuthoriseCitizenServant() {
  const { state, dispatch } = useContext(SimulationContext);

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN_SERVANT,
      userAuthorized: false,
      description: {
        title: "PHASE 1 - ELIGIBILITY",
        subtitle: "Ulson LOGS IN",
      },
      progress: 0,
    });
  }, []);
  return (
    <Center w="100%">
      <VStack
        maxW="19.5rem"
        textAlign="center"
        gap="1.25rem"
        position="relative"
      >
        <Heading>Social Login</Heading>
        <Text>
          Please use your National ID Card or CARE ID Card to enter the system.
        </Text>
        <Tooltip letter="A">
          <Button as={Link} to="./case-management" colorScheme="admin" w="100%">
            ID Card
          </Button>
        </Tooltip>
        <Button as={Link} to="./case-management" colorScheme="admin" w="100%">
          Care ID Card
        </Button>
      </VStack>
    </Center>
  );
}
