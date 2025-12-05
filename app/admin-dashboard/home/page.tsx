"use client";

import React from "react";
import homeBG from "@assets/images/homeBG.png";
import Protected from "@components/Protected";
import SummaryCard from "@/admin-dashboard/home/summaryCard";
import Announcement from "@/admin-dashboard/home/announcement";

const Page = () => {
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
      </div>
    </Protected>
  );
};

export default Page;
