import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

interface IAccordionElementProps {
  data: {
    results: {
      self_url: string;
      name: string;
      type: string;
    }[];
  };
  title: string;
  setActive: (state: { type: string; name: string; self_url: string }) => void;
}

export default function AccordionElement({
  data,
  title,
  setActive,
}: IAccordionElementProps) {
  return (
    <>
      <AccordionItem>
        <Heading>
          <AccordionButton display="flex" justifyContent="space-between">
            <Text size="sm" textAlign="left">
              {title}
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel>
          <UnorderedList>
            {data?.results?.map(
              (result: { type: string; name: string; self_url: string }) => {
                return (
                  <ListItem
                    cursor="pointer"
                    onClick={() => setActive(result)}
                    _hover={{
                      textDecoration: "underline",
                    }}
                    key={result.self_url}
                  >
                    <Flex justifyContent="space-between">
                      <Text size="sm">{result.name}</Text>
                      <ArrowForwardIcon />
                    </Flex>
                  </ListItem>
                );
              },
            )}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
