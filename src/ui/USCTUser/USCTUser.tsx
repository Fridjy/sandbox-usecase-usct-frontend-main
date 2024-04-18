import { ReactComponent as ApplicantIcon } from "@assets/icons/people_person.svg";
import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import { colors } from "../../chakra-overrides/colors";
import { EUserType } from "../../routes/usct/USCT";

export function USCTUser({ userType }: { userType: EUserType | null }) {
  if (userType === EUserType.CITIZEN) {
    return (
      <Flex
        backgroundColor={colors.secondary[600]}
        borderRadius="2.25rem"
        justifyContent="center"
        alignItems="center"
        padding={{ base: ".75rem", lg: ".625rem 3rem" }}
        marginRight="2.25rem"
      >
        <Flex gap=".5rem" alignItems="center">
          <ApplicantIcon
            height="2rem"
            width="2rem"
            style={{
              borderRadius: "50%",
              backgroundColor: colors.secondary[0],
              padding: ".125rem",
              fill: colors.secondary[0],
            }}
          />
          {/* <Avatar h="2rem" w="2rem" /> */}
          <Box display={{ base: "none", lg: "block" }}>
            <Text
              size="sm"
              lineHeight="1.125rem"
              color={colors.secondary[0]}
              fontWeight={600}
            >
              Applicant
            </Text>
            <Text
              fontSize=".625rem"
              lineHeight=".875rem"
              color={colors.secondary[0]}
            >
              ID: 1234567810
            </Text>
          </Box>
        </Flex>
      </Flex>
    );
  }
  if (userType === EUserType.CITIZEN_SERVANT) {
    return (
      <Flex
        paddingRight={{ base: ".5rem", lg: "4rem" }}
        alignItems="center"
        gap="1.5rem"
      >
        <Icon
          aria-label="notifications"
          backgroundColor="transparent"
          h="1.5rem"
          w="1.5rem"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.387 11.9999C19.198 15.7989 21 16.9999 21 16.9999H3C3 16.9999 6 14.9999 6 7.99992C6.00001 7.12737 6.19033 6.26532 6.5577 5.47387C6.92506 4.68242 7.46062 3.98062 8.12705 3.4174C8.79347 2.85417 9.57472 2.44308 10.4163 2.21277C11.2579 1.98247 12.1397 1.9385 13 2.08392"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 2V8"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 5H15"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="18" cy="5" r="4" fill="#FF0000" />
          </svg>
        </Icon>
        <Flex gap=".5rem" alignItems="center" height="100%">
          <Avatar h="2rem" w="2rem" />
          <Box>
            <Text
              size={{ xs: "xxs", sm: "xs", md: "sm" }}
              fontWeight="600"
              lineHeight="1.25rem"
            >
              Ulson
            </Text>
            <Text
              fontSize={{ xs: ".5rem", sm: ".625rem" }}
              fontWeight="400"
              lineHeight="1.25rem"
            >
              Work ID: 1234567810
            </Text>
          </Box>
        </Flex>
      </Flex>
    );
  }
  return null;
}
