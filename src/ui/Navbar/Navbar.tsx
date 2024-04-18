import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../../chakra-overrides/colors";
import { Nav, NavigationLink } from "./Navbar.styles";
import { LINKS } from "./routes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const onSignOut = async () => {
    // await authentication.signOut();
  };
  return (
    <Nav isOpen={isOpen}>
      <Flex padding="1.5rem" zIndex="1" w="100%" position="relative">
        <Fade in={isOpen}>
          <Flex gap=".5rem" w="100%" alignItems="center">
            <Image h="2rem" w="2rem" src="/CARE-logo.png" />
            <Text color={colors.secondary[0]} whiteSpace="nowrap">
              Open GIPI
            </Text>
          </Flex>
        </Fade>
        <IconButton
          position="absolute"
          right={isOpen ? "1.5rem" : "0"}
          top="50%"
          transform={`translateY(-50%) ${
            isOpen ? "rotateY(0)" : "rotateY(180deg)"
          }`}
          aria-label="Toggle Menu"
          icon={<ArrowLeftIcon />}
          background="transparent"
          color={colors.secondary[0]}
          w={isOpen ? "2.5rem" : "100%"}
          h="2.5rem"
          transitionProperty="width, border-radius, transform, right"
          transitionDuration="0.3s"
          transitionTimingFunction="ease-in-out"
          onClick={() => setIsOpen(!isOpen)}
          borderRadius={isOpen ? "0.375rem" : "0"}
        ></IconButton>
      </Flex>
      <Flex
        zIndex="1"
        gap="1rem"
        as="nav"
        direction="column"
        alignItems="flex-start"
        w="100%"
      >
        {LINKS.map((category) => {
          return (
            <Flex
              key={category.name}
              gap=".5rem"
              alignItems="flex-start"
              direction="column"
              w="100%"
            >
              <Fade in={isOpen}>
                <Text
                  height="2.5rem"
                  padding="0 1.5rem"
                  whiteSpace="nowrap"
                  color={colors.secondary[0]}
                >
                  <strong>{category.name}</strong>
                </Text>
              </Fade>
              {category.children.map((child) => {
                return (
                  <Flex key={child.path} alignItems="center" w="100%">
                    <NavigationLink
                      key={child.path}
                      as={NavLink}
                      to={child.path}
                    >
                      <Flex
                        gap="1rem"
                        alignItems="center"
                        height="2.5rem"
                        transition="padding 0.3s ease-in-out"
                      >
                        <Box w="1.5rem" h="1.5rem">
                          {child.icon}
                        </Box>
                        <Text
                          w={isOpen ? "100%" : "0"}
                          transition="width 0.3s ease-in-out"
                          overflow="hidden"
                          color="blacks.0"
                        >
                          {child.name}
                        </Text>
                      </Flex>
                    </NavigationLink>
                  </Flex>
                );
              })}
            </Flex>
          );
        })}
      </Flex>
      <Button color="secondary.1000" marginTop="auto" onClick={onSignOut}>
        LOG OUT
      </Button>
    </Nav>
  );
}
