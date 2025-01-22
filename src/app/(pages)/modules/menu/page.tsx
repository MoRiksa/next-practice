"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Form, useFormik } from "formik";
import * as Yup from "yup";
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
  TableCaption,
  Select,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { dummyMenu, initialValueMenu, MenuDataTypes } from "./types/MenuTypes";

// Yup schema untuk validasi form
const formSchema = Yup.object().shape({
  id_menu: Yup.string().required("Kode menu harus diisi"),
  nama_menu: Yup.string().required("Nama menu harus diisi"),
  harga: Yup.number().required("Harga harus diisi"),
  id_kategori: Yup.number().required("Kategori harus diisi"),
});

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
    data: dataMenu.slice(
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

  const formikMenu = useFormik({
    initialValues: initialValueMenu,
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      onClose();
    },
  });

  return (
    <Flex direction="column" p={6} gap={6}>
      {/* Heading and Button */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Menu Management
        </Text>
        <Button colorScheme="blue" onClick={onOpen}>
          Tambah Data
        </Button>
      </Flex>

      {/* Tabel Container */}
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
                    width={"auto"}
                    size={"sm"}
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
                    size={"sm"}
                    colorScheme={"orange"}
                  >
                    {">"}
                  </Button>
                  <Button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    isDisabled={!table.getCanNextPage()}
                    size={"sm"}
                    colorScheme="orange"
                  >
                    {">>"}
                  </Button>
                </Flex>
              </Flex>
            </TableCaption>
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

      {/* Modal untuk tambah data */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form onSubmit={formikMenu.handleSubmit}>
              <FormControl mb={3} isInvalid={!!formikMenu.errors.id_menu}>
                <FormLabel>ID Menu</FormLabel>
                <Input
                  type="text"
                  name="id_menu"
                  value={formikMenu.values.id_menu}
                  onChange={formikMenu.handleChange}
                  onBlur={formikMenu.handleBlur}
                />
                {formikMenu.errors.id_menu && formikMenu.touched.id_menu && (
                  <Text color="red.500">{formikMenu.errors.id_menu}</Text>
                )}
              </FormControl>

              <FormControl mb={3} isInvalid={!!formikMenu.errors.nama_menu}>
                <FormLabel>Nama Menu</FormLabel>
                <Input
                  type="text"
                  name="nama_menu"
                  value={formikMenu.values.nama_menu}
                  onChange={formikMenu.handleChange}
                  onBlur={formikMenu.handleBlur}
                />
                {formikMenu.errors.nama_menu &&
                  formikMenu.touched.nama_menu && (
                    <Text color="red.500">{formikMenu.errors.nama_menu}</Text>
                  )}
              </FormControl>

              <FormControl mb={3} isInvalid={!!formikMenu.errors.harga}>
                <FormLabel>Harga Menu</FormLabel>
                <Input
                  type="number"
                  name="harga"
                  value={formikMenu.values.harga}
                  onChange={formikMenu.handleChange}
                  onBlur={formikMenu.handleBlur}
                />
                {formikMenu.errors.harga && formikMenu.touched.harga && (
                  <Text color="red.500">{formikMenu.errors.harga}</Text>
                )}
              </FormControl>

              <FormControl mb={3} isInvalid={!!formikMenu.errors.id_kategori}>
                <FormLabel>ID Kategori</FormLabel>
                <Input
                  type="number"
                  name="id_kategori"
                  value={formikMenu.values.id_kategori}
                  onChange={formikMenu.handleChange}
                  onBlur={formikMenu.handleBlur}
                />
                {formikMenu.errors.id_kategori &&
                  formikMenu.touched.id_kategori && (
                    <Text color="red.500">{formikMenu.errors.id_kategori}</Text>
                  )}
              </FormControl>

              <Button type="submit" colorScheme="blue">
                Simpan
              </Button>
            </Form>
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
