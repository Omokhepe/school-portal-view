"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";
import loginImage from "@assets/images/loginImg.png";
import { Input } from "@/components/ui/input";
import api from "@lib/api";
import { LoginResponse } from "../../types/auth";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

enum userData {
  ChangePassword = 1,
  admin = "admin",
  teacher = "teacher",
  student = "student",
}

const LoginPage = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post<LoginResponse>("/login", {
        username: username.toLowerCase(),
        password,
      });

      const { user, token, must_change_password } = res.data;

      login({ user: user, token: token });

      toast.success("Login Successful");

      if (must_change_password === userData.ChangePassword) {
        router.push("/change-password");
        return;
      } else {
        setTimeout(() => {
          router.push("/admin-dashboard/overview");
        }, 100);
        // router.push("/admin-dashboard/overview");
      }
    } catch (err: any) {
      console.log(err, "note err");
      toast.error(err.details?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={`
          relative h-screen bg-fixed bg-center bg-cover w-full
        `}
      style={{ backgroundImage: `url(${loginImage.src})` }}
    >
      <div className="w-1/2 h-full flex items-center justify-center lg:w-1/2">
        <form
          onSubmit={handleLogin}
          className="flex items-center flex-col w-2/3 py-10 bg-greyGreen shadow-2xl rounded-sm"
        >
          <div className="w-full px-10 py-5 font-bold">
            <label htmlFor="username">Username: </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              // className="gap-4"
            />
          </div>
          <div className="w-full px-10 py-5 font-bold">
            <label htmlFor="password">Password</label>
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-900 w-70 h-12 rounded-sm hover: text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <Toaster richColors position="top-center" />
    </section>
  );
};

export default LoginPage;
