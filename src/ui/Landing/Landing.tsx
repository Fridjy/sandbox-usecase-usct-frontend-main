import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";

export default function Landing() {
  return (
    <Grid templateColumns="3fr 1fr" h="100%">
      <Flex
        paddingTop="8rem"
        gap="4rem"
        direction="column"
        paddingLeft="6.875rem"
        paddingRight="5rem"
        alignItems="center"
      >
        <Text fontSize="4xl" textAlign="center">
          <strong>Open Sandbox</strong> is a{" "}
          <strong>free and public demo</strong> to{" "}
          <strong>try, test (and break)</strong> Care. It&apos;s simulating
          parts of a synthetic governmental eService system - the government of
          Care.
        </Text>
        <Flex direction="column" gap="1rem" alignItems="center">
          <Button
            backgroundColor="secondary.1000"
            color={colors.secondary[0]}
            as={Link}
            to="/sign-up"
          >
            Enter Care now
          </Button>
          <Text>
            It&apos;s <strong>free</strong> and only takes one minute to get
            started!
          </Text>
        </Flex>
      </Flex>
      <Box height="100%" backgroundColor="main.100"></Box>
    </Grid>
  );
}
