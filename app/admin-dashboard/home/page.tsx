"use client";

import React, { useEffect } from "react";
import homeBG from "@assets/images/homeBG.png";
import Protected from "@components/Protected";
import SummaryCard from "@/admin-dashboard/home/summaryCard";
import Announcement from "@/admin-dashboard/home/announcement";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";
import Syllabus from "@/admin-dashboard/home/syllabus";

const Page = () => {
  const router = useRouter();
  const { token, hydrated, user } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!token) router.replace("/login");
  }, [token, hydrated]);

  if (!hydrated) return null;

  return (
    <Protected roles={["admin", "teacher"]}>
      <div
        className="flex-1 h-full pl-15 pr-8 pt-10"
        style={{ backgroundImage: `url(${homeBG.src})` }}
      >
        <h2 className="font-bold text-3xl">Home </h2>
        <div className="flex items-start">
          <SummaryCard />
          <Announcement />
        </div>
        {/*<Syllabus />*/}
      </div>
    </Protected>
  );
};

export default Page;
