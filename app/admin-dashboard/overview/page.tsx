import React from "react";
import adminBG from "@assets/images/adminBG.png";
import UserOverview from "@components/userOverview";
import { user } from "../../../actions/user";

const Page = () => {
  const userInfo = user();
  console.log(userInfo);
  return (
    <div
      className={`
          relative h-screen bg-fixed bg-center bg-cover w-full p-8
        `}
      style={{ backgroundImage: `url(${adminBG.src})` }}
    >
      <h2 className="font-bold text-3xl">Overview</h2>
      <UserOverview />
    </div>
  );
};

export default Page;
