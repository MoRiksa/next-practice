import { TableCaption, Flex, Button, Select, Text } from "@chakra-ui/react";

export function TableContent({ table }: { table: any }) {
  return (
    <div>
      <h1>Table Content</h1>
    </div>
  );
}
export function TableControlContent({ table }: { table: any }) {
  return (
    <TableCaption>
      <Flex justifyContent="space-between" alignItems="center">
        {/* Pagination controls */}
        <Flex gap={2} alignItems="center">
          <Button
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
            size="sm"
            colorScheme="orange"
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
            size="sm"
            colorScheme="orange"
          >
            {"<"}
          </Button>
        </Flex>

        <Flex alignItems="center">
          <Text mr={2}>
            Halaman{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </Text>
          <Text>| Ke Halaman:</Text>
          <Select
            ml={2}
            value={table.getState().pagination.pageIndex}
            onChange={(e) => table.setPageIndex(Number(e.target.value))}
            width="auto"
            size="sm"
          >
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <option key={i} value={i}>
                {i + 1}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex gap={2} alignItems="center">
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
            size="sm"
            colorScheme="orange"
          >
            {">"}
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
            size="sm"
            colorScheme="orange"
          >
            {">>"}
          </Button>
        </Flex>
      </Flex>
    </TableCaption>
  );
}
