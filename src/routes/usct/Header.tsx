import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { USCTUser } from "../../ui/USCTUser/USCTUser";
import { EUserType } from "./USCT";

interface HeaderProps {
  userType: EUserType | null;
  userAuthorized: boolean;
}

export default function Header(props: HeaderProps) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      height={{
        base: "4.5rem",
        "2xl": props.userType === EUserType.CITIZEN ? "6.25rem" : "4.5rem",
      }}
      flexShrink="0"
      borderBottom={
        props.userType === EUserType.CITIZEN_SERVANT
          ? ".0625rem solid secondary.1000"
          : ""
      }
      paddingLeft={{ base: ".5rem", lg: "4rem" }}
      marginBottom={{ base: ".75rem", "2xl": "1.25rem" }}
    >
      <Flex alignItems="center" gap=".75rem">
        <Flex flexShrink="0">
          <Image
            src={
              props.userType === EUserType.CITIZEN_SERVANT
                ? "/images/open-island-citizen-servant.svg"
                : "/images/open-island-citizen.svg"
            }
            alt=""
            w="2.375rem"
            h="2.375rem"
          />
        </Flex>
        <Box display={{ base: "none", sm: "block" }}>
          <Heading fontSize=".75rem" fontWeight="900" lineHeight=".9375rem">
            Care
          </Heading>
          <Text fontSize=".625rem" fontWeight="400" lineHeight=".75rem">
            HEFRSP
            {props.userType === EUserType.CITIZEN && (
              <>
                <br />
                Self-Service Portal
              </>
            )}
          </Text>
        </Box>
      </Flex>
      {props.userAuthorized && <USCTUser userType={props.userType} />}
    </Flex>
  );
}
