import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { colors } from "../../../chakra-overrides/colors";

export default function PersonalInformationTable({
  columns,
  data,
  title,
}: {
  columns: string[];
  data: Record<string, string | JSX.Element | null>[];
  title: string | React.ReactNode;
}) {
  return (
    <Box>
      <Heading variant="h3" fontSize="18px">
        {title}
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead
            borderBottomWidth="medium"
            borderBottomColor={colors.secondary[600]}
          >
            <Tr>
              {columns.map((column) => (
                <Td key={column}>
                  <strong>{column}</strong>
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((data, index) => {
              return (
                <Tr key={index}>
                  {Object.keys(data).map((key) => {
                    return <Td key={key}>{data[key]}</Td>;
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
