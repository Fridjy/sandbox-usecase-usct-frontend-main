import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import DIAL from "@ui/DIAL/DIAL";
import HelpHighlightWrapper from "@ui/HelpOverlay/HelpHighlightWrapper";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { colors } from "../../chakra-overrides/colors";
import { SimulationContext } from "../../routes/usct/USCT";
import ScenarioHeader from "./ScenarioHeader";
import ScenarioView from "./ScenarioView";
import Sidebar from "./Sidebar";
import ViewInfo from "./ViewInfo";

export default function ScenarioLayout({
  width,
  children,
}: {
  width: number;
  children: React.ReactElement[] | React.ReactElement;
}) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(
    window.innerWidth < 992 ? true : false,
  );
  const { state } = useContext(SimulationContext);

  const view = width < 992 ? "mobile" : "desktop";

  const disabledRoutes = {
    previous: ["/case-management"],
    next: ["/personal?done=true", "/feedback"],
  };

  const isNavigationDisabled = (direction: "previous" | "next") => {
    return disabledRoutes[direction].some(
      (r: string) => r === location.pathname + location.search,
    );
  };

  return (
    <Flex h="100vh" position="relative" w="100vw" overflowX="hidden">
      <Flex
        w={{ base: "100%", lg: "calc(100% - 20rem)" }}
        direction="column"
        position="relative"
        alignItems="center"
      >
        <ScenarioHeader>
          <Text size={{ base: "sm", md: "md" }}>
            <strong>Use Case Simulation</strong>{" "}
            {view === "desktop" && "Unconditional Social Cash Transfer"}
          </Text>
        </ScenarioHeader>
        <ScenarioView>{children}</ScenarioView>
        <Box
          w="100%"
          h="40vh"
          position="absolute"
          bottom="0"
          zIndex="-1"
          backgroundColor={colors.primary[900]}
          clipPath={{ md: "polygon(0 34%, 100% 0, 100% 100%, 0% 100%)" }}
          transform={{ md: "skew(25)" }}
        />
        <Grid
          templateColumns={{ md: "auto auto" }}
          justifyContent={{ base: "stretch", md: "space-between" }}
          alignItems="center"
          gap="1rem"
          maxW="64rem"
          w="100%"
          margin="0 auto"
          padding={{ base: "0 2rem", md: "0 4rem" }}
          paddingRight={{ md: "5rem" }}
          paddingBottom={{ base: "1rem", md: 0 }}
        >
          <GridItem>
            <Flex flexDirection="column" paddingTop={{ xs: ".5rem", md: "0" }}>
              <Flex alignItems="center" gap="1rem">
                {view === "desktop" ? (
                  <HelpHighlightWrapper
                    info={
                      <Box w="26.25rem">
                        The <b>navigation</b> allows you to move back and forth
                        through the pages of the simulation
                      </Box>
                    }
                    infoPosition="top"
                  >
                    <Flex gap="0.5rem">
                      {isNavigationDisabled("previous") ? (
                        <IconButton
                          as={Button}
                          aria-label="Previous step"
                          icon={<ArrowBackIcon />}
                          isDisabled
                        />
                      ) : (
                        <IconButton
                          as={Link}
                          to={state.previousStep}
                          aria-label="Previous step"
                          icon={<ArrowBackIcon />}
                        />
                      )}
                      <IconButton
                        as={Link}
                        to="./case-management"
                        aria-label="Start over"
                        icon={<RefreshIcon />}
                      />
                      {isNavigationDisabled("next") ? (
                        <IconButton
                          as={Button}
                          aria-label="Next step"
                          icon={<ArrowForwardIcon />}
                          isDisabled
                        />
                      ) : (
                        <IconButton
                          as={Link}
                          to={state.nextStep}
                          aria-label="Next step"
                          icon={<ArrowForwardIcon />}
                        />
                      )}
                    </Flex>
                  </HelpHighlightWrapper>
                ) : (
                  <Flex gap="0.5rem">
                    {isNavigationDisabled("previous") ? (
                      <IconButton
                        as={Button}
                        aria-label="Previous step"
                        icon={<ArrowBackIcon />}
                        isDisabled
                      />
                    ) : (
                      <IconButton
                        as={Link}
                        to={state.previousStep}
                        aria-label="Previous step"
                        icon={<ArrowBackIcon />}
                      />
                    )}
                    <IconButton
                      as={Link}
                      to="./case-management"
                      aria-label="Start over"
                      icon={<RefreshIcon />}
                    />
                    {isNavigationDisabled("next") ? (
                      <IconButton
                        as={Button}
                        aria-label="Next step"
                        icon={<ArrowForwardIcon />}
                        isDisabled
                      />
                    ) : (
                      <IconButton
                        as={Link}
                        to={state.nextStep}
                        aria-label="Next step"
                        icon={<ArrowForwardIcon />}
                      />
                    )}
                  </Flex>
                )}
                <Box>
                  <Text
                    color={colors.theme.light}
                    fontWeight={700}
                    fontSize={{ xs: ".625rem", md: ".75rem" }}
                  >
                    {state.description.title}
                  </Text>
                  <Text
                    color={colors.theme.light}
                    fontSize={{ xs: ".625rem", md: ".75rem" }}
                  >
                    {state.description.subtitle}
                  </Text>
                </Box>
              </Flex>
              <Flex
                justifyContent="center"
                display={{ base: "flex", md: "none" }}
                gap="1rem"
                color={colors.secondary[500]}
                marginTop=".5rem"
              >
                <Text size={{ xs: "xxs", sm: "xs", md: "sm" }}>
                  Care - this is a frontend only simulation
                </Text>
                <Link to="https://www.CARE.global/privacy/" target="_blank">
                  <Text size={{ xs: "xxs", sm: "xs", md: "sm" }}>
                    Privacy & Legal
                  </Text>
                </Link>
                <Link to="mailto:info@CARE.global">
                  <Text size={{ xs: "xxs", sm: "xs", md: "sm" }}>
                    Get in touch
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </GridItem>
          {view === "desktop" && (
            <GridItem rowStart={{ base: 1, md: "auto" }}>
              <HelpHighlightWrapper
                info={
                  <Box w="21.25rem">
                    This shows your current <b>perspective</b> on the use case:
                    Ulson or applicant
                  </Box>
                }
                infoPosition="top"
              >
                {view === "desktop" && <ViewInfo />}
              </HelpHighlightWrapper>
            </GridItem>
          )}
        </Grid>
        <Flex
          mt={{ base: 0, "2xl": "1.375rem" }}
          justifyContent="center"
          display={{ base: "none", md: "flex" }}
          gap="1rem"
          p=".5rem"
          color={colors.secondary[500]}
        >
          <Text size="sm">
            Care - Case Similation
          </Text>
          <Link to="https://www.CARE.global/privacy/" target="_blank">
            <Text size="sm">Privacy & Legal</Text>
          </Link>
          <Link to="mailto:info@CARE.global">
            <Text size="sm">Get in touch</Text>
          </Link>
        </Flex>
        {view === "desktop" && <DIAL />}
      </Flex>
      <Flex
        h="100%"
        color={colors.secondary[0]}
        w="20rem"
        backgroundColor="primary.900"
        position={{ base: "absolute", lg: "relative" }}
        right={{ base: isExpanded ? "0" : "-20rem", lg: "0" }}
        top={0}
        flexShrink="0"
        transition="width 0.3s ease-in-out"
        direction="column"
        zIndex={1}
      >
        <IconButton
          display={{ base: "block", lg: "none" }}
          position="absolute"
          left="-2rem"
          top="0"
          w="2rem"
          icon={isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          borderRadius="0"
          colorScheme="admin"
          aria-label="Expand sidepanel"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          transition="right 0.3s ease-in-out"
        ></IconButton>
        <Sidebar view={view} />
      </Flex>
    </Flex>
  );
}
