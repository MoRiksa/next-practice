"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api, { getToken, setToken } from "@/app/(auth)/utils/api"; // Mengimpor instance axios dan setToken dari api.ts
import Swal from "sweetalert2"; // Mengimpor library sweetalert2

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      // Menggunakan instance api dari file api.ts untuk melakukan request POST
      const response = await api.post("/login", { email, password });

      if (response.status === 200) {
        const { token } = response.data;
        setToken(token); // Set token ke localStorage
        Swal.fire("Success", "Login success", "success").then(() => {
          router.push("/");
          window.location.reload();
        });
      } else {
        Swal.fire("Error", "Login failed. Please try again.", "error"); // Menampilkan alert menggunakan sweetalert2
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred. Please try again.", "error"); // Menampilkan alert menggunakan sweetalert2
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
