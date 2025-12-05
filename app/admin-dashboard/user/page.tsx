"use client";

import React, { useEffect } from "react";
import userBg from "@assets/images/userBG.png";
import Protected from "@components/Protected";
import NoteForm from "@/admin-dashboard/user/noteForm";
import { useAuthStore } from "@store/authStore";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { token, hydrated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!token) router.replace("/login");
  }, [token, hydrated]);

  if (!hydrated) return null;

  return (
    <Protected roles={["admin", "teacher"]}>
      <div
        className="flex-1 h-full pl-15 pr-8 pt-10"
        // className='relative h-full bg-fixed bg-center bg-cover w-full p-8'
        style={{ backgroundImage: `url(${userBg.src})` }}
      >
        <h2>Lecture Note</h2>
        <NoteForm />
      </div>
    </Protected>
  );
};

export default Page;
