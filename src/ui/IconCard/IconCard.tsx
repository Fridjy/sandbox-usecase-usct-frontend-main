import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface IIconCardProps {
  icon: JSX.Element;
  title: string;
  children: React.ReactNode;
}

export default function IconCard({ icon, title, children }: IIconCardProps) {
  return (
    <Box
      w="100%"
      border=".125rem solid black"
      borderRadius=".5rem"
      minH="12.5rem"
    >
      <Flex gap="1.25rem" alignItems="center">
        <Flex
          w="3.75rem"
          h="3.75rem"
          borderBottomRightRadius="2.1875rem"
          borderColor="black"
          borderBottomWidth=".125rem"
          borderRightWidth=".125rem"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Flex>
        <Text>{title}</Text>
      </Flex>
      <Flex direction="column" alignItems="center">
        {children}
      </Flex>
    </Box>
  );
}
