import { ReactComponent as EditIcon } from "@assets/icons/edit.svg";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Person } from "../../driver-poc/types";
import { getRole } from "../../driver-poc/utils/user";

export default function PersonalInformation({
  newCandidate,
  person,
}: {
  newCandidate?: boolean;
  person: Person | null;
}) {
  const navigate = useNavigate();
  const id = useParams<{ id: string }>();
  const isRegistryOfficer = getRole() === "ROLE_REGISTRY_OFFICER";
  // const SimulationIcon = reviewed ? YisIcon : FileWarningIcon;

  return (
    <Flex gap="1.5rem" direction="column">
      <Flex>
        {newCandidate ? <Heading mb="2.5rem">New Candidate</Heading> : ""}
        <Heading fontSize="1.125rem">Candidate Information</Heading>
        <Spacer />
        {isRegistryOfficer && !newCandidate ? (
          <Button
            onClick={() =>
              navigate(
                `/driver-poc/candidate/edit/personalInformation/${id.id}`,
                { state: { newCandidate: false } },
              )
            }
            variant="outline"
            colorScheme="admin"
            w="11.25rem"
            leftIcon={<EditIcon />}
          >
            Edit
          </Button>
        ) : (
          ""
        )}
      </Flex>
      <Flex gap="2.5rem" direction={{ base: "column", xl: "row" }}>
        <Avatar
          borderRadius=".5rem"
          maxH="15.875rem"
          maxW="12rem"
          width="100%"
          height="auto"
        />
        <Grid
          w="100%"
          gridTemplateRows="repeat(4, min-content)"
          gridTemplateColumns={{ sm: "repeat(2, 1fr)" }}
          gap="1.25rem"
        >
          <Box>
            <Text fontWeight="600">Name</Text>
            <Text>{`${person?.firstName} ${person?.lastName}`}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Date of Birth</Text>
            <Text>{person?.dateOfBirth}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Personal ID Code</Text>
            <Text>{person?.personalIdCode}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Occupation</Text>
            <Text>{person?.occupation}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Region / District</Text>
            <Text>{person?.region}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Municipality</Text>
            <Text>{person?.municipality}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Home Address</Text>
            <Text>{person?.homeAddress}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">ZIP Code</Text>
            <Text>{person?.zipCode}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Phone Number</Text>
            <Text>{person?.phoneNumber}</Text>
          </Box>
          <Box>
            <Text fontWeight="600">Email Address</Text>
            <Text>{person?.email}</Text>
          </Box>
        </Grid>
      </Flex>
    </Flex>
  );
}
