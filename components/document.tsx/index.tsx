"use client";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "../editor";

const Document = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();

  useEffect(() => {
    if (!data) return;
    else setInput(data.title);
  }, [data]);

  const updateTitle = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      {/**Header  */}
      <div className="justify between mx-auto max-w-6xl pb-5">
        <form onSubmit={updateTitle} className="flex flex-1 space-x-5">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Update the title"
            className="bg-white"
          />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating" : "Update"}
          </Button>
        </form>
      </div>
      <div>
        {/**Manage users */}
        {/**Avatars */}
      </div>

      {/**Collaborative Editor */}
      <hr className="pb-5" />
      <Editor />
    </div>
  );
};

export default Document;
