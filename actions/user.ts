"use server";

import api from "@lib/api";
import { cookies } from "next/headers";

export async function user() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    const userRes = await api.get("/users", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return userRes;
  } catch (err) {
    console.log("Fetch User Error", err.response?.data || err);
    throw new Error(`Unable to fetch Users`);
  }
  // const userRes = await api.get("/users");
  // console.log(userRes);
  // if (!userRes) {
  //   console.log("No user found");
  // }
}
