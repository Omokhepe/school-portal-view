"use client";

import React from "react";

import useAppStore from "@store/appStore";
import { getLevelStudentCount, groupClassesByLevel } from "@lib/helper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UserOverview = () => {
  const { classes, students } = useAppStore();

  console.log(classes, "checking");
  let grouped = {};
  if (classes) {
    grouped = groupClassesByLevel(classes);
  }

  console.log(students, classes, grouped, "whatagwan");
  return (
    <Accordion type="multiple" className="flex flex-2/7 flex-col space-y-4">
      {Object.keys(grouped).map((level) => {
        const classesInLevel = grouped[level];

        return (
          <AccordionItem
            key={level}
            value={level}
            className="border rounded-xl p-4 shadow-sm bg-yellow-900"
          >
            {/* LEVEL TRIGGER */}
            <AccordionTrigger
            // className="flex flex-col items-start"
            >
              <div className="flex justify-between w-full items-center">
                <h2 className="text-xl font-bold capitalize text-off-white">
                  {level}
                </h2>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {getLevelStudentCount(students, grouped, level)} students
                </span>
              </div>
            </AccordionTrigger>

            {/* LEVEL CONTENT → CLASSES */}
            <AccordionContent className="pl-4 mt-2 space-y-4">
              <Accordion type="multiple" className="space-y-2">
                {classesInLevel.map((cls) => {
                  const studentsInClass = students.filter(
                    (s) => s.class_id === cls.id,
                  );

                  return (
                    <AccordionItem
                      key={cls.id}
                      value={String(cls.id)}
                      // className="border rounded-lg p-3"
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      {/* CLASS TRIGGER */}
                      <AccordionTrigger>
                        <div className="flex justify-between items-center w-full">
                          <h3 className="font-semibold">{cls.name}</h3>
                          <div>
                            <p className="text-2xl font-bold">
                              {studentsInClass.length}
                            </p>
                            <p className="text-sm text-gray-500">Students</p>
                          </div>
                        </div>
                      </AccordionTrigger>

                      {/* CLASS CONTENT → STUDENTS */}
                      {/*<AccordionContent className="pl-4 mt-2 space-y-2">*/}
                      {/*  {studentsInClass.length === 0 && (*/}
                      {/*    <p className="text-sm text-gray-500">No students.</p>*/}
                      {/*  )}*/}

                      {/*  {studentsInClass.map((s) => (*/}
                      {/*    <div*/}
                      {/*      key={s.id}*/}
                      {/*      className="p-2 bg-gray-100 rounded flex justify-between"*/}
                      {/*    >*/}
                      {/*      <span className="font-medium">{s.name}</span>*/}
                      {/*      <span className="text-xs text-gray-600">*/}
                      {/*        {s.user_id}*/}
                      {/*      </span>*/}
                      {/*    </div>*/}
                      {/*  ))}*/}
                      {/*</AccordionContent>*/}
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default UserOverview;
