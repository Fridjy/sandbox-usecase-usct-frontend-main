import { ReactComponent as BanknoteIcon } from "@assets/icons/banknote.svg";
import { ReactComponent as CreditCardIcon } from "@assets/icons/credit-card.svg";
import { ReactComponent as HashIcon } from "@assets/icons/hash.svg";
import { ReactComponent as MobilePaymentIcon } from "@assets/icons/mobile-payment.svg";
import radioCheck from "@assets/icons/radio-check.svg";
import { ReactComponent as WalletIcon } from "@assets/icons/wallet.svg";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  Grid,
  GridItem,
  Heading,
  Radio,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Tooltip from "@ui/Tooltip/Tooltip";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContextualHelpContext } from "../ContextualHelpContext";
import { ContextualTitle } from "../ContextualHelpUtils";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";

export default function Enrolment() {
  const { state, dispatch } = useContext(SimulationContext);

  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN,
      description: {
        title: "CITIZEN SELECTS THE PAYMENT METHOD AND ENROLLS",
        subtitle: "PRIMARY TASK",
      },
      userAuthorized: true,
      nextStep: "../candidate-list?state=scheduling",
      previousStep: "../info?done=true",
    });
  }, []);

  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);

  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: false,
      [BUILDING_BLOCK.IDENTITY]: true,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
      [BUILDING_BLOCK.MESSAGING]: true,
      [BUILDING_BLOCK.PAYMENT]: true,
      [BUILDING_BLOCK.REGISTRATION]: false,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: false,
    });
  }, []);

  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);

  useEffect(() => {
    if (paymentMethodSelected) {
      setLetterContextualTitleMap({
        A: ContextualTitle.PROGRAM_RELATED_INFORMATION,
        B: ContextualTitle.CHOOSING_PAYMENT_METHOD,
        C: ContextualTitle.BANK_INFO,
      });
    } else {
      setLetterContextualTitleMap({
        A: ContextualTitle.PROGRAM_RELATED_INFORMATION,
        B: ContextualTitle.CHOOSING_PAYMENT_METHOD,
      });
    }
  }, [paymentMethodSelected]);

  return (
    <Flex direction="column" gap="2.5rem" w="100%">
      <Flex direction="column">
        <Heading fontSize="2.25rem">Enrolling to the Program</Heading>
        <Heading fontSize="1.5rem">Unconditional Social Cash Transfer</Heading>
      </Flex>
      <Tooltip letter="A" display="flex" flexDirection="column" gap="1.25rem">
        <Box>
          <Text>
            You have been assinged to <strong>Monthly Benefit Package</strong>{" "}
            in unconditional social cash transfer program.
          </Text>
          <Text>
            With this benefit package, you and your family will receive:
          </Text>
        </Box>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="1.25rem">
          <Flex alignItems="center" gap="1.25rem">
            <Flex
              borderRadius=".5rem"
              alignItems="center"
              justifyContent="center"
              flexShrink="0"
              w="4rem"
              h="4rem"
              border=".125rem dashed var(--chakra-colors-secondary-1000)"
            >
              <BanknoteIcon
                width="2.125rem"
                height="2.125rem"
                color="var(--chakra-colors-secondary-1000)"
              />
            </Flex>
            <Flex direction="column" gap=".5rem">
              <Heading fontSize="1rem">Monthly cash</Heading>
              <Text>
                Help for you and your family without any additional conditions
              </Text>
            </Flex>
          </Flex>
          <Flex alignItems="center" gap="1.25rem">
            <Flex
              borderRadius=".5rem"
              alignItems="center"
              justifyContent="center"
              flexShrink="0"
              w="4rem"
              h="4rem"
              border=".125rem dashed var(--chakra-colors-secondary-1000)"
            >
              <BanknoteIcon
                width="2.125rem"
                height="2.125rem"
                color="var(--chakra-colors-secondary-1000)"
              />
            </Flex>
            <Flex direction="column" gap=".25rem">
              <Heading fontSize="1rem">Career assessment</Heading>
              <Text>Online monthly consultation and job referrals</Text>
            </Flex>
          </Flex>
        </Grid>
        <Flex direction="column" gap="1.25rem">
          <Heading fontSize="1.125rem">Package payment</Heading>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Start Date</Th>
                  <Th>Payment Details</Th>
                  <Th>Duration</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>01.01.2023</Td>
                  <Td>USCT - Monthly Benefit Package</Td>
                  <Td>6 Months</Td>
                  <Td>$1 234.000</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Tooltip>

      <Tooltip letter="B" display="flex" flexDirection="column" gap="1.25rem">
        <Flex direction="column" gap="1.25rem">
          <Heading fontSize="1.125rem">Preferred Payment Method:</Heading>
          <Text>
            Please select your payment method to enroll into the program.
          </Text>
          <Flex direction="column" gap=".75rem">
            <Box
              borderRadius=".5rem"
              border={`.125rem solid ${
                paymentMethodSelected
                  ? "var(--chakra-colors-secondary-1000)"
                  : "lightgray"
              }`}
            >
              <Flex p="2rem 1.5rem" gap="1.25rem" alignItems="center">
                <CreditCardIcon />
                <Flex direction="column" gap=".5rem">
                  <Heading fontSize="1rem">Electronic Payment</Heading>
                  <Text>Direct cash transfer to your Phone.</Text>
                </Flex>
                <Radio
                  size="lg"
                  ml="auto"
                  borderColor="secondary.1000"
                  _checked={{
                    background: "black",
                    content: `url(${radioCheck})`,
                  }}
                  onChange={() => setPaymentMethodSelected(true)}
                />
              </Flex>
              <Collapse in={paymentMethodSelected}>
                <Box px="1.5rem" pb="1.25rem">
                  <Text mb="1rem">
                    With this method, the arranged amount will be transferred
                    directly to your month at the designated time for
                    each month.
                  </Text>
                  <Text mb="1.5rem">
                    Please review your phone information:
                  </Text>
                  <Tooltip letter="C" letterPosition="top">
                    <Grid
                      marginBottom="1.5rem"
                      gap=".75rem"
                      templateColumns={{ sm: "1fr", xl: "1fr 1fr" }}
                    >
                      <GridItem>
                        <Text size="sm" fontWeight="bold">
                          Wallet Account Owner Name
                        </Text>
                        <Text size="sm">Alcidas Thomas</Text>
                      </GridItem>
                      <GridItem>
                        <Text size="sm" fontWeight="bold">
                           Bank Account Number (BAN)
                        </Text>
                        <Text size="sm">AA02300209000106531065</Text>
                      </GridItem>
                      <GridItem>
                        <Text size="sm" fontWeight="bold">
                          Wallet
                        </Text>
                        <Text size="sm">Haiti Pay</Text>
                      </GridItem>
                    </Grid>
                    <Text
                      align="right"
                      textDecorationLine="underline"
                      color="secondary.500"
                    >
                      Change Account
                    </Text>
                  </Tooltip>
                </Box>
              </Collapse>
            </Box>

            <Flex
              borderRadius=".5rem"
              border=".125rem solid lightgray"
              p="1.625rem 1.8125rem"
              gap="1.25rem"
              alignItems="center"
              color="secondary.600"
            >
              <MobilePaymentIcon />
              <Flex direction="column" gap=".5rem">
                <Heading fontSize="1rem">Mobile Money</Heading>
                <Text>Direct cash transfer to mobile money account.</Text>
              </Flex>
              <Text ml="auto">Available</Text>
            </Flex>
            <Flex
              borderRadius=".5rem"
              border=".125rem solid lightgray"
              p="1.625rem 1.8125rem"
              gap="1.25rem"
              alignItems="center"
              color="secondary.600"
            >
              <HashIcon />
              <Flex direction="column" gap=".5rem">
                <Heading fontSize="1rem">Cash Payment</Heading>
                <Text>Direct cash transfer to your bank account.</Text>
              </Flex>
              <Text ml="auto">NAvailable</Text>
            </Flex>
            <Flex
              borderRadius=".5rem"
              border=".125rem solid lightgray"
              p="1.625rem 1.8125rem"
              gap="1.25rem"
              alignItems="center"
              color="secondary.600"
            >
              <WalletIcon />
              <Flex direction="column" gap=".5rem">
                <Heading fontSize="1rem">Bank Payment</Heading>
                <Text>Direct cash transfer to your bank account.</Text>
              </Flex>
              <Text ml="auto">Not Available*</Text>
            </Flex>
          </Flex>
        </Flex>
        <Checkbox
          size="lg"
          borderColor="secondary.1000"
          colorScheme="black"
          onChange={(e) => {
            setAcceptedTerms(e.target.checked);
          }}
        >
          I reviewed Entitlements of Beneficiaries document and accept...
        </Checkbox>
        <Flex justifyContent="flex-end">
          {paymentMethodSelected && acceptedTerms ? (
            <Button
              w="10.4375rem"
              as={Link}
              to="../candidate-list?state=scheduling"
              colorScheme="citizen"
            >
              Enroll
            </Button>
          ) : (
            <Button
              w="10.4375rem"
              as={Button}
              isDisabled
              _disabled={{ bg: "secondary.400" }}
              colorScheme="secondary"
            >
              Enroll
            </Button>
          )}
        </Flex>
      </Tooltip>
    </Flex>
  );
}
