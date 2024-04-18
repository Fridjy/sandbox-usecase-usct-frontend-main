import { Button, ButtonGroup } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";

export default function Pagination() {
  return (
    <ButtonGroup colorScheme="secondary">
      <Button disabled variant="solid">
        1
      </Button>
      <Button disabled variant="outline">
        2
      </Button>
      <Button disabled variant="outline">
        3
      </Button>
      <Button disabled variant="outline">
        4
      </Button>
      <Button disabled variant="outline" rightIcon={<ArrowForwardIcon />}>
        Next
      </Button>
    </ButtonGroup>
  );
}
