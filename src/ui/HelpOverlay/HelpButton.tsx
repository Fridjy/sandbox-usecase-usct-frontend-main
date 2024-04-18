import { ReactComponent as LightbulbIcon } from "@assets/icons/lightbulb.svg";
import { Box, Button } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { HelpOverlayContext } from "./HelpOverlayContext";

export default function HelpButton() {
  const { showOverlay, setShowOverlay } = useContext(HelpOverlayContext);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const position = buttonRef.current?.getBoundingClientRect();

  return (
    <>
      <Button
        ref={buttonRef}
        leftIcon={
          <Box _groupHover={{ color: "theme.success" }}>
            <LightbulbIcon />
          </Box>
        }
        data-group
        colorScheme="admin"
        onClick={() => setShowOverlay(true)}
      >
        SHOW HELP
      </Button>
      {showOverlay &&
        position &&
        createPortal(
          <Button
            leftIcon={<LightbulbIcon />}
            position="fixed"
            zIndex={1000}
            top={`${position.top}px`}
            left={`${position.left}px`}
            onClick={() => setShowOverlay(false)}
            colorScheme="primary"
            px=".5rem"
          >
            CLOSE HELP
          </Button>,
          document.body,
        )}
    </>
  );
}
