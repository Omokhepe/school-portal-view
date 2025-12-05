import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus, Plus } from "lucide-react";
import NoteModal from "@/admin-dashboard/user/NoteModal";
import { useAuthStore } from "@store/authStore";
import useAppStore from "@store/appStore";

const NoteForm = () => {
  const token = useAuthStore((s) => s.token);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { subjects, classes } = useAppStore();

  console.log(subjects, classes, "list selected");
  if (!classes) return null;
  return (
    <>
      <div className="w-40 bg-white shadow rounded-lg h-40 flex items-center justify-center">
        <CirclePlus className="w-25 h-10 mr-2" />
      </div>
      {/*<div>*/}
      {/*  <Button*/}
      {/*    variant="secondary"*/}
      {/*    className="bg-yellow-900 text-off-white hover:bg-grey900 hover:text-beige100 h-12 hover:bg-yellow-700"*/}
      {/*    onClick={() => setOpen(true)}*/}
      {/*  >*/}
      {/*    <Plus />*/}
      {/*    Click to Add Subject Note*/}
      {/*  </Button>*/}

      {/*  /!* Reusable dialog *!/*/}
      {/*  /!*<NoteModal />*!/*/}
      {/*  <NoteModal*/}
      {/*    open={open}*/}
      {/*    setOpen={setOpen}*/}
      {/*    // title="Add New User"*/}
      {/*    // onSave={handleFormSubmit}*/}
      {/*    // fullName="Full Name"*/}
      {/*    // userText="User Name"*/}
      {/*    subjects={subjects}*/}
      {/*    dataClass={classes}*/}
      {/*    formData={formData}*/}
      {/*    setFormData={setFormData}*/}
      {/*    token={token}*/}
      {/*  />*/}
      {/*</div>*/}
    </>
  );
};

export default NoteForm;
