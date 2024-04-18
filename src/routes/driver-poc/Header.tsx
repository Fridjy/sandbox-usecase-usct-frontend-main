import { ReactComponent as UserIcon } from "@assets/icons/user.svg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { colors } from "../../chakra-overrides/colors";
import { getRole, Scope } from "./utils/user";
import { useAuthentication } from "./utils/useAuthentication";

const userData = {
  ROLE_PAYMENT_OFFICER: {
    name: "Susie May",
    role: "Payment Officer",
  },
  ROLE_ENROLLMENT_OFFICER: {
    name: "Max Bob",
    role: "Enrollment Officer",
  },
  ROLE_REGISTRY_OFFICER: {
    name: "Jason Hans",
    role: "Registry Officer",
  },
};

export default function Header() {
  const { logout, isAuthenticated } = useAuthentication();
  const handleLogOut = () => {
    logout();
  };

  return (
    <Flex
      padding="1.3125rem 7.5rem"
      borderBottom={`.0625rem solid ${colors.secondary[1000]}`}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex gap=".75rem" alignItems="center">
        <Image src="/digital-island-logo.png" />
        <Box>
          <Text size="sm" variant="bold">
            Digital Island
          </Text>
          <Text size="xs">SRIS</Text>
        </Box>
      </Flex>
      {isAuthenticated() && (
        <Flex gap=".75rem" alignItems="center" justifyContent="space-between">
          <Menu>
            <MenuButton
              as={Button}
              height="auto"
              padding=".5rem 1rem"
              rightIcon={<ChevronDownIcon />}
            >
              <Flex gap=".75rem" alignItems="center">
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  color={colors.secondary[0]}
                  w="2rem"
                  h="2rem"
                  borderRadius="100%"
                  padding=".25rem"
                  flexShrink={0}
                  backgroundColor={colors.secondary[1000]}
                >
                  <UserIcon />
                </Flex>
                <Box textAlign="left">
                  <Text size="sm" variant="bold">
                    {userData[getRole() as Scope].name}
                  </Text>
                  <Text size="xs">{userData[getRole() as Scope].role}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
}
