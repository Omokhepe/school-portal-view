"use client";

import React, { useState } from "react";
import scheduleBG from "@assets/images/scheduleBG.png";
import useAppStore from "@store/appStore";
import TimetableGrid from "@/admin-dashboard/schedule/components/TimetableGrid";
import { useAuthStore } from "@store/authStore";

const Page = () => {
  const { classes, subjects, teachers } = useAppStore();
  const user = useAuthStore((s) => s.user);
  const [studentClass, setStudentClass] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState("");

  if (!classes || Object.keys(classes).length === 0) {
    return <div>Loading classes...</div>;
  }

  const allClasses = [
    ...classes.creche,
    ...classes.primary,
    ...classes.jss,
    ...classes.ss,
  ];
  const classLookup = Object.fromEntries(
    allClasses.map((c) => [String(c.id), c]),
  );

  const subjectsForClass = subjects.filter(
    (s) => s.level_group === selectedLevel,
  );

  return (
    <div
      className="flex-1 h-full pl-15 pr-8 pt-10"
      // className='relative h-full bg-fixed bg-center bg-cover w-full p-8'
      style={{ backgroundImage: `url(${scheduleBG.src})` }}
    >
      <h2 className="font-bold text-3xl">Set Timetable</h2>
      {user?.role !== "teacher" && (
        <div className="flex items-center gap-6">
          <h3>Choose Class for Timetable</h3>
          <select
            value={studentClass}
            onChange={(e) => {
              const id = e.target.value;
              setStudentClass(id);
              const cls = classLookup[id];
              setSelectedLevel(cls?.level ?? "");
            }}
            className="w-120 h-10 px-5 rounded-sm border bg-off-white mt-3"
          >
            <option value="">Select class</option>
            <optgroup label="Creche">
              {classes.creche?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Primary">
              {classes.primary?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Secondary">
              {[...classes?.jss, ...classes?.ss]?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      )}

      {/*<TimetableCell classes={classes} subjects={subjects} />*/}
      <TimetableGrid
        classId={studentClass}
        subjects={subjectsForClass}
        teachers={teachers}
        role={user?.role}
      />
    </div>
  );
};

export default Page;
