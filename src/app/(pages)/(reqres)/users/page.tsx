"use client";

import React, { useEffect, useState } from "react";
import { User } from "./Interfaces/UsersInterfaces";
import { UsersService } from "./Services/UsersService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Image from "next/image";
import DataTable from "react-data-table-component";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Grid,
  GridItem,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await UsersService.fetchUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (
    values: { name: string; job: string },
    resetForm: () => void
  ) => {
    try {
      const newUser = await UsersService.addUser(values);
      console.log(newUser);
      toast.success("User added successfully!", { position: "top-right" });
      resetForm();
    } catch (error) {
      toast.error("Failed to add user", { position: "top-right" });
    }
  };

  const handleDeleteUser = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await UsersService.deleteUser(id);
          setUsers(users.filter((user) => user.id !== id));

          toast.success("User deleted successfully!", {
            position: "top-right",
          });
        } catch (error) {
          toast.error("Failed to delete user", { position: "top-right" });
        }
      }
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "Foto",
      cell: (row: User) => (
        <Image
          src={row.avatar}
          alt={`${row.first_name}'s Avatar`}
          width={40}
          height={40}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            margin: "0.5rem 1rem",
          }}
        />
      ),
    },
    {
      name: "Nama",
      selector: (row: User) => `${row.first_name} ${row.last_name}`,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
    },
    {
      name: "Aksi",
      cell: (row: User) => (
        <Box display="flex" gap={2}>
          <IconButton
            icon={<FiEdit />}
            aria-label="Edit User"
            colorScheme="blue"
            variant="ghost"
          />
          <IconButton
            icon={<FiTrash2 />}
            onClick={() => handleDeleteUser(row.id)}
            aria-label="Hapus User"
            colorScheme="red"
            variant="ghost"
          />
        </Box>
      ),
    },
  ];

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    job: Yup.string().required("Job is required"),
  });

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Kelola Pengguna
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
        <GridItem>
          <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
            <VStack spacing={4} align="stretch">
              <Heading size="md">Tambah Pengguna Baru</Heading>
              <Formik
                initialValues={{ name: "", job: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) =>
                  handleAddUser(values, resetForm)
                }
              >
                {({ isSubmitting }) => (
                  <Form>
                    <FormControl isRequired>
                      <FormLabel htmlFor="name">Nama</FormLabel>
                      <Field
                        as={Input}
                        id="name"
                        name="name"
                        placeholder="Nama"
                        focusBorderColor="teal.500"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                      <FormLabel htmlFor="job">Pekerjaan</FormLabel>
                      <Field
                        as={Input}
                        id="job"
                        name="job"
                        placeholder="Pekerjaan"
                        focusBorderColor="teal.500"
                      />
                      <ErrorMessage
                        name="job"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </FormControl>
                    <Button
                      colorScheme="teal"
                      type="submit"
                      width="full"
                      mt={4}
                      isLoading={isSubmitting}
                    >
                      Tambah Pengguna
                    </Button>
                  </Form>
                )}
              </Formik>
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
            <VStack spacing={4} align="stretch">
              <Heading size="md">Daftar Pengguna</Heading>
              <Input
                placeholder="Cari pengguna"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                focusBorderColor="teal.500"
              />
              <DataTable
                columns={columns}
                data={filteredUsers}
                pagination
                striped
                highlightOnHover
                dense
                noHeader
              />
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

export default UsersPage;
