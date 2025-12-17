import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserForm from "@components/userForm";
import UserRecord from "@components/userRecord";
import useAppStore from "@store/appStore";

const AddStudent = () => {
  const { students } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => {
          setShowForm(!showForm);
        }}
        className="bg-yellow-900 text-off-white hover:bg-grey900 hover:text-beige100 h-12 hover:bg-yellow-700 rounded-xl"
      >
        <Plus />
        Add New Student
      </Button>

      {showForm ? (
        <UserForm type="student" setShowForm={setShowForm} />
      ) : (
        <UserRecord users={students} role={"student"} />
      )}
    </div>
  );
};

export default AddStudent;
