import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import UserForm from "@components/userForm";
import TeacherRecord from "@/admin-dashboard/teacher/teacherRecord";

const AddTeacher = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {!showForm ? (
        <div className="flex gap-6">
          <div
            onClick={() => {
              setShowForm(!showForm);
            }}
            className="w-100 bg-white shadow rounded-lg h-70 flex items-center justify-center hover:shadow-xl hover:transition-shadow duration-300"
          >
            <CirclePlus className="w-25 h-10 mr-2" />
          </div>

          <TeacherRecord />
        </div>
      ) : (
        <UserForm type="teacher" setShowForm={setShowForm} />
      )}
    </>
  );
};

export default AddTeacher;
