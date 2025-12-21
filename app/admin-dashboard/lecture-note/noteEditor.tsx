"use client";

import React, { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Bold,
  Highlighter,
  ImageUp,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";
import { validateAndPreviewImage } from "@lib/helper";

interface Props {
  content: string;
  onChange: (html: string) => void;
  // sendImg: () => [];
  sendImg: React.Dispatch<React.SetStateAction<File[]>>;
  onImageUpload: (file: File) => Promise<string>;
}

export default function NoteEditor({
  content,
  onChange,
  sendImg,
  onImageUpload,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      // BulletList,
      // ListItem,
      Underline,
      Highlight,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  const handleImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      validateAndPreviewImage(
        file,
        (previewUrl, validFile) => {
          setPreview(previewUrl); // local preview
          // Insert preview into editor
          editor?.chain().focus().setImage({ src: previewUrl }).run();

          // Save file for upload later
          sendImg((prev) => [...prev, validFile]);
        },
        (msg) => toast.error(msg),
      );
    },
    [editor, sendImg],
  );

  if (!editor) return null;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-yellow-900 text-amber-50 p-3 rounded-sm">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          Underline
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </Button>

        {/* Image Upload */}
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
          {/*<ImageUpload onChange={setImageFile} />*/}
          <Button size="sm" variant="ghost" asChild>
            <span>
              <ImageUp />
            </span>
          </Button>
        </label>
      </div>

      {/* Image Preview */}

      {/* Editor Content */}
      <div className="border rounded-md p-3 bg-white shadow-sm min-h-[100px] editor-wrapper">
        <EditorContent editor={editor} />
      </div>
      {/*{preview && (*/}
      {/*  <img*/}
      {/*    src={preview}*/}
      {/*    alt="Preview"*/}
      {/*    className="w-32 h-32 object-cover rounded-md"*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
}
