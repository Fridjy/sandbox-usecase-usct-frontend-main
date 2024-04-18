import { ReactComponent as ArrowIcon } from "@assets/icons/arrow.svg";
import { ReactComponent as UploadIcon } from "@assets/icons/upload.svg";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Slide,
  Text
} from "@chakra-ui/react";
import BuildingBlockActivity from "@ui/Activity/BuildingBlockActivity";
import HelpButton from "@ui/HelpOverlay/HelpButton";
import HelpHighlightWrapper from "@ui/HelpOverlay/HelpHighlightWrapper";
import React, { useState } from "react";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg";
import ContextualHelp from "./ContextualHelp";

export default function Sidebar({ view }: { view?: "desktop" | "mobile" }) {
  const [showCopy, setShowCopy] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopy(true);
    setTimeout(() => {
      setShowCopy(false);
    }, 2000);
  };

  return (
    <Flex
      boxSizing="border-box"
      pt="1.5rem"
      h="100%"
      direction="column"
      overflowY="scroll"
    >
      <HelpHighlightWrapper
        info={
          <>
            Overview of the <b>Care</b> (building blocks)
            and their status on the page
          </>
        }
        infoPosition="inside"
        mx="1.5rem"
      >
        <Heading mb="0.75rem" size="sm" textAlign="left" variant="caps">
          BUILDING BLOCK ACTIVITY
        </Heading>
        <Text size="sm" mb="1rem">
           reusable software components
          providing functionalities across sectors and use cases.
        </Text>
        <BuildingBlockActivity />
      </HelpHighlightWrapper>

      <Flex direction="column" position="relative" height="100%">
        <Flex justifyContent="space-around" mb="1rem" px="1.5rem">
          <Flex alignItems="center">
            <Box
              h=".5rem"
              w=".5rem"
              mr="0.75rem"
              borderRadius="100%"
              backgroundColor="secondary.0"
            />
            <Text size="sm">Active</Text>
          </Flex>
          <Flex alignItems="center">
            <Box mr="0.75rem">
              <MinusIcon />
            </Box>
            <Text size="sm">Inactive</Text>
          </Flex>
        </Flex>
        <Divider borderColor="darkblue.300" mb="1rem" />
        <HelpHighlightWrapper
          info={
            <>
              <b>
                <i>Learn more</i>
              </b>{" "}
              about interactions of the Building Blocks
              {view === "desktop" && (
                <Grid
                  position="absolute"
                  bottom="calc(100% + 2.5rem)"
                  right="calc(100% + 1.5rem)"
                >
                  <GridItem>
                    <Flex
                      borderRadius="50%"
                      border=".125rem solid white"
                      height="4rem"
                      w="4rem"
                      alignItems="center"
                      justifyContent="center"
                    >
                      A
                    </Flex>
                  </GridItem>
                  <GridItem colStart={2} rowStart={2}>
                    <ArrowIcon />
                  </GridItem>
                </Grid>
              )}
              <Text position="absolute" left="0" top="-1.5rem">
                A
              </Text>
            </>
          }
          infoPosition="inside"
          mx="1.5rem"
        >
          <ContextualHelp />
        </HelpHighlightWrapper>

        <Divider borderColor="darkblue.300" mt="auto" />
        <Flex px="1rem" py="1.5rem" justifyContent="space-between">
          {showCopy && (
            <Slide direction="bottom" in={true}>
              <Flex justifyContent="center">
                <Box
                  margin="0 auto"
                  color="white"
                  borderRadius=".5rem"
                  p="1.5rem"
                  bg="primary.500"
                  fontWeight="700"
                >
                  Link copied to clipboard
                </Box>
              </Flex>
            </Slide>
          )}
          <Button leftIcon={<UploadIcon />} colorScheme="admin" onClick={copy}>
            SHARE
          </Button>
          <HelpButton />
        </Flex>
      </Flex>
    </Flex>
  );
}
