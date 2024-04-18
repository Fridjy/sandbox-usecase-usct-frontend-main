import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Public() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Box as="main" h="100%">
        <Outlet />
      </Box>
    </Flex>
  );
}
