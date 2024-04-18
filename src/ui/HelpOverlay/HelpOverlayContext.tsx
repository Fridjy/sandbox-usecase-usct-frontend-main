import { Box } from "@chakra-ui/react";
import React, { createContext, useState } from "react";

interface IHelpOverlayContext {
  showOverlay: boolean;
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HelpOverlayContext = createContext<IHelpOverlayContext>({
  showOverlay: true,
  setShowOverlay: () => {},
});

export const HelpOverlay = ({ children }: { children: React.ReactNode }) => {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <HelpOverlayContext.Provider
      value={{
        showOverlay,
        setShowOverlay,
      }}
    >
      <Box filter={showOverlay ? "blur(2px)" : undefined}>{children}</Box>
      {showOverlay && (
        <Box
          onClick={() => setShowOverlay(false)}
          position="fixed"
          inset="0"
          background="rgba(0, 0, 0, 0.7)"
          zIndex={100}
        ></Box>
      )}
    </HelpOverlayContext.Provider>
  );
};
