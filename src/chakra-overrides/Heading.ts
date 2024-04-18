import { defineStyleConfig } from "@chakra-ui/react";

export const Heading = defineStyleConfig({
  baseStyle: {
    fontFamily: "Inter",
    color: "inherit",
    fontWeight: 700,
  },
  sizes: {
    lg: {
      fontSize: "2.25rem",
      lineHeight: "3rem",
    },
    md: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    sm: {
      fontSize: "1.125rem",
      lineHeight: "1.5rem",
    },
  },
});
