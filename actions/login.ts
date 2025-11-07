"use server";

import api from "../lib/api";
import { cookies } from "next/headers";

export async function login(data: { email: string; password: string }) {
  // alert("there");
  // console.log(data, "log here");
  const response = await api.post("/login", data);

  const { token, user, must_change_password } = response.data;

  (await cookies()).set("auth_Token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  // useAuthStore.getState().login(token, user);

  return { user, must_change_password };
}
