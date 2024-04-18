import { ReactComponent as ApplicantIcon } from "@assets/icons/people_person.svg";
import { ReactComponent as CivilServantIcon } from "@assets/icons/user.svg";
import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useContext } from "react";
import { EUserType } from "../../routes/usct/ContextualHelpUtils";
import { SimulationContext } from "../../routes/usct/USCT";

const UserIcon = ({
  type,
  variant,
}: {
  type: EUserType;
  variant: "foreground" | "background";
}) => {
  const icon = {
    [EUserType.CITIZEN]: ApplicantIcon,
    [EUserType.CITIZEN_SERVANT]: CivilServantIcon,
  };

  const bg = {
    [EUserType.CITIZEN]: "green.600",
    [EUserType.CITIZEN_SERVANT]: "primary.700",
  };

  const foregroundIconSize = useBreakpointValue({
    base: { height: "1.375rem", width: "1.375rem" },
    "2xl": { height: "1.875rem", width: "1.875rem" },
  });

  const backgroundIconSize = useBreakpointValue({
    base: { height: "1rem", width: "1rem" },
    "2xl": { height: "1.375rem", width: "1.375rem" },
  });

  if (variant === "foreground") {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height={{ base: "2.5rem", "2xl": "3rem" }}
        width={{ base: "2.5rem", "2xl": "3rem" }}
        borderRadius="50%"
        color="theme.light"
        bg={bg[type]}
        position="absolute"
        bottom="0rem"
        right="0rem"
      >
        {icon[type](foregroundIconSize!)}
      </Flex>
    );
  } else {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height={{ base: "2rem", "2xl": "2.5rem" }}
        width={{ base: "2rem", "2xl": "2.5rem" }}
        borderRadius="50%"
        color="theme.dark"
        bg="secondary.500"
      >
        {icon[type](backgroundIconSize!)}
      </Flex>
    );
  }
};

export default function ViewInfo() {
  const { state } = useContext(SimulationContext);

  const userType = state.userType;

  return (
    <Flex
      alignItems="center"
      gap="1rem"
      padding={{ base: ".75rem 1.5rem", "2xl": "1rem 2rem" }}
      borderRadius="0rem 0rem .5rem .5rem"
      bg="secondary.50"
    >
      <Box
        paddingBottom={{ base: ".625rem", "2xl": ".875rem" }}
        paddingRight={{ base: "2.125rem", "2xl": "2.375rem" }}
        position="relative"
      >
        <UserIcon
          type={
            userType === EUserType.CITIZEN_SERVANT
              ? EUserType.CITIZEN
              : EUserType.CITIZEN_SERVANT
          }
          variant="background"
        />
        <UserIcon type={userType ?? EUserType.CITIZEN} variant="foreground" />
      </Box>

      <Box>
        <Text fontWeight="700" size="xs">
          {userType === EUserType.CITIZEN ? "APPLICANT" : "Ulson"}
        </Text>
        <Text size="xs">CURRENT VIEW</Text>
      </Box>
    </Flex>
  );
}
