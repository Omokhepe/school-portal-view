"use client";

import React, { useState } from "react";
import useAppStore from "@store/appStore";
import Image from "next/image";
import PopoverMenu from "@components/PopoverMenu";

const TeacherRecord = () => {
  const teachers = useAppStore((s) => s.teachers);
  const [buttonType, setButtonType] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState();
  const [selectedData, setSelectedData] = useState(null);

  // const imageLoader = ({ src, width, quality }) => {
  //   console.log(src, "srcsss");
  //   return `${process.env.NEXT_PUBLIC_API_URL}/storage/${src}?w=${width}&q=${quality || 75}`;
  //   // return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  // };
  console.log(teachers, "teacherRecord");
  return (
    <>
      <div className="flex flex-row gap-6 items-center justify-center">
        {teachers.map((teacher, index) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_API_IMG_URL}/storage/${teacher.image}`;
          return (
            <div
              key={index}
              className="w-100 bg-white shadow rounded-lg h-70 flex flex-col items-center justify-center px-5"
            >
              <div className="flex self-end">
                <PopoverMenu
                  onEdit={() => {
                    setSelectedData(teacher);
                    setButtonType("edit");
                    setOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedData(teacher);
                    setButtonType("delete");
                    setOpenDelete(true);
                  }}
                />
              </div>

              <div className="flex flex-row w-full justify-start items-center gap-3">
                <Image
                  src={imageUrl}
                  width={70}
                  height={70}
                  alt="User photo"
                  className="rounded-full object-cover w-30 h-30"
                  unoptimized
                />
                <span className="font-mono font-bold text-xl">
                  {teacher.first_name} {teacher.last_name}
                </span>
              </div>
              <hr
                className="h-1 bg-[#FF6B6B]/30 w-full my-3"
                aria-hidden="true"
              />
              {/*<div className="h-1 bg-[#FF6B6B]/30 w-full"></div>*/}

              {/*<div className="flex flex-row items-center justify-end">*/}
              <div
                className="grid  grid-cols-3 gap-4 font-manrope font-bold text-xs text-center"
                // className="flex flex-row w-full justify-center items-center"
              >
                <div className=" flex flex-col">
                  <label
                    htmlFor="teacherId"
                    className="text-gray-700 font-mono"
                  >
                    Teacher ID
                  </label>
                  <span className="whitespace-nowrap">{teacher.user_id}</span>
                </div>
                <div className=" flex flex-col">
                  <label
                    htmlFor="teacherUsername"
                    className="text-gray-700 font-mono"
                  >
                    Username
                  </label>
                  <span className="whitespace-nowrap">{teacher.username}</span>
                </div>

                <div className=" flex flex-col">
                  <label htmlFor="gender" className="text-gray-700 font-mono">
                    Gender
                  </label>
                  <span className="capitalize">{teacher.gender}</span>
                </div>
                <div className=" flex flex-col">
                  <label htmlFor="dob" className="text-gray-700 font-mono">
                    Date Of Birth
                  </label>
                  <span>{teacher.date_of_birth}</span>
                </div>
                <div className=" flex flex-col">
                  <label htmlFor="phoneNo" className="text-gray-700 font-mono">
                    Phone Number
                  </label>
                  <span>{teacher.phone_number}</span>
                </div>
                <div className=" flex flex-col">
                  <label htmlFor="phoneNo" className="text-gray-700 font-mono">
                    Date Joined
                  </label>
                  <span>{teacher.created_at.split("T")[0]}</span>
                </div>
              </div>
              {/*</div>*/}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TeacherRecord;
