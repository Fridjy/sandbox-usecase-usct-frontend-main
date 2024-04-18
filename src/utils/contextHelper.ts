import { createContext, MutableRefObject } from "react";

export const contextRefs = createContext<{
  refs: Record<string, MutableRefObject<unknown>>;
}>({
  refs: {},
});
