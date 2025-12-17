import { useAnnouncement } from "@store/announcement";
import axios from "axios";
import { AnnouncementPayload } from "../types/class";

export const fetchActiveAnnouncements = async () => {
  const store = useAnnouncement.getState();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/announcements/active`,
    );
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    // await loadResource("users", true);
    const data = await res.json();
    store.fetchActive(data.data);

    console.log("Success: ", data.data);
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || err);
  }
};

export const postAnnouncement = async (
  payload: AnnouncementPayload,
  token: string,
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/announcements`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    const data = res.data;
    await fetchActiveAnnouncements();

    console.log("created note", data);
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || err);
    // setErrors({ submit: err.message || "Submit failed" });
  }
};

export const editAnnouncement = async (payload, id, token: string) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/announcements/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    const data = res.data;
    await fetchActiveAnnouncements();

    console.log("created edited", data);
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || err);
  }
};
export const deleteAnnouncement = async (id, token: string) => {
  console.log("here", id, token);
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/announcements/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    const data = res.data;
    await fetchActiveAnnouncements();

    console.log("Announcement deleted", data);
    return data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err.message || err);
  }
};
