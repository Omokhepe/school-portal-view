"use client";

import React, { useMemo, useState } from "react";
import { FIXED_BREAKS, slots } from "../../../../constant/data";
import { useTimetable } from "../../../../hooks/useTimetable";
import TimetableEditor from "@/admin-dashboard/schedule/components/TimetableEditor";

export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

type Props = {
  classId: number;
  subjects: { id: number; name: string }[];
  teachers: { id: number; name: string }[];
};

const TimetableGrid = ({ classId, subjects, teachers }: Props) => {
  const { entries, refresh } = useTimetable(classId);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  // index entries for quick lookup by day+start
  const map = useMemo(() => {
    // const m: Record<string, any> = {};
    // entries.forEach((e) => {
    //   m[`${e.day}-${e.start_time}`] = e;
    // });
    // return m;
    const m: Record<string, { type: "entry" | "break"; data: any }> = {};

    // Add timetable entries
    entries.forEach((e) => {
      const key = `${e.day}-${e.start_time}`;
      m[key] = { type: "entry", data: e };
    });

    // Add fixed breaks
    days.forEach((day) => {
      FIXED_BREAKS.forEach((b) => {
        const key = `${day}-${b.start}`;
        m[key] = { type: "break", data: b };
      });
    });

    return m;
  }, [entries]);

  const openEditorFor = (day: string, slot: { start: string; end: string }) => {
    const existing = map[`${day}-${slot.start}`] ?? null;
    setEditingEntry(
      existing
        ? existing
        : {
            class_id: classId,
            day,
            start_time: slot.start,
            end_time: slot.end,
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
                <span className="p-2 text-sm font-medium">
                  {slot.start} - {slot.end}
                </span>
                {days.map((day) => {
                  const key = `${day}-${slot.start}`;
                  const entry = map[key];
                  return (
                    <div
                      key={key}
                      className={`
                        w-45 h-12 m-2 border-2 rounded-md hover:bg-gray-50 hover:text-gray-700 cursor-pointer ${entry ? "border-greyGreen bg-green-100 text-yellow-950" : ""}
                      `}
                      onClick={() => openEditorFor(day, slot)}
                    >
                      {entry ? (
                        entry.type === "entry" ? (
                          <div className="space-y-1 text-center my-auto">
                            <div className="font-semibold text-sm">
                              {entry.data.subject?.name ?? "—"}
                            </div>
                            <div className="text-xs text-gray-600">
                              {entry.data.teacher?.name ?? ""}
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

        {/*<table className="w-full table-fixed ">*/}
        {/*  <thead className="bg-gray-50">*/}
        {/*    <tr>*/}
        {/*      <th className="p-2">Time</th>*/}
        {/*      {days.map((d) => (*/}
        {/*        <th key={d} className="p-2 capitalize">*/}
        {/*          {d}*/}
        {/*        </th>*/}
        {/*      ))}*/}
        {/*    </tr>*/}
        {/*  </thead>*/}

        {/*  <tbody>*/}
        {/*    {slots.map((slot) => (*/}
        {/*      <tr key={slot.start}>*/}
        {/*        <td className="p-2 text-sm font-medium">*/}
        {/*          {slot.start} - {slot.end}*/}
        {/*        </td>*/}
        {/*        {days.map((day) => {*/}
        {/*          const key = `${day}-${slot.start}`;*/}
        {/*          const entry = map[key];*/}
        {/*          return (*/}
        {/*            <td*/}
        {/*              key={key}*/}
        {/*              className="p-2 border-4 rounded-2xl hover:bg-gray-50 cursor-pointer border-black m-5"*/}
        {/*              onClick={() => openEditorFor(day, slot)}*/}
        {/*            >*/}
        {/*              {entry ? (*/}
        {/*                entry.type === "entry" ? (*/}
        {/*                  <div className="space-y-1">*/}
        {/*                    <div className="font-semibold">*/}
        {/*                      {entry.data.subject?.name ?? "—"}*/}
        {/*                    </div>*/}
        {/*                    <div className="text-xs text-gray-600">*/}
        {/*                      {entry.data.teacher?.name ?? ""}*/}
        {/*                    </div>*/}
        {/*                  </div>*/}
        {/*                ) : (*/}
        {/*                  <div className="text-sm text-gray-400 font-bold">*/}
        {/*                    {entry.data.label}*/}
        {/*                  </div>*/}
        {/*                )*/}
        {/*              ) : (*/}
        {/*                <div className="text-sm text-gray-400">Add</div>*/}
        {/*              )}*/}
        {/*            </td>*/}
        {/*          );*/}
        {/*        })}*/}
        {/*      </tr>*/}
        {/*    ))}*/}
        {/*  </tbody>*/}
        {/*</table>*/}
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
          refresh();
        }} // refresh after save
      />
    </div>
  );
};

export default TimetableGrid;
