import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoteModal from "@/admin-dashboard/user/NoteModal";
import { useSubjects } from "../../../hooks/useData";
import { useAuthStore } from "@store/authStore";
import useAppStore from "@store/appStore";

const NoteForm = () => {
  const token = useAuthStore((s) => s.token);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const { data: subjects } = useSubjects(token);
  const classes = useAppStore((s) => s.classes);
  console.log(subjects, classes, "list selected");
  return (
    <>
      <div>
        <Button
          variant="secondary"
          className="bg-yellow-900 text-off-white hover:bg-grey900 hover:text-beige100 h-12 hover:bg-yellow-700"
          onClick={() => setOpen(true)}
        >
          <Plus />
          Click to Add Subject Note
        </Button>

        {/* Reusable dialog */}
        {/*<NoteModal />*/}
        <NoteModal
          open={open}
          setOpen={setOpen}
          // title="Add New User"
          // onSave={handleFormSubmit}
          // fullName="Full Name"
          // userText="User Name"
          subjects={subjects}
          dataClass={classes}
          formData={formData}
          setFormData={setFormData}
          token={token}
        />
      </div>
    </>
  );
};

export default NoteForm;
