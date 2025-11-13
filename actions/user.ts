"use server";

export const getAllUsers = async (token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (response.status === 401) {
      throw new Error("unauthorized");
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
export const getAllStudents = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/students`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );
    if (response.status === 401) {
      throw new Error("unauthorized");
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const getAllTeacher = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/teachers`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch teachers: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
export const getClasses = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const data = await res.json();
    console.log(data, "here data");
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const addUser = async (token: string, payload: any) => {
  console.log(payload, "payload");
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
      throw new Error(`Failed to create user: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log("Success: ", data);
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || err);
  }
};
