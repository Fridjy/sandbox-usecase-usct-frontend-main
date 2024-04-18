import { ReactComponent as SaveIcon } from "@assets/icons/save.svg";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Grid,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RPCContext } from "../../driver-poc/rpc";
import { Candidate } from "../../driver-poc/types";

export default function BankInformationEdit({
  candidatei,
  setCandidateData,
  handleBack,
  handleContinue,
}: {
  candidatei?: Candidate;
  setCandidateData?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBack?: () => void;
  handleContinue?: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const rpc = useContext(RPCContext);
  const state = useLocation().state;
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState<Candidate>(
    candidatei ? candidatei : state.candidate,
  );
  const { isFetching } = useQuery(`candidate-${id}`, async () => {
    if (id) {
      return setCandidate(await rpc.getCandidateInfo(+id));
    }
  });

  if (isFetching) {
    <Center>
      <Spinner />
    </Center>;
  }

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    if (!candidatei) {
      candidate.person = Object.assign({}, candidate.person, {
        [e.target.name]: e.target.value,
      });
    } else {
      if (e) {
        setCandidateData && setCandidateData(e);
      }
    }
    validateFields();
  };

  const updateCandidate = async () => {
    rpc.updateCandidate(candidate);
    return navigate("/driver-poc/candidate/" + id);
  };

  const validateFields = () => {
    const inputs = Array.from(document.querySelectorAll("input"));
    setEnabled(inputs.every((target) => target.value !== ""));
  };

  return (
    <Box>
      {!isFetching ? (
        <>
          <Flex>
            <Heading variant="h3" size="sm" mb="1.5rem">
              Bank Information
            </Heading>
          </Flex>
          <Flex>
            <Grid
              w="100%"
              gridTemplateRows="repeat(4, min-content)"
              gridTemplateColumns={{ sm: "repeat(2, 1fr)" }}
              gap="1.25rem"
            >
              <Box>
                <Text fontWeight="600">Bank Account Owner Name</Text>
                <Input
                  placeholder="Bank Account Owner Name"
                  name="bankAccountOwnerName"
                  onChange={(e) => updateData(e)}
                  defaultValue={
                    candidatei
                      ? candidatei.person.bankAccountOwnerName
                      : candidate.person.bankAccountOwnerName
                  }
                />
              </Box>
              <Box>
                <Text fontWeight="600">
                  International Bank Account Number (IBAN)
                </Text>
                <Input
                  placeholder="International Bank Account Number"
                  name="iban"
                  onChange={(e) => updateData(e)}
                  defaultValue={
                    candidatei ? candidatei.person.iban : candidate.person.iban
                  }
                />
              </Box>
              <Box>
                <Text fontWeight="600">Bank Name</Text>
                <Input
                  placeholder="Bank Name"
                  name="bankName"
                  onChange={(e) => updateData(e)}
                  defaultValue={
                    candidatei
                      ? candidatei.person.bankName
                      : candidate.person.bankName
                  }
                />
              </Box>
            </Grid>
          </Flex>
          <Flex justifyContent="flex-end">
            <ButtonGroup colorScheme="admin">
              {/* To be figured out */}
              <Button
                onClick={() =>
                  candidatei ? handleBack && handleBack() : navigate(-1)
                }
                w="11.25rem"
                variant="outline"
              >
                Back
              </Button>
              <Button
                disabled={!enabled}
                colorScheme={!enabled ? "disabled" : "admin"}
                onClick={() =>
                  enabled
                    ? !candidatei
                      ? updateCandidate()
                      : handleContinue && handleContinue()
                    : ""
                }
                w="11.25rem"
                leftIcon={<SaveIcon />}
              >
                {!candidatei ? "Save" : "Next"}
              </Button>
            </ButtonGroup>
          </Flex>
        </>
      ) : (
        ""
      )}
    </Box>
  );
}
