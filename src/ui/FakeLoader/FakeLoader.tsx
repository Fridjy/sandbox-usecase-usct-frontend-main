import {
  Box,
  Center,
  CircularProgress,
  Fade,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function FakeLoader({
  children,
  label,
  loading,
  onLoadEnd,
}: {
  children: React.ReactNode;
  label: string;
  loading: boolean;
  onLoadEnd: () => void;
}) {
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        onLoadEnd();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  return (
    <>
      <Fade in={loading} unmountOnExit>
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          backgroundColor="#fff"
        >
          <Center h="100%">
            <VStack>
              <CircularProgress isIndeterminate size={50} />
              <Text variant="caps" size="lg" textAlign="center">
                {label}
              </Text>
            </VStack>
          </Center>
        </Box>
      </Fade>
      {!loading && children}
    </>
  );
}
