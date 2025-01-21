"use client";

import Link from "next/link";
import { Box, Card, CardBody, CardHeader } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100vh"
      backgroundColor="gray.50"
      padding={8}
    >
      <Card
        width="100%"
        maxWidth="md"
        backgroundColor="white"
        boxShadow="lg"
        borderRadius="md"
      >
        <CardHeader
          backgroundColor="blue.500"
          color="white"
          fontSize="lg"
          fontWeight="bold"
          padding={4}
        >
          <Link href="/home">Home</Link>
        </CardHeader>
        <CardBody
          padding={8}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <p>Page</p>
        </CardBody>
      </Card>
    </Box>
  );
}
