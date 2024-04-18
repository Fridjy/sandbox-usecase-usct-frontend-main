import { ReactComponent as CheckIcon } from "@assets/icons/check.svg";
import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";

interface ITimelineEvent {
  name: string;
  date: string;
  info?: string;
  completed?: boolean;
}

interface ITimelineProps {
  icon: JSX.Element;
  title: string;
  events?: ITimelineEvent[];
  isCompleted?: boolean;
}

const lineStyles = {
  content: "''",
  position: "absolute",
  left: "50%",
  width: ".25rem",
  bg: "secondary.400",
  transform: "translateX(-50%)",
};

export default function Timeline({
  icon,
  title,
  events,
  isCompleted,
}: ITimelineProps) {
  const disabled = !events?.length;
  const allCompleted =
    (!disabled && events.every((e) => e.completed)) || isCompleted;

  const iconBackGround = () => {
    if (allCompleted) {
      return "secondary.1000";
    }
    if (disabled) {
      return "theme.light";
    }
    return "secondary.0";
  };

  return (
    <Grid templateColumns="2.25rem auto" templateRows="2.25rem" gap="1.5rem">
      <GridItem
        position="relative"
        zIndex="1"
        _before={
          !disabled
            ? {
                ...lineStyles,
                top: "50%",
                bottom: "-0.75rem",
                zIndex: -1,
              }
            : undefined
        }
      >
        <Flex
          borderRadius="50%"
          h="100%"
          borderWidth=".125rem"
          borderStyle="solid"
          borderColor={disabled ? "secondary.800" : "secondary.1000"}
          background={iconBackGround()}
          alignItems="center"
          justifyContent="center"
        >
          {allCompleted ? (
            <CheckIcon color="var(--chakra-colors-secondary-0)" />
          ) : (
            React.cloneElement(icon, {
              color: disabled
                ? "var(--chakra-colors-secondary-800)"
                : "var(--chakra-colors-secondary-1000)",
            })
          )}
        </Flex>
      </GridItem>
      <GridItem alignSelf="center">
        <Text size="lg" fontWeight="bold">
          {title}
        </Text>
      </GridItem>
      {events?.map((event, index) => (
        <Fragment key={event.name}>
          <GridItem
            position="relative"
            _before={{
              ...lineStyles,
              top: "-0.75rem",
              bottom: index < events.length - 1 ? "-0.75rem" : "50%",
            }}
            _after={{
              content: "''",
              boxSizing: "border-box",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              height: ".75rem",
              width: ".75rem",
              border: ".125rem solid var(--chakra-colors-secondary-1000)",
              bg: event.completed ? "secondary.1000" : "secondary.0",
            }}
          ></GridItem>
          <GridItem>
            <Flex
              justifyContent="space-between"
              flexDirection={{ sm: "column", xl: "row" }}
            >
              <Box>
                <Text>{event.name}</Text>
                <Text fontSize="12" fontWeight="600">
                  {event.info}
                </Text>
              </Box>
              <Text size="sm">{event.date}</Text>
            </Flex>
          </GridItem>
        </Fragment>
      ))}
    </Grid>
  );
}
