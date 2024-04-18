import { Box, BoxProps } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HelpOverlayContext } from "./HelpOverlayContext";

const infoStyles = {
  top: {
    bottom: "100%",
    left: 0,
    transform: "translateY(-1.25rem)",
  },
  right: {
    top: "50%",
    left: "100%",
    transform: "translate(1.25rem, -50%)",
  },
  inside: {
    top: "2.5rem",
    left: "1.25rem",
    right: "1.25rem",
  },
};

interface IHelpHighlightWrapperProps {
  info: string | React.ReactNode;
  infoPosition: "top" | "right" | "inside";
  children: React.ReactNode;
}

export default function HelpHighlightWrapper({
  info,
  infoPosition,
  children,
  ...boxProps
}: IHelpHighlightWrapperProps & BoxProps) {
  const { showOverlay } = useContext(HelpOverlayContext);
  const [position, setPosition] = useState<DOMRect>();

  const highlightedContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition(highlightedContentRef?.current?.getBoundingClientRect());
  }, [showOverlay]);

  useEffect(() => {
    const resizeListener = () => {
      setPosition(highlightedContentRef?.current?.getBoundingClientRect());
    };

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  });
  return (
    <>
      <Box ref={highlightedContentRef} {...boxProps}>
        {children}
      </Box>
      {showOverlay &&
        position &&
        createPortal(
          <Box
            border=".125rem solid white"
            borderRadius=".625rem"
            position="fixed"
            zIndex={1000}
            fontSize={{ base: "1rem", lg: "1.5rem" }}
            top={`${position.top - 5}px`}
            height={`${position.height + 10}px`}
            left={`${position.left - 5}px`}
            width={`${position.width + 10}px`}
          >
            <Box
              color="white"
              position="absolute"
              style={infoStyles[infoPosition]}
            >
              {info}
            </Box>
          </Box>,
          document.body,
        )}
    </>
  );
}
