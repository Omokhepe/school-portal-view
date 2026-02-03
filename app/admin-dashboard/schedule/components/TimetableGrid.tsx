"use client";

import React, { useMemo, useState } from "react";
import { FIXED_BREAKS, slots } from "../../../../constant/data";
import {
  useTeacherTimetable,
  useTimetable,
} from "../../../../hooks/useTimetable";
import TimetableEditor from "@/admin-dashboard/schedule/components/TimetableEditor";
import { SubjectType, UserType } from "../../../../types/user";
import { normalizeTime } from "@lib/helper";

export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

type Props = {
  classId: string;
  subjects: SubjectType[];
  teachers: UserType[];
  role?: string;
};

const TimetableGrid = ({ classId, subjects, teachers, role }: Props) => {
  const { entries, refresh } = useTimetable(Number(classId));
  const { teacherEntries } = useTeacherTimetable();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  // console.log(entries, "here entry");

  // index entries for quick lookup by day+start
  // const map = useMemo(() => {
  //   // const m: Record<string, any> = {};
  //   // entries.forEach((e) => {
  //   //   m[`${e.day}-${e.start_time}`] = e;
  //   // });
  //   // return m;
  //   const m: Record<string, { type: "entry" | "break"; data: any }> = {};
  //
  //   // Add timetable entries
  //   if (role === "teacher") {
  //     teacherEntries.forEach((e) => {
  //       const key = `${e.day}-${e.start_time}`;
  //       m[key] = { type: "entry", data: e };
  //     });
  //   } else {
  //     entries.forEach((e) => {
  //       const key = `${e.day}-${e.start_time}`;
  //       m[key] = { type: "entry", data: e };
  //     });
  //   }
  //
  //   // Add fixed breaks
  //   days.forEach((day) => {
  //     FIXED_BREAKS.forEach((b) => {
  //       const key = `${day}-${b.start}`;
  //       m[key] = { type: "break", data: b };
  //     });
  //   });
  //
  //   console.log(m, "here entry");
  //
  //   return m;
  // }, [entries, role, teacherEntries]);

  const map = useMemo(() => {
    const m: Record<string, { type: "entry" | "break"; data: any }> = {};

    // Breaks (low priority)
    days.forEach((day) => {
      FIXED_BREAKS.forEach((b) => {
        const key = `${day}-${normalizeTime(b.start)}`;
        m[key] = { type: "break", data: b };
      });
    });

    // Entries (high priority)
    const source = role === "teacher" ? teacherEntries : entries;

    source.forEach((e) => {
      console.log(e, "checking e dark hoho");
      const key = `${e.day}-${normalizeTime(e.start_time)}`;
      m[key] = { type: "entry", data: e };
    });

    return m;
  }, [entries, teacherEntries, role]);

  const openEditorFor = (day: string, slot: { start: string; end: string }) => {
    const existing = map[`${day}-${slot.start}`] ?? null;
    setEditingEntry(
      existing
        ? existing
        : {
            type: "empty",
            data: {
              class_id: classId,
              day,
              start_time: slot.start,
              end_time: slot.end,
            },
          },
    );
    setEditorOpen(true);
  };
  return (
    <div>
      <div className="overflow-auto w-2/3 border rounded card_wrap">
        <div>
          <div>
            <span>Time</span>
            {days.map((d) => (
              <span
                key={d}
                className="ml-20 capitalize w-50 font-bold font-manrope"
              >
                {d.toUpperCase()}
              </span>
            ))}
          </div>
          <div>
            {slots.map((slot) => (
              <div key={slot.start} className="flex items-center gap-4">
                <span className="p-2 text-sm font-medium">{slot.start}</span>
                {days.map((day) => {
                  const key = `${day}-${slot.start}`;
                  const entry = map[key];
                  // console.log(entry, "hey God oo");
                  return (
                    <div
                      key={key}
                      className={`
                        w-45 h-12 m-2 border-2 rounded-md hover:bg-gray-50 hover:text-gray-700 cursor-pointer ${entry ? "border-greyGreen text-yellow-950" : ""}
                       ${
                         role === "teacher"
                           ? "cursor-not-allowed opacity-70 pointer-events-none"
                           : "cursor-pointer hover:bg-gray-50 hover:text-gray-700"
                       }
                      `}
                      onClick={() => {
                        if (role === "teacher") return;
                        openEditorFor(day, slot);
                      }}
                    >
                      {entry ? (
                        entry.type === "entry" ? (
                          <div
                            className="space-y-2 text-center my-auto"
                            style={{
                              backgroundColor: `${entry.data.subject?.color}40`,
                              // bordsr: `2px solid ${entry.data.subject.color}`,
                              // opacity: "0.5",
                            }}
                          >
                            <div className="font-semibold text-xs pt-1 font-mono">
                              {entry.data.subject?.name ?? "—"}
                            </div>
                            <div className="text-xs text-gray-600">
                              {entry.data.teacher?.first_name ?? ""}{" "}
                              {entry.data.teacher?.last_name ?? ""}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-sm text-gray-400 font-bold my-3">
                            {entry.data.label}
                          </div>
                        )
                      ) : (
                        <div className="text-sm text-gray-400 p-3">Add</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <TimetableEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        entry={editingEntry}
        classId={classId}
        subjects={subjects}
        teachers={teachers}
        onSaved={() => {
          refresh();
          // refresh();
        }} // refresh after save
      />
    </div>
  );
};

export default TimetableGrid;
