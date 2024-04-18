import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { colors } from "../../../chakra-overrides/colors";
import { getRole, Scope } from "../utils/user";

interface IActionProps {
  disabled?: boolean;
  to?: string;
  icon?: React.ReactElement;
  title: string;
  description: string;
  buttonText: string;
  allowedRoles?: Scope[];
}

export function Action(props: IActionProps) {
  const { to, icon, title, description, buttonText, allowedRoles = [] } = props;
  const disabled = !allowedRoles.some((role) => role === getRole());
  return (
    <Flex
      direction="column"
      gap="1.25rem"
      border={`.125rem solid ${colors.secondary[1000]}`}
      padding="1.5rem"
      borderRadius=".5rem"
      paddingBottom={disabled ? ".25rem" : "auto"}
    >
      <Flex>
        <Flex
          w="4.25rem"
          h="4.25rem"
          mt=".5rem"
          borderRadius=".5rem"
          backgroundColor={
            disabled ? colors.secondary[400] : colors.primary[900]
          }
          mr="2.125rem"
          flexShrink="0"
          color="white"
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Flex>
        <Box>
          <Text fontWeight="bold" mb=".75rem">
            {title}
          </Text>
          <Text>{description}</Text>
        </Box>
      </Flex>
      <Box mt="auto" w="100%">
        <Button
          w="100%"
          as={Link}
          to={disabled ? "" : to}
          disabled={disabled}
          colorScheme={disabled ? "disabled" : "admin"}
        >
          {disabled ? "Disabled" : buttonText}
        </Button>
        {disabled && (
          <Text size="sm" textAlign="center" color={colors.secondary[900]}>
            You do not have access
          </Text>
        )}
      </Box>
    </Flex>
  );
}
