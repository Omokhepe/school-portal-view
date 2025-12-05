"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";
import loginImage from "@assets/images/loginImg.png";
import { Input } from "@/components/ui/input";
import api from "@lib/api";
import { LoginResponse } from "../../types/auth";
import { toast } from "sonner";
import MaskedInput from "@components/MaskedInput";
import { refreshResources } from "../../hooks/useData";

enum userData {
  ChangePassword = 1,
  admin = "admin",
  teacher = "teacher",
  student = "student",
}

const LoginPage = () => {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const token = useAuthStore((s) => s.token);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
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

      if (must_change_password === userData.ChangePassword) {
        setChangePassword(true);
        toast.success("You need to Change your password");
        setUsername("");
        setPassword("");
        // router.push("/change-password");
        return;
      } else {
        setChangePassword(false);
        toast.success("Login Successful");
        await refreshResources(
          ["students", "teachers", "classes", "subjects"],
          token,
        );
        setTimeout(() => {
          router.push("/admin-dashboard/home");
        }, 100);
      }
    } catch (err: any) {
      toast.error(err.details?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        password: newPassword,
        password_confirmation: confirmPassword,
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/change-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // cache: "no-store",
        body: JSON.stringify(payload),
      });
      setChangePassword(false);
      toast.success("Password Changed Successful");
    } catch (err: any) {
      console.log(err, "note err", err.message);
      toast.error(err.message ?? "Change Password failed");
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
          onSubmit={!changePassword ? handleLogin : handleChangePassword}
          className="flex items-center flex-col w-2/3 py-10 bg-greyGreen shadow-2xl rounded-sm"
        >
          {!changePassword ? (
            <>
              <h2 className="font-bold font-mono text-xl">Login</h2>
              <div className="w-full px-10 py-5 font-bold">
                <label htmlFor="username">Username: </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email"
                  className="placeholder:text-off-white text-white"
                />
              </div>
              <div className="w-full px-10 py-5 font-bold">
                <label htmlFor="password">Password</label>
                <MaskedInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-900 w-70 h-12 rounded-sm hover: text-white"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </>
          ) : (
            <>
              <h2 className="font-bold font-mono text-xl">Change Password</h2>
              <div className="w-full px-10 py-5 font-bold">
                <label htmlFor="password">New Password</label>
                <MaskedInput
                  value={newPassword}
                  onChange={setNewPassword}
                  placeholder="Input New Password"
                />
              </div>
              <div className="w-full px-10 py-5 font-bold">
                <label htmlFor="password">Confirm New Password</label>
                <MaskedInput
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Confirm New Password"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-900 w-70 h-12 rounded-sm hover: text-white"
              >
                {loading ? "Changing ..." : "Change Password"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
