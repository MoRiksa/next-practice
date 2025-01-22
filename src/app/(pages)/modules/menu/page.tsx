"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { dummyMenu, MenuDataTypes } from "./types/MenuTypes";
import { TableControlContent } from "@/components/table/tableContent";

function MenuPages() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataMenu, setDataMenu] = useState<MenuDataTypes[]>([]);
  const [totalData, setTotalData] = useState<number>(0);

  useEffect(() => {
    setDataMenu(dummyMenu);
    setTotalData(dummyMenu.length);
  }, []);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const columns = useMemo<ColumnDef<MenuDataTypes>[]>(
    () => [
      {
        accessorKey: "id_menu",
        header: () => <Text fontWeight="600">ID Menu</Text>,
      },
      {
        accessorKey: "nama_menu",
        header: () => <Text fontWeight="600">Nama Menu</Text>,
      },
      {
        accessorKey: "harga",
        header: () => <Text fontWeight="600">Harga Menu</Text>,
        cell: ({ getValue }) => (
          <Text>
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(getValue<number>())}
          </Text>
        ),
      },
      {
        accessorKey: "id_kategori",
        header: () => <Text fontWeight="600">ID Kategori</Text>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: dummyMenu.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize
    ),
    columns,
    pageCount: Math.ceil(totalData / pageSize),
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  return (
    <Flex direction="column" p={6} gap={6}>
      {/* Tabel Container */}
      <Button mt={4} onClick={onOpen}>
        Tambah Data
      </Button>
      <Flex direction="column" bg="gray.50" p={4} rounded="md" shadow="sm">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>

            <Tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={columns.length} textAlign="center">
                    Tidak Ada Data
                  </Td>
                </Tr>
              )}
            </Tbody>

            <Tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tfoot>
            <TableControlContent table={table} />
          </Table>
        </TableContainer>
      </Flex>

      {/* Pagination Controls */}
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm">
            Total Data: <strong>{totalData}</strong>
          </Text>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl mb={3}>
                <FormLabel>ID Menu</FormLabel>
                <Input type="text" name="id_menu" />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Nama Menu</FormLabel>
                <Input type="text" name="nama_menu" />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Harga Menu</FormLabel>
                <Input type="number" name="harga" />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>ID Kategori</FormLabel>
                <Input type="number" name="id_kategori" />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Simpan
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Kembali
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default MenuPages;
