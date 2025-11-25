"use client";

import React, { useState } from "react";
import { addUser } from "@actions/user";
import { useAuthStore } from "@store/authStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DialogForm from "@/admin-dashboard/overview/Modal";
import { refreshResources, useClasses } from "../../../hooks/useData";

const AddUser = () => {
  const token: string | null = useAuthStore((s) => s.token);
  const classes = useClasses(token);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    inputName: "",
    inputUsername: "",
    role: "",
    studentClass: "",
  });

  const handleFormSubmit = async () => {
    try {
      const payload = {
        name: formData.inputName.trim(),
        username: formData.inputUsername,
        role: formData.role,
        ...(formData.role === "student" && { class_id: formData.studentClass }),
      };

      const res = await addUser(token, payload);

      //this reloads api to get new data after user is saved
      await refreshResources(["users", "students", "teachers"], token);

      toast.success("User created successfully.");
    } catch (err: any) {
      toast.error(`Error creating user: ${err.message} - ${err.message.Error}`);
      console.log(err);
    } finally {
      // setLoading(false);
    }
  };
  console.log({ classes }, "classes hahahaha");

  return (
    <>
      <div>
        <Button
          variant="secondary"
          className="bg-yellow-900 text-off-white hover:bg-grey900 hover:text-beige100 h-12 hover:bg-yellow-700"
          onClick={() => setOpen(true)}
        >
          <Plus />
          Click to Add New User
        </Button>

        {/* Reusable dialog */}
        <DialogForm
          open={open}
          setOpen={setOpen}
          title="Add New User"
          onSave={handleFormSubmit}
          fullName="Full Name"
          userText="User Name"
          dataClass={classes}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </>
  );
};

export default AddUser;
