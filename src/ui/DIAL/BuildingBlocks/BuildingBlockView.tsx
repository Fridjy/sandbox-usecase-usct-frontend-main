import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Link, Slide, Text } from "@chakra-ui/react";
import { buildingBlocksList } from "@ui/Activity/BuildingBlockActivity";
import React, { useContext, useMemo } from "react";
import { bbDescriptionMock } from "./buildingBlocksMock";
import { DIALBuildingBlockContext } from "./DIALBuildingBlockContext";

export default function BuildingBlockView() {
  const { openedBuildingBlock, setOpenedBuildingBlock } = useContext(
    DIALBuildingBlockContext,
  );

  const openedBlockData = useMemo(() => {
    return buildingBlocksList.find((bb) => bb.id === openedBuildingBlock);
  }, [openedBuildingBlock]);

  return (
    <>
      {!openedBuildingBlock && (
        <>
          <Box px="1rem" py=".5rem" mt="1.5rem">
            <Text size="sm" fontWeight={600}>
              BUILDING BLOCKS
            </Text>
          </Box>
          <Flex direction="column" gap=".25rem" px="1rem">
            {buildingBlocksList.map((bb) => {
              return (
                <Button
                  p=".125rem"
                  cursor="pointer"
                  variant="unstyled"
                  textAlign="left"
                  onClick={() => setOpenedBuildingBlock(bb.id)}
                  _hover={{
                    textDecoration: "underline",
                  }}
                  key={bb.id}
                >
                  <Flex alignItems="center" gap=".75rem">
                    {React.cloneElement(bb.icon, {
                      height: "1.5rem",
                      width: "1.5rem",
                    })}
                    <Text
                      size="xs"
                      fontWeight={600}
                      flexGrow={1}
                      textTransform="uppercase"
                    >
                      {bb.label}
                    </Text>
                    <ArrowForwardIcon />
                  </Flex>
                </Button>
              );
            })}
          </Flex>
        </>
      )}
      {openedBlockData && (
        <Box position="relative">
          <Slide in={true} direction="right" style={{ position: "relative" }}>
            <Flex
              p=".25rem"
              mt="1.5rem"
              mb="1.25rem"
              borderBottom=".0625rem solid white"
              alignItems="center"
              gap=".75rem"
            >
              {React.cloneElement(openedBlockData.icon, {
                height: "1.5rem",
                width: "1.5rem",
              })}
              <Text size="sm" fontWeight={600} textTransform="uppercase">
                {openedBlockData.label}
              </Text>
            </Flex>
            <Text mb="1.25rem" size="sm" fontWeight={600}>
              Description:
            </Text>
            <Text mb="1.25rem" size="sm">
              {bbDescriptionMock[openedBlockData.id]}
            </Text>
          </Slide>
        </Box>
      )}
      <Box p={!openedBlockData ? "1rem" : 0}>
        <Text as="i" size="sm" fontWeight="300">
          For more information about Building Blocks, please visit{" "}
          <Link href="https://CARE.gitbook.io/specification/">
            CARE Specifications
          </Link>
          .
        </Text>
      </Box>
    </>
  );
}