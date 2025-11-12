"use server";

import { cookies } from "next/headers";
import api from "@lib/api";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import type { LoginResponse } from "../types/auth";
import { redirect } from "next/navigation";

// export async function login(email: string, password: string) {
//   // try {
//   const res = await api.post<LoginResponse>("/login", { email, password });
//   const data = res.data;
//   console.log(data);
//
//   return data;
//   // } catch (err: any) {
//   //   console.log(err, "err msg");
//   //   throw new Error(err.response?.data?.message || "Login failed");
//   // }
// }
