import React, { createContext, useState } from "react";
import { BUILDING_BLOCK } from "../../../routes/usct/utils";

interface IDIALBuildingBlockContext {
  openedBuildingBlock: BUILDING_BLOCK | null;
  setOpenedBuildingBlock: (block: BUILDING_BLOCK | null) => void;
}

export const DIALBuildingBlockContext =
  createContext<IDIALBuildingBlockContext>({
    openedBuildingBlock: null,
    setOpenedBuildingBlock: () => {},
  });

export const DIALBuildingBlockContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openedBuildingBlock, setOpenedBuildingBlock] =
    useState<BUILDING_BLOCK | null>(null);
  return (
    <DIALBuildingBlockContext.Provider
      value={{
        openedBuildingBlock,
        setOpenedBuildingBlock,
      }}
    >
      {children}
    </DIALBuildingBlockContext.Provider>
  );
};
