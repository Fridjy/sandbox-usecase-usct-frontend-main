import { Avatar, Flex, Text } from "@chakra-ui/react";
import { colors } from "../../chakra-overrides/colors";

interface IChatMessageProps {
  user: string;
  timestamp: number;
  content: string;
}

export default function ChatMessage({
  message,
}: {
  message: IChatMessageProps;
}) {
  return (
    <Flex
      gap="1rem"
      flexDirection={message.user === "Applicant" ? "row-reverse" : "row"}
    >
      <Avatar
        h={{ base: "1.5rem", md: "3rem" }}
        w={{ base: "1.5rem", md: "3rem" }}
      />
      <Flex
        border=".125rem solid black"
        borderRadius=".5rem"
        minH="7rem"
        w={{ base: "75%", md: "40%" }}
        direction="column"
        backgroundColor={
          message.user === "Ulson"
            ? colors.secondary[100]
            : colors.secondary[0]
        }
      >
        <Flex p="1.5rem" h="100%">
          {message.content}
        </Flex>
        <Flex p=".5rem .875rem" justifyContent="flex-end">
          {message.user}
        </Flex>
      </Flex>
      <Flex alignSelf="center" direction="column">
        <Text size="sm" variant="caps" textAlign="left">
          {Intl.DateTimeFormat("default").format(message.timestamp)}
        </Text>
        <Text size="sm" variant="caps" textAlign="left">
          {Intl.DateTimeFormat("default", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(message.timestamp)}
        </Text>
      </Flex>
    </Flex>
  );
}
