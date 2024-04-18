import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function ScenarioHeader({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) {
  return (
    <SimpleGrid
      templateColumns={{ xs: "5.4375rem 1fr", md: "5.4375rem 1fr 5.4375rem" }}
      padding={{ xs: "1rem .75rem", lg: "1rem 4rem", "2xl": "1.5rem 4rem" }}
      alignItems="center"
      width="100%"
      spacing={{ xs: "2" }}
    >
      <Button
        justifySelf="flex-start"
        display="flex"
        leftIcon={<ArrowBackIcon />}
        as={Link}
        colorScheme="light"
        to="https://www.CARE.global/"
        variant="outline"
      >
        Exit
      </Button>
      <Flex gap="1rem" justifySelf="center" alignItems="center">
        <Image
          height="2.5rem"
          width="auto"
          src="/CARE.svg"
          alt="CARE logo"
        />
        {children}
      </Flex>
    </SimpleGrid>
  );
}
