import { Box, Flex, Text } from "@chakra-ui/react";
import { ReactElement, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";

export default function ScenarioView({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [location]);
  return (
    <Flex
      w="100%"
      height="100%"
      direction="column"
      p={{
        base: ".25rem 1rem 0 1rem",
        lg: ".25rem 4rem 0 4rem",
        "2xl": "1rem 4rem 0 4rem",
      }}
      flexGrow="1"
      alignItems="center"
      minHeight="0"
    >
      <Flex w="100%" h="100%" direction="column" maxW="64rem">
        <Flex
          alignItems="center"
          gap="1rem"
          borderTopRadius=".5rem"
          w="100%"
          backgroundColor="#f2f2f2"
          boxShadow="0rem 0rem 1rem rgba(0, 0, 0, 0.25);"
          p={{ base: ".5rem 1rem", "2xl": ".75rem 1rem" }}
          zIndex="1"
          boxSizing="border-box"
        >
          <Flex gap=".375rem">
            <Box
              borderRadius="100%"
              height="1rem"
              width="1rem"
              backgroundColor={colors.secondary[900]}
            ></Box>
            <Box
              borderRadius="100%"
              height="1rem"
              width="1rem"
              backgroundColor={colors.secondary[500]}
            ></Box>
            <Box
              borderRadius="100%"
              height="1rem"
              width="1rem"
              backgroundColor={colors.secondary[300]}
            ></Box>
          </Flex>
          <Flex
            h={{ base: "1.5rem", "2xl": "2rem" }}
            borderRadius=".25rem"
            w="100%"
            backgroundColor={colors.secondary[0]}
            alignItems="center"
            textAlign="center"
            justifyContent="center"
          >
            <Text size={{ xs: "xxs", sm: "xs", md: "sm" }} color="#9B9B9B;">
              openisland-care
            </Text>
          </Flex>
        </Flex>
        <Box
          boxShadow="0rem 0rem 1rem rgba(0, 0, 0, 0.25);"
          h="100%"
          borderBottomRadius="1rem"
          overflow="auto"
          backgroundColor="#fff"
          position="relative"
          ref={ref}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
