import { Box, Flex } from "@chakra-ui/react";

interface IAlertProps {
  icon: JSX.Element;
  content: JSX.Element;
  actions: JSX.Element;
}

export default function Alert({ icon, content, actions }: IAlertProps) {
  return (
    <Flex
      alignItems="center"
      border=".0625rem solid var(--chakra-colors-primary-900)"
      borderRadius=".5rem"
      padding="1.125rem 2.25rem"
      gap=".875rem"
      direction={{ base: "column", xl: "row" }}
      justifyContent={{ base: "space-between" }}
    >
      <Flex
        gap={{ base: "1.375rem", lg: "2.75rem" }}
        alignItems="center"
        w={{ base: "100%", xl: "auto" }}
        justifyContent={{ base: "space-between", xl: "flex-start" }}
      >
        <Flex
          flexShrink="0"
          borderRadius="100%"
          alignItems="center"
          justifyContent="center"
          w="4rem"
          h="4rem"
          backgroundColor="primary.900"
          color="white"
        >
          {icon}
        </Flex>
        <Box flexGrow={1}>{content}</Box>
      </Flex>
      {actions}
    </Flex>
  );
}
