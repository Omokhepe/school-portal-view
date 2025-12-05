export const addSchedule = async (token: string, payload: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/timetable`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.log(err, "the hell");
      return Promise.reject(err);
      // throw new Error(err.message || "Failed");
    }
    const data = await res.text();
    // const jsonData = await res.json();
    const json = await JSON.parse(data);
  } catch (err: any) {
    console.error(err);
  }
};
