"use client";

import { useState } from "react";
import { register } from "../utils/api";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const { token } = await register(email, password);
      Swal.fire(
        "Success",
        `Registration successful. Your token: ${token}`,
        "success"
      );
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire("Error", "Registration failed. Please try again.", "error");
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
