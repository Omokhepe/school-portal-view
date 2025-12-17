"use client";

import React, { useState } from "react";
import { useAuthStore } from "@store/authStore";
import TimetableGrid from "@/admin-dashboard/schedule/components/TimetableGrid";
import { useTeachers } from "../../../../hooks/useData";
import useAppStore from "@store/appStore";
import { Classes, ClassSub } from "../../../../types/class";
import { SubjectType } from "../../../../types/user";

interface Props {
  classes: ClassSub;
  subjects: SubjectType[];
}

const TimetableCell = ({ classes, subjects }: Props) => {
  // const [subjects, setSubjects] = useState([]);
  const token = useAuthStore((s) => s.token);
  const [studentClass, setStudentClass] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const teachers = useAppStore((s) => s.teachers);

  console.log(classes, "checking");

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
    <div>
      <div>
        <select
          value={studentClass}
          onChange={(e) => {
            const id = e.target.value;
            setStudentClass(id);
            const cls = classLookup[id];
            setSelectedLevel(cls?.level ?? "");
          }}
          className="w-full h-10 px-5"
        >
          <option value="">Select class</option>
          <optgroup label="Creche">
            {classes.creche.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Primary">
            {classes.primary.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Secondary">
            {[...classes.jss, ...classes.ss].map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <TimetableGrid
        classId={studentClass}
        subjects={subjectsForClass}
        teachers={teachers}
      />
    </div>
  );
};

export default TimetableCell;
