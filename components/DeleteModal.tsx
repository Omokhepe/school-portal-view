"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteModal = ({
  onConfirm,
  openDelete,
  initialValues,
  setOpenDelete,
}) => {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {formData.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this Announcement Post? This Action
            cannot be reversed
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Button
            variant="destructive"
            onClick={(e) => {
              onConfirm(e);
              setOpenDelete(false);
            }}
            className="w-full block cursor-pointer"
          >
            Yes, Confirm Delete
          </Button>
          <Button
            variant="outline"
            className="w-full block"
            onClick={() => setOpenDelete(false)}
          >
            No, Go back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
