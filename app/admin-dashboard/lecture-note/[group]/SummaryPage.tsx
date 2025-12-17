"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getAllNotes } from "@actions/user";
import { useRouter } from "next/navigation";
import { SubjectType } from "../../../../types/user";

interface Props {
  classSubjects: SubjectType[];
  token: string;
}

interface NoteSummary {
  subject_id: number;
  class_id: number;
  class_name: string;
  level: string;
  note_id: string;
}

const SummaryPage = ({ classSubjects, token }: Props) => {
  const router = useRouter();
  const [notes, setNotes] = useState<NoteSummary[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getAllNotes(token);
      setNotes(data);
    };

    fetchNotes();
  }, [token]);
  // console.log(notes, "here notes");
  const notesBySubject = useMemo(() => {
    const map: Record<number, any[]> = {};

    notes.forEach((note) => {
      if (!map[note.subject_id]) map[note.subject_id] = [];
      map[note.subject_id].push(note);
    });

    return map;
  }, [notes]);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {classSubjects.map((subject) => {
        const subjectNotes = notesBySubject[subject.id] ?? [];
        console.log("subject", subjectNotes);
        return (
          <div
            key={subject.id}
            className="relative w-72 h-52 rounded-xl border-2 p-4 cursor-pointer transition hover:scale-[1.02]"
            style={{
              backgroundColor: `${subject.color}20`,
              borderColor: subject.color,
            }}
          >
            {/* Subject title */}
            <h3 className="font-bold text-lg mb-4">{subject.name}</h3>

            {/* Class stack */}
            {subjectNotes.length > 0 ? (
              <div className="group flex items-center">
                {subjectNotes.slice(0, 5).map((note, index) => (
                  <div
                    key={note.class_id}
                    onClick={() =>
                      router.push(
                        `/lecture-notes/${note.note_id}?class=${note.class_id}`,
                      )
                    }
                    className={`
                  w-10 h-10 rounded-full bg-yellow-900 text-amber-50
                  flex items-center justify-center text-xs font-bold
                  border-2 border-white
                  transition-all
                  ${index !== 0 ? "-ml-3" : ""}
                  group-hover:ml-1
                `}
                    title={note.class_name}
                  >
                    {note.class.name.replace(/\D/g, "").slice(0, 2)}
                  </div>
                ))}

                {subjectNotes.length > 5 && (
                  <span className="ml-2 text-sm">
                    +{subjectNotes.length - 5}
                  </span>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No notes yet</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SummaryPage;
