"use client";

import scheduleBG from "@assets/images/scheduleBG.png";
import useAppStore from "@store/appStore";
import { useAuthStore } from "@store/authStore";
import TimetableGrid from "@/admin-dashboard/schedule/components/TimetableGrid";
import { useClassSelector } from "@hooks/useClassSelector";

const Page = () => {
  const { classes, subjects, teachers } = useAppStore();
  const user = useAuthStore((s) => s.user);
  const { classId, subjectsForClass, selectClass } = useClassSelector(
    classes,
    subjects,
  );
  if (!classes) {
    return <div>Loading classes...</div>;
  }

  return (
    <div
      className="flex-1 h-full pl-15 pr-8 pt-10"
      style={{ backgroundImage: `url(${scheduleBG.src})` }}
    >
      <h2 className="text-3xl font-bold">Set Timetable</h2>

      {user?.role !== "teacher" && (
        <div className="flex items-center gap-6">
          <h3>Choose Class for Timetable</h3>
          <select
            onChange={(e) => selectClass(e.target.value)}
            className="w-120 h-10 px-5 border mt-4"
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
              {[...classes.jss, ...classes.sss].map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      )}

      <TimetableGrid
        classId={classId}
        subjects={subjectsForClass}
        teachers={teachers}
        role={user?.role}
      />
    </div>
  );
};

export default Page;
