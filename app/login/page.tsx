"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../actions/login";
import { useAuthStore } from "../../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  // const user = useAuthStore((state) => state.user);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    const result = await login({ email, password });

    setUser(result.user);
    if (result.must_change_password === 0) {
      router.push("/change-password");
    } else {
      router.push("/e-portal");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
