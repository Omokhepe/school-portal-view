"use server";

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: payload,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed");
    }
    const data = await res.text();
    // const jsonData = await res.json();
    const json = await JSON.parse(data);
    // close modal or clear form
    // setOpen(false);
    // setForm({ subtopics: [] });
    // optionally: show success / update store
    console.log("created note", json, data);
  } catch (err: any) {
    console.error(err);
    // setErrors({ submit: err.message || "Submit failed" });
  }

  // try {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/teacher/notes`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       // cache: "no-store",
  //       body: JSON.stringify(payload),
  //     },
  //   );
  //   if (!res.ok) {
  //     const errorText = await res.text();
  //     // throw new Error(`Failed to create user: ${res.status} - ${errorText}`);
  //     throw new Error(errorText);
  //   }
  //
  //   const data = await res.json();
  //   console.log("Success: ", data);
  //   return data;
  // } catch (err: any) {
  //   console.log(err);
  //   throw new Error(err.message || err);
  // }
};
