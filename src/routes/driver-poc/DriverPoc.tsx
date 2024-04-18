import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import RPC, { RPCContext } from "./rpc";
export default function DriverPoc() {
  return (
    <RPCContext.Provider value={new RPC()}>
      <Header />
      <Flex p="120px" minH="100vh" flexGrow={1} direction="column">
        <Outlet />
      </Flex>
    </RPCContext.Provider>
  );
}
