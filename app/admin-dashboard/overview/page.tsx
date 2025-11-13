"use client";

import React, { useEffect, useMemo, useState } from "react";
import adminBG from "@assets/images/adminBG.png";
import UserOverview from "@components/userOverview";
import Protected from "@components/Protected";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";
import AddUser from "@components/addUser";
import UserRecord from "@components/userRecord";
import { getAllUsers, getClasses } from "@actions/user";
import { router } from "next/client";

const Page = () => {
  const router = useRouter();
  const { token, hydrated, user } = useAuthStore();

  const [data, setData] = useState([]);
  const [dataClass, setDataClass] = useState<any>([]);

  const getAllUser = async () => {
    try {
      const [resUser, resClass] = await Promise.all([
        getAllUsers(token),
        getClasses(token),
      ]);
      setData(resUser);
      setDataClass(resClass);
      console.log({ data, dataClass }, "all data");
    } catch (err: any) {
      if (err.message === "unauthorized") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    // if (!hydrated) return;
    // if (!token) router.replace("/login");

    getAllUser();
    // userClasses();
  }, [token, hydrated]);

  if (!hydrated) return null;

  // const userInfo = user();
  console.log(token, hydrated, user, data, dataClass);
  return (
    <Protected roles={["admin"]}>
      <div
        className="flex-1 overflow-y-auto ml-64 pl-15 pr-8 pt-10"
        // className='relative h-full bg-fixed bg-center bg-cover w-full p-8'
        style={{ backgroundImage: `url(${adminBG.src})` }}
      >
        <h2 className="font-bold text-3xl">Overview {user?.name}</h2>
        {data && dataClass ? (
          <>
            <AddUser dataClass={dataClass || []} />
            {/*<UserOverview />*/}
            <UserRecord data={data || []} dataClass={dataClass} />
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </Protected>
  );
};

export default Page;
