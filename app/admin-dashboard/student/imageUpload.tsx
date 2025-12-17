"use client";

import { useRef, useState } from "react";
import { validateAndPreviewImage } from "@lib/helper";

export default function ImageUpload({
  onChange,
}: {
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File | null) => {
    if (!file) return;
    validateAndPreviewImage(
      file,
      (previewUrl, validFile) => {
        setPreview(previewUrl);
        onChange(validFile);
      },
      (msg) => alert(msg),
    );
    // const valid = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    // if (!valid.includes(file.type)) {
    //   alert("Only images allowed");
    //   return;
    // }
    //
    // setPreview(URL.createObjectURL(file));
    // onChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="w-40 h-40 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center text-center text-sm text-gray-500 cursor-pointer hover:bg-purple-50 transition relative"
    >
      {preview ? (
        <img src={preview} className="w-full h-full object-cover rounded-lg" />
      ) : (
        <span>Drag and drop or click here to select file</span>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
