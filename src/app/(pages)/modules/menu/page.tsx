"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
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
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import { MenuDataTypes, dummyMenu, initialValueMenu } from "./types/MenuTypes";

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
  const [isEditing, setIsEditing] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MenuDataTypes | null>(null);

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
        header: "ID Menu",
      },
      {
        accessorKey: "nama_menu",
        header: "Nama Menu",
      },
      {
        accessorKey: "harga",
        header: "Harga Menu",
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
        header: "ID Kategori",
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => (
          <Flex gap={2}>
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              onClick={() => handleEdit(row.original)}
            />
            <IconButton
              aria-label="Delete"
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => handleDelete(row.original.id_menu)}
            />
          </Flex>
        ),
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
    initialValues: currentMenu || initialValueMenu,
    validationSchema: formSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isEditing) {
        setDataMenu((prev) =>
          prev.map((item) => (item.id_menu === values.id_menu ? values : item))
        );
      } else {
        setDataMenu((prev) => [...prev, values]);
        setTotalData((prev) => prev + 1);
      }
      // Reset the form after submission
      formikMenu.resetForm();
      onClose();
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: isEditing
          ? "Data menu berhasil diperbarui!"
          : "Menu berhasil ditambahkan!",
        showConfirmButton: true,
      });
    },
  });

  const handleEdit = (menu: MenuDataTypes) => {
    setCurrentMenu(menu);
    setIsEditing(true);
    onOpen();
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataMenu((prev) => prev.filter((item) => item.id_menu !== id));
        setTotalData((prev) => prev - 1);
        Swal.fire("Terhapus!", "Data menu telah dihapus.", "success");
      }
    });
  };

  return (
    <Flex direction="column" p={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Manajemen Menu
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => {
            setIsEditing(false);
            setCurrentMenu(null);
            onOpen();
          }}
        >
          Tambah Data
        </Button>
      </Flex>

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
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justify="space-between" align="center" mt={4}>
        <Button
          onClick={() =>
            table.setPageIndex(table.getState().pagination.pageIndex - 1)
          }
          isDisabled={table.getState().pagination.pageIndex === 0}
        >
          <ChevronLeftIcon />
          Sebelumnya
        </Button>
        <Text>
          Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
          {Math.ceil(totalData / pageSize)}
        </Text>
        <Button
          onClick={() =>
            table.setPageIndex(table.getState().pagination.pageIndex + 1)
          }
          isDisabled={
            table.getState().pagination.pageIndex + 1 >=
            Math.ceil(totalData / pageSize)
          }
        >
          Berikutnya
          <ChevronRightIcon />
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? "Edit Menu" : "Tambah Menu"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formikMenu.handleSubmit}>
              <FormControl
                mb={3}
                isInvalid={
                  formikMenu.touched.id_menu && !!formikMenu.errors.id_menu
                }
              >
                <FormLabel>ID Menu</FormLabel>
                <Input
                  name="id_menu"
                  value={formikMenu.values.id_menu}
                  onChange={formikMenu.handleChange}
                  isDisabled={isEditing}
                />
                <FormErrorMessage>{formikMenu.errors.id_menu}</FormErrorMessage>
              </FormControl>
              <FormControl
                mb={3}
                isInvalid={
                  formikMenu.touched.nama_menu && !!formikMenu.errors.nama_menu
                }
              >
                <FormLabel>Nama Menu</FormLabel>
                <Input
                  name="nama_menu"
                  value={formikMenu.values.nama_menu}
                  onChange={formikMenu.handleChange}
                />
                <FormErrorMessage>
                  {formikMenu.errors.nama_menu}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mb={3}
                isInvalid={
                  formikMenu.touched.harga && !!formikMenu.errors.harga
                }
              >
                <FormLabel>Harga</FormLabel>
                <Input
                  type="number"
                  name="harga"
                  value={formikMenu.values.harga}
                  onChange={formikMenu.handleChange}
                />
                <FormErrorMessage>{formikMenu.errors.harga}</FormErrorMessage>
              </FormControl>
              <FormControl
                mb={3}
                isInvalid={
                  formikMenu.touched.id_kategori &&
                  !!formikMenu.errors.id_kategori
                }
              >
                <FormLabel>ID Kategori</FormLabel>
                <Input
                  type="number"
                  name="id_kategori"
                  value={formikMenu.values.id_kategori}
                  onChange={formikMenu.handleChange}
                />
                <FormErrorMessage>
                  {formikMenu.errors.id_kategori}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Simpan
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default MenuPages;
