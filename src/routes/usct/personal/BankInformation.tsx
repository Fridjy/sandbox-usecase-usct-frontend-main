import { ReactComponent as EditIcon } from "@assets/icons/edit.svg";
import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Candidate } from "../../driver-poc/types";
import { getRole } from "../../driver-poc/utils/user";

interface BankInformationProps {
  candidate: Candidate;
  newCandidate?: boolean;
}

export default function BankInformation({
  candidate,
  newCandidate,
}: BankInformationProps) {
  const id = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isRegistryOfficer = getRole() == "ROLE_REGISTRY_OFFICER";
  return (
    <Box>
      <Flex display="flex">
        <Heading variant="h3" size="sm" mb="1.5rem">
          Bank Information
        </Heading>
        <Spacer />
        {isRegistryOfficer && !newCandidate ? (
          <Button
            onClick={() =>
              navigate(`/driver-poc/candidate/edit/bankInformation/${id.id}`, {
                state: { candidate },
              })
            }
            w="11.25rem"
            variant="outline"
            colorScheme="admin"
            leftIcon={<EditIcon />}
          >
            Edit
          </Button>
        ) : (
          ""
        )}
      </Flex>
      <Flex
        gap="1.25rem"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        flexWrap="wrap"
      >
        <Box>
          <Text fontWeight="600">Bank Account Owner Name</Text>
          <Text>{candidate.person.bankAccountOwnerName}</Text>
        </Box>
        <Box>
          <Text fontWeight="600">International Bank Account Number (IBAN)</Text>
          <Text>{candidate.person.iban}</Text>
        </Box>
        <Box>
          <Text fontWeight="600">Bank Name</Text>
          <Text>{candidate.person.bankName}</Text>
        </Box>
      </Flex>
    </Box>
  );
}
