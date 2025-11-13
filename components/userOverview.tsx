"use client";

import React, { useEffect, useState } from "react";

import { useAuthStore } from "@store/authStore";
import { getAllStudents, getAllTeacher } from "@actions/user";
import { router } from "next/client";
import { usePathname } from "next/navigation";

const UserOverview = () => {
  const [students, setStudents] = useState<any>([]);
  const [teachers, setTeachers] = useState<any>([]);

  const token = useAuthStore((s) => s.token);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/admin-dashboard/overview") return;
    if (!token) return;

    const loadTeachers = async () => {
      try {
        const [teacherData, studentData] = await Promise.all([
          getAllTeacher(token),
          getAllStudents(token),
        ]);
        setTeachers(teacherData);
        setStudents(studentData);
        console.log({ teacherData, studentData });
      } catch (err: any) {
        if (err.message === "unauthorized") {
          localStorage.removeItem("token");
          router.push("/login");
        }
        console.log(err);
      }
    };

    loadTeachers();
  }, [token]);

  console.log("user info", teachers, students);
  return (
    <div>
      Here are the following users
      {students.map((student: any, index: number) => {
        return <div key={index}>{student.name}</div>;
      })}
      {teachers.map((teacher: any, index: number) => {
        return <div key={index}>{teacher.name}</div>;
      })}
    </div>
  );
};

export default UserOverview;
