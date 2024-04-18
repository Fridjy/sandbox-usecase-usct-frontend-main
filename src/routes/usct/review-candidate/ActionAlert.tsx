import { ReactComponent as CalendarIcon } from "@assets/icons/calendar.svg";
import { ReactComponent as FileWarningIcon } from "@assets/icons/file-warning.svg";
import { ReactComponent as TimerIcon } from "@assets/icons/timer.svg";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import Alert from "@ui/Alert/Alert";
import { Link } from "react-router-dom";

const getActionAlertProps = (state: string | null) => {
  switch (state) {
    case "done":
      return {
        icon: <TimerIcon color="white" />,
        content: (
          <Text>
            Candidate is eligible for unconditional cash transfer program.
          </Text>
        ),
        actions: (
          <Button
            colorScheme="admin"
            marginLeft="auto"
            as={Link}
            to="../info?done=true"
          >
            Request to Assign the Candidate
          </Button>
        ),
      };

    case "scheduling":
      return {
        icon: <TimerIcon color="white" />,
        content: (
          <Text>
            Scheduling the payment required for candidate to enroll in the
            program.
          </Text>
        ),
        actions: (
          <Flex direction="column" marginLeft="auto" gap=".625rem">
            <Flex gap=".625rem">
              <Input placeholder="01/01/23" isReadOnly />
              <Button isDisabled>
                <CalendarIcon />
              </Button>
            </Flex>
            <Button colorScheme="admin" as={Link} to="../active-program">
              Enroll Into the Program
            </Button>
          </Flex>
        ),
      };

    default:
      return {
        icon: <FileWarningIcon color="white" height="2rem" width="2rem" />,
        content: (
          <Text>
            Additional validation is required from <br /> applicant to decide
            edibility.
          </Text>
        ),
        actions: (
          <Button
            leftIcon={
              <FileWarningIcon color="white" height="1.25rem" width="1.25rem" />
            }
            marginLeft="auto"
            colorScheme="admin"
            as={Link}
            to="../authorise-citizen"
          >
            Ask For Validation
          </Button>
        ),
      };
  }
};

export const ActionAlert = ({ state }: { state: string | null }) => {
  return <Alert {...getActionAlertProps(state)} />;
};
