"use client";

import React, { useEffect } from "react";
import adminBG from "@assets/images/adminBG.png";
import Protected from "@components/Protected";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";
import AddUser from "@/admin-dashboard/overview/addUser";
import UserRecord from "@/admin-dashboard/overview/userRecord";
import { Toaster } from "@/components/ui/sonner";
import { useStudents, useTeachers } from "../../../hooks/useData";
import UserOverview from "@/admin-dashboard/overview/userOverview";

const Page = () => {
  const router = useRouter();
  const { token, hydrated, user } = useAuthStore();
  const { data: teachers } = useTeachers(token);
  const { data: students } = useStudents(token);

  useEffect(() => {
    if (!hydrated) return;
    if (!token) router.replace("/login");
  }, [token, hydrated]);

  if (!hydrated) return null;

  return (
    <Protected roles={["admin"]}>
      <div
        className="flex-1 h-screen overflow-y-auto ml-64 pl-15 pr-8 pt-10"
        // className='relative h-full bg-fixed bg-center bg-cover w-full p-8'
        style={{ backgroundImage: `url(${adminBG.src})` }}
      >
        <Toaster richColors />
        <h2 className="font-bold text-3xl">Overview {user?.name}</h2>
        {/*{data && dataClass ? (*/}
        <>
          <AddUser />
          <div className="flex gap-16">
            <UserRecord users={students} role={"student"} />
            <UserOverview />
          </div>
          <UserRecord users={teachers} />
        </>
      </div>
    </Protected>
  );
};

export default Page;
