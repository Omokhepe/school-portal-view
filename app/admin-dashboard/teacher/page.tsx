"use client";

import React, { useEffect } from "react";
import Protected from "@components/Protected";
import teacherBG from "@assets/images/teacherBG.png";
import AddTeacher from "@/admin-dashboard/teacher/addTeacher";
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
        style={{ backgroundImage: `url(${teacherBG.src})` }}
      >
        <h3 className="font-bold font-mono text-2xl pb-4">Teacher</h3>
        <AddTeacher />
      </div>
    </Protected>
  );
};

export default Page;
