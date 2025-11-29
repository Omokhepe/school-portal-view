"use client";

import React, { useEffect } from "react";
import userBg from "@assets/images/userBG.png";
// import AddUser from "@/admin-dashboard/overview/addUser";
// import UserRecord from "@/admin-dashboard/overview/userRecord";
import Protected from "@components/Protected";
import NoteForm from "@/admin-dashboard/user/noteForm";
import { useAuthStore } from "@store/authStore";
import { useRouter } from "next/navigation";
// import { getSubjects } from "@actions/teacherNotes";

const Page = () => {
  const router = useRouter();
  const { token, hydrated } = useAuthStore();

  // const loadSubjects;

  useEffect(() => {
    if (!hydrated) return;
    if (!token) router.replace("/login");
  }, [token, hydrated]);

  if (!hydrated) return null;

  return (
    <Protected roles={["admin", "teacher"]}>
      <div
        className="flex-1 overflow-y-auto ml-64 pl-15 pr-8 pt-10"
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
