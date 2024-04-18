import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar/Navbar";
// import { useAuthentication } from "../utils/useAuthentication";

export default function Root() {
  // useAuthentication();
  return (
    <Flex h="100vh">
      <Navbar />
      <Box overflowY="auto" w="100%">
        <Outlet />
      </Box>
    </Flex>
  );
}
