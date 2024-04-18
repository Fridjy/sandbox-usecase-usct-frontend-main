import { Button, ButtonGroup, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";

export default function Header() {
  return (
    <Flex
      borderWidth=".125rem"
      borderStyle="solid"
      borderColor="secondary.1000"
      padding="1rem 1.5rem"
      alignItems="center"
      justifyContent="space-between"
      as="header"
    >
      <Flex as="a" href="/" alignItems="center">
        <Image src="/CARE-logo.png" marginRight="1.5rem" />
        <Text fontSize="3xl">
          Open <strong>Care GIPI</strong>
        </Text>
      </Flex>
      <ButtonGroup alignItems="center">
        <Button
          as={Link}
          to="/sign-in"
          variant="outline"
          borderColor="secondary.1000"
          borderWidth=".125rem"
        >
          Login
        </Button>
        <Button
          as={Link}
          to="/sign-up"
          background="secondary.1000"
          color={colors.secondary[0]}
        >
          Sign Up
        </Button>
      </ButtonGroup>
    </Flex>
  );
}
