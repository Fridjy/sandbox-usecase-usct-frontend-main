import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Tooltip from "@ui/Tooltip/Tooltip";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextEditor from "../../../ui/TextEditor/TextEditor";
import { ContextualHelpContext } from "../ContextualHelpContext";
import { ContextualTitle } from "../ContextualHelpUtils";
import {
  ActiveBuildingBlockContext,
  EUserType,
  SimulationContext,
} from "../USCT";
import { BUILDING_BLOCK } from "../utils";
import ConversationTopic from "./ConversationTopic";

export default function StartNewConversation() {
  const { state, dispatch } = useContext(SimulationContext);
  const { setActiveBuildingBlocks } = useContext(ActiveBuildingBlockContext);

  const [topicSelected, setTopicSelected] = useState(false);

  useEffect(() => {
    dispatch({
      type: "SET_ALL",
      ...state,
      userType: EUserType.CITIZEN,
      description: {
        title: "CITIZEN STARTS A NEW CONVERSATION",
        subtitle: "PRIMARY TASK",
      },
      nextStep: "../case-management?state=done",
      previousStep: "../active-program",
      userAuthorized: true,
    });
  }, []);
  useEffect(() => {
    setActiveBuildingBlocks({
      [BUILDING_BLOCK.CONSENT]: false,
      [BUILDING_BLOCK.IDENTITY]: false,
      [BUILDING_BLOCK.INFORMATION_MEDIATOR]: true,
      [BUILDING_BLOCK.DIGITAL_REGISTRIES]: true,
      [BUILDING_BLOCK.MESSAGING]: true,
      [BUILDING_BLOCK.PAYMENT]: false,
      [BUILDING_BLOCK.REGISTRATION]: false,
      [BUILDING_BLOCK.SCHEDULING]: false,
      [BUILDING_BLOCK.WORKFLOW]: true,
    });
  }, []);

  const { setLetterContextualTitleMap } = useContext(ContextualHelpContext);

  useEffect(() => {
    setLetterContextualTitleMap({
      A: ContextualTitle.MESSAGING,
    });
  }, []);
  return (
    <Flex direction="column" w="100%" gap="1.25rem">
      <Heading>Start New Conversation</Heading>
      <Tooltip letter="A" display="flex" flexDirection="column" gap="1.25rem">
        <Text>
          <strong>Topic</strong>
        </Text>
        <Text>
          Please select the topic you would like to discuss. Lorem ipsum.
        </Text>
        <Flex gap="1.25rem" flexWrap="wrap">
          <ConversationTopic
            topic="Package Information"
            available
            onSelect={() => setTopicSelected(true)}
          />
          <ConversationTopic topic="Change Payment Method" />
          <ConversationTopic topic="Payment Not Received" />
          <ConversationTopic topic="Other" />
        </Flex>
        <Text>
          <strong>Message</strong>
        </Text>
        <Text>Please type additional message if it is needed.</Text>
        <TextEditor
          value={
            topicSelected
              ? "(Autofilled) Would you please provide me more detail about my package information?"
              : undefined
          }
        />
        <Flex justifyContent="flex-end">
          {topicSelected ? (
            <Button
              colorScheme="citizen"
              as={Link}
              to="../case-management?state=done"
              _disabled={{ bg: "secondary.400" }}
            >
              Submit
            </Button>
          ) : (
            <Button
              colorScheme="secondary"
              as={Button}
              isDisabled
              _disabled={{ bg: "secondary.400" }}
            >
              Submit
            </Button>
          )}
        </Flex>
      </Tooltip>
    </Flex>
  );
}
