import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import { DIALBuildingBlockContext } from "@ui/DIAL/BuildingBlocks/DIALBuildingBlockContext";
import { useContext } from "react";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg";
import { colors } from "../../chakra-overrides/colors";
import { BUILDING_BLOCK } from "../../routes/usct/utils";

const Icon = ({
  active,
  highlighted,
  tail,
  ...boxProps
}: { active: boolean; highlighted: boolean; tail: boolean } & BoxProps) => {
  if (active) {
    return (
      <Box
        h=".75rem"
        w=".75rem"
        borderRadius="100%"
        backgroundColor={colors.secondary[0]}
        mr="1.5rem"
        {...boxProps}
      />
    );
  }
  if (highlighted) {
    return (
      <Box
        h=".75rem"
        w=".75rem"
        borderRadius="100%"
        backgroundColor={colors.green[500]}
        mr="1.5rem"
        {...boxProps}
      />
    );
  }
  return (
    <Box color="inherit" mr="1.5rem" {...boxProps}>
      <MinusIcon
        opacity={active ? "1" : "0.5"}
        visibility={tail ? "hidden" : "visible"}
      />
    </Box>
  );
};

export default function BuildingBlock({
  label,
  icon,
  active,
  highlighted,
  tail,
  id,
}: {
  label: string;
  icon: React.ReactElement;
  active: boolean;
  highlighted: boolean;
  tail: boolean;
  id: BUILDING_BLOCK;
}) {
  const { openedBuildingBlock, setOpenedBuildingBlock } = useContext(
    DIALBuildingBlockContext,
  );

  return (
    <Flex
      alignItems="center"
      w="calc(100% + 1.5rem)"
      h="2.5rem"
      position="relative"
      onClick={() => setOpenedBuildingBlock(id)}
      cursor="pointer"
      borderRadius=".5rem"
      style={{
        transition: "background-color 0.1s ease-in-out",
        margin: "0 -0.75rem",
        padding: "0 .75rem",
      }}
      background={
        openedBuildingBlock === id ? "rgba(59, 51, 115, 1)" : "transparent"
      }
      _hover={{
        backgroundColor: "rgba(59, 51, 115, 1)",
      }}
      data-group
    >
      <Icon
        active={active}
        highlighted={highlighted}
        tail={tail}
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          height: "3.125rem",
          width: ".1875rem",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: tail ? colors.green[500] : "transparent",
          display: "block",
          top: "0",
        }}
        _before={{
          position: "absolute",
          left: ".5rem",
          width: "0",
          top: "0rem",
          content: '""',
          borderWidth: "0 .375rem .75rem .375rem",
          borderStyle: "solid",
          borderColor: highlighted
            ? `transparent transparent ${colors.green[500]}  transparent`
            : "transparent",
          transform: "rotate(90deg)",
        }}
      />
      <Box
        transition="opacity 0.3s ease-in-out"
        opacity={active || highlighted ? "1" : "0.5"}
        mr="1rem"
      >
        {icon}
      </Box>
      <Text
        transition="opacity 0.3s ease-in-out"
        opacity={active || highlighted ? "1" : "0.5"}
        mr=".25rem"
      >
        {label}
      </Text>
      <Flex
        w="1.25rem"
        alignItems="center"
        justifyContent="center"
        h="1.25rem"
        backgroundColor={
          openedBuildingBlock === id ? "theme.success" : colors.darkblue[300]
        }
        borderRadius="100%"
        color={colors.secondary[1000]}
        marginLeft="auto"
        _groupHover={{
          background: "theme.success",
        }}
      >
        i
      </Flex>
    </Flex>
  );
}
