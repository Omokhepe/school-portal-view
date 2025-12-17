"use client";

import React, { useEffect } from "react";
import Protected from "@components/Protected";
import adminBG from "@assets/images/adminBG.png";
import AddStudent from "@/admin-dashboard/student/addStudent";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";

const Page = () => {
  const router = useRouter();
  const { token, hydrated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!token) router.replace("/login");
  }, [token, hydrated]);

  if (!hydrated) return null;

  return (
    <Protected roles={["admin"]}>
      <div
        className="flex-1 h-full pl-15 pr-8 pt-10"
        // className='relative h-full bg-fixed bg-center bg-cover w-full p-8'
        style={{ backgroundImage: `url(${adminBG.src})` }}
      >
        <h3 className="font-bold font-mono text-2xl pb-4">Student</h3>
        <AddStudent />
      </div>
    </Protected>
  );
};

export default Page;
