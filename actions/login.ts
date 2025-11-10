"use server";

import { cookies } from "next/headers";
import api from "@lib/api";
import { toast } from "sonner";

export async function login(data: { email: string; password: string }) {
  try {
    const response = await api.post("/login", data);

    const { token, user, must_change_password } = response.data;

    (await cookies()).set("auth_Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    toast.success("Login Successful!");
    return { user, must_change_password };
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
}
