import React, { createContext, useState } from "react";
import {
  ContextualTitle,
  INormalizedContextualContent,
} from "./ContextualHelpUtils";

interface IContextualHelpContext {
  activeLetter: string | null;
  setActiveLetter: (letter: string | null) => void;
  letterContextualTitleMap: { [letter: string]: ContextualTitle } | null;
  setLetterContextualTitleMap: (
    map: { [letter: string]: ContextualTitle } | null,
  ) => void;
  activeContent: INormalizedContextualContent | null;
  setActiveContent: (content: INormalizedContextualContent | null) => void;
}

export const ContextualHelpContext = createContext<IContextualHelpContext>({
  activeLetter: null,
  setActiveLetter: () => {},
  letterContextualTitleMap: null,
  setLetterContextualTitleMap: () => {},
  activeContent: null,
  setActiveContent: () => {},
});

export const ContextualHelpContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [letterContextualTitleMap, setLetterContextualTitleMap] = useState<{
    [letter: string]: ContextualTitle;
  } | null>(null);
  const [activeContent, setActiveContent] =
    useState<INormalizedContextualContent | null>(null);
  return (
    <ContextualHelpContext.Provider
      value={{
        activeLetter,
        setActiveLetter,
        letterContextualTitleMap,
        setLetterContextualTitleMap,
        activeContent,
        setActiveContent,
      }}
    >
      {children}
    </ContextualHelpContext.Provider>
  );
};
