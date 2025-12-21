"use server";

import axios from "axios";

export const addUser = async (token: string | null, payload: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // cache: "no-store",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorText = await res.text();
      // throw new Error(`Failed to create user: ${res.status} - ${errorText}`);
      throw new Error(errorText);
    }

    // await loadResource("users", true);
    const data = await res.json();

    console.log("Success: ", data);
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || err);
  }
};

export const addNote = async (token: string, payload: any) => {
  console.log(payload, "payload");

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/notes`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    const data = res.data;
    // await fetchActiveAnnouncements();

    console.log("created note", data);
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || err);
  }
};

export const getAllNotes = async (token: string | null) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    const data = res.data;

    console.log("get notes", data);
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || err);
  }
};
