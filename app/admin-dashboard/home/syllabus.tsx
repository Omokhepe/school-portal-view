"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SyllabusUploadForm,
  UploadResponse,
  UploadState,
} from "../../../types/uploadSyllabus";
import axios from "axios";
import { useAuthStore } from "@store/authStore";

const Syllabus = () => {
  const token = useAuthStore((s) => s.token);
  const [form, setForm] = useState<SyllabusUploadForm>({
    file: null,
    school_year: "",
    notify_email: "",
    notify_phone: "",
  });

  const [state, setState] = useState<UploadState>({
    loading: false,
    error: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    if (file.type !== "application/pdf") {
      setState({ loading: false, error: "Only PDF files are allowed" });
      return;
    }

    setForm((prev) => ({ ...prev, file }));
    setState({ loading: false, error: null });
  };

  const handleUpload = async () => {
    if (!form.file || !form.school_year) {
      setState({
        loading: false,
        error: "PDF file and school year are required",
      });
      return;
    }

    const payload = new FormData();
    payload.append("files", form.file);
    payload.append("school_year", form.school_year);

    if (form.notify_email) {
      payload.append("notify_email", form.notify_email);
    }

    if (form.notify_phone) {
      payload.append("notify_phone", form.notify_phone);
    }

    try {
      setState({ loading: true, error: null });

      console.log([...payload.entries()]);
      // console.log("---- FORM DATA ----");
      // for (let [key, value] of payload.entries()) {
      //   console.log(key, value);
      // }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/schemes/upload`,
        payload,
        {
          withCredentials: false,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data: UploadResponse = await res.data;

      alert(data.message ?? "Upload successful");
      // setForm({ syllabus: null });

      // const data = res.data;
      // await fetchActiveAnnouncements();

      console.log("created note", data);
      return data;
    } catch (err: any) {
      console.log(err, "yeah error");
      setState({
        loading: false,
        error: err.message ?? "Upload error",
      });
    } finally {
      setState((s) => ({ ...s, loading: false }));
    }
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      <input
        type="text"
        placeholder="School Year (e.g. 2024/2025)"
        value={form.school_year}
        onChange={(e) => setForm({ ...form, school_year: e.target.value })}
      />

      <input
        type="email"
        placeholder="Notify Email (optional)"
        value={form.notify_email}
        onChange={(e) => setForm({ ...form, notify_email: e.target.value })}
      />

      <input
        type="text"
        placeholder="Notify Phone (optional)"
        value={form.notify_phone}
        onChange={(e) => setForm({ ...form, notify_phone: e.target.value })}
      />

      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <Button
        onClick={handleUpload}
        disabled={state.loading}
        className="bg-yellow-900"
      >
        {state.loading ? "Uploading..." : "Upload PDF"}
      </Button>
    </div>
  );
};

export default Syllabus;
