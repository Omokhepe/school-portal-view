"use client";

import React, { useEffect } from "react";
import innerLect from "@assets/images/innerLectBG.png";
import Protected from "@components/Protected";
import { useAuthStore } from "@store/authStore";
import { useParams, useRouter } from "next/navigation";
import useAppStore from "@store/appStore";
import SummaryPage from "@/admin-dashboard/lecture-note/[group]/SummaryPage";

const Page = () => {
  const router = useRouter();
  const subjects = useAppStore((s) => s.subjects);
  const { token, hydrated } = useAuthStore();
  const { group } = useParams<{ group: string }>();

  const groupSubject = subjects.filter((item) => item.level_group === group);
  console.log(subjects, groupSubject, "groupSubj");

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
        style={{ backgroundImage: `url(${innerLect.src})` }}
      >
        <h2>Lecture Note</h2>
        {/*<AddNote />*/}
        <SummaryPage classSubjects={groupSubject} token={token} />
      </div>
    </Protected>
  );
};

export default Page;
