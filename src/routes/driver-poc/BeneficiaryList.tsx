import { ReactComponent as InfoIcon } from "@assets/icons/info.svg";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  CircularProgress,
  Flex,
  Heading,
  Spinner,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import { RPCContext } from "./rpc";
import { Beneficiary } from "./types";
import { useAuthentication } from "./utils/useAuthentication";

export default function BeneficiaryList() {
  const rpc = useContext(RPCContext);
  const [isOrderingPayment, setIsOrderingPayment] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentProcessed, setisPaymentProcessed] = useState(false);
  const [checkedBeneficiaries, setCheckedBeneficiaries] = useState<
    Beneficiary[]
  >([]);

  const { data: beneficiaries } = useQuery(
    `beneficiaries`,
    rpc.getBeneficiariesList,
  );

  const handleCheck = (beneficiary: Beneficiary) => {
    if (checkedBeneficiaries.find((b) => b.id === beneficiary.id)) {
      setCheckedBeneficiaries(
        [...checkedBeneficiaries].filter((b) => b.id !== beneficiary.id),
      );
    } else {
      setCheckedBeneficiaries([...checkedBeneficiaries, beneficiary]);
    }
  };

  const handleConfirmPayment = async () => {
    setIsPaymentProcessing(true);
    const payment = await rpc.executePayments(checkedBeneficiaries);
    if (payment) {
      setisPaymentProcessed(true);
      setIsPaymentProcessing(false);
    } else {
      setIsPaymentProcessing(false);
    }
  };

  const handleReset = () => {
    setCheckedBeneficiaries([]);
    setIsOrderingPayment(false);
    setisPaymentProcessed(false);
  }

  if (isPaymentProcessed) {
    return (
      <Center display="flex" margin="auto">
        <VStack maxW="40rem" gap="2.5rem">
          <Heading size="md" mb="1.25rem">
            Thank you! Payment Order received.
          </Heading>
          <Flex gap="10px" direction="column" padding="10px" border="1px solid" borderColor={colors.admin[500]} borderRadius="10px">
            <Flex gap="10px" direction="row">
              <InfoIcon stroke={colors.admin[500]}/>
              <Text>
                The payment status in the overview table will not be adapted to let other users issue that order as well. <br/>You have reached end of the demo user journey!<br/><br/>
                Thank you very much!
              </Text>
            </Flex>
          </Flex>
          <Box>
            <Button as={Link} to="/driver-poc" mb=".625rem" maxW="23.75rem" w="100%" colorScheme="admin">
              Home
            </Button>
            <ButtonGroup
              maxW="23.75rem"
              w="100%"
              colorScheme="admin"
              variant="outline"
              gap="1.25rem"
            >
              <Button onClick={() => handleReset()} w="100%">
                Beneficiary List
              </Button>
            </ButtonGroup>
          </Box>
        </VStack>
      </Center>
    );
  }

  if (isPaymentProcessing) {
    return (
      <Center display="flex" margin="auto">
        <VStack gap="2.5rem">
          <CircularProgress isIndeterminate size={100} mb="2.5rem" />
          <Heading mb="1.25rem">Receiving Payment Order!</Heading>
          <Text>Please wait! This process might take some time.</Text>
        </VStack>
      </Center>
    );
  }

  if (isOrderingPayment) {
    return (
      <Flex direction="column" gap="3.75rem">
        <Heading>Confirmation</Heading>
        <Text>
          Please confirm that the payment order will be sent for the candidates
          listed below.
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>ID Number</Th>
              <Th>Payment Amount</Th>
              <Th>Benefit Package</Th>
              <Th>Payment Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {checkedBeneficiaries.map((vb) => {
              return (
                <Tr key={vb.id}>
                  <Td>
                    <Text>{`${vb.person.firstName} ${vb.person.lastName}`}</Text>
                  </Td>
                  <Td>
                    <Text>{vb.person.id}</Text>
                  </Td>
                  <Td>
                    <Text>{vb.enrolledPackage.amount}€</Text>
                  </Td>
                  <Td>
                    <Text>{vb.enrolledPackage.name}</Text>
                  </Td>
                  <Td>
                    <Text>{vb.paymentStatus}</Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex justifyContent="flex-end">
          <ButtonGroup colorScheme="admin" gap="1.25rem">
            <Button
              onClick={() => {
                setIsOrderingPayment(false);
              }}
              w="11.25rem"
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={() => handleConfirmPayment()} w="11.25rem">
              Confirm
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <Heading mb="2.5rem">Beneficiary List</Heading>
      <Text mb="2.5rem">
        Please choose the beneficiaries for sending payment order. You can
        select multiple beneficiaries.
      </Text>
      <Heading mb="1.25rem" size="md">
        Beneficiaries
      </Heading>
      <Flex mb="1.25rem" gap=".625rem">
        <Flex
          w="1.5rem"
          h="1.5rem"
          alignItems="center'"
          justifyContent="center"
          borderRadius="100%"
          backgroundColor={colors.secondary[1000]}
          color={colors.secondary[0]}
        >
          <Text>{beneficiaries?.length}</Text>
        </Flex>
        <Text variant="caps" color={colors.secondary[800]}>
          BENEFICIARIES
        </Text>
      </Flex>
      <Table mb="1.25rem" variant="simple">
        <Thead backgroundColor={colors.secondary[800]}>
          <Tr>
            <Th></Th>
            <Th color={colors.secondary[0]}>Name</Th>
            <Th color={colors.secondary[0]}>ID Number</Th>
            <Th color={colors.secondary[0]}>Payment Amount</Th>
            <Th color={colors.secondary[0]}>Benefit Package</Th>
            <Th color={colors.secondary[0]}>Payment Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!beneficiaries && (
            <Tr>
              <Td colSpan={4}>
                <Flex justifyContent="center" alignItems="center" w="100%">
                  <Spinner size="md" />
                </Flex>
              </Td>
            </Tr>
          )}
          {beneficiaries?.map((beneficiary) => (
            <Tr
              key={beneficiary.id}
              _hover={{
                background: colors.secondary[100],
              }}
            >
              <Td>
                <Checkbox
                  size="lg"
                  isChecked={checkedBeneficiaries.some(
                    (b) => beneficiary.id === b.id,
                  )}
                  onChange={() => handleCheck(beneficiary)}
                />
              </Td>
              <Td>
                <Text>{`${beneficiary.person.firstName} ${beneficiary.person.lastName}`}</Text>
              </Td>
              <Td>{beneficiary.person.id}</Td>
              <Td>{beneficiary.enrolledPackage.amount} €</Td>
              <Td>
                <Tag
                  justifyContent="center"
                  color={colors.secondary[0]}
                  backgroundColor={colors.secondary[800]}
                  w="8.75rem"
                >
                  {beneficiary.enrolledPackage.name}
                </Tag>
              </Td>
              <Td>
                <Tag
                  justifyContent="center"
                  color={colors.secondary[0]}
                  backgroundColor={colors.secondary[800]}
                  w="8.75rem"
                  textAlign="center"
                >
                  {beneficiary.paymentStatus}
                </Tag>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="flex-end">
        <Button
        disabled={checkedBeneficiaries.length < 1}
        colorScheme={(checkedBeneficiaries.length > 0)? "admin" : "disabled"}
        onClick={() => (checkedBeneficiaries.length > 0)?setIsOrderingPayment(true):""}>
          Order payment
        </Button>
      </Flex>
    </>
  );
}
