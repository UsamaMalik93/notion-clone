import { useRoom } from "@liveblocks/react";
import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import { useSelf } from "@liveblocks/react/suspense";
import { stringToColor } from "@/lib/string-to-color";

type EditorProps = {
  provider: LiveblocksYjsProvider;
  doc: Y.Doc;
  darkMode: boolean;
};

function BlockNote({ provider, doc, darkMode }: EditorProps) {
  //   const userInfo = useSelf((me) => me.info);
  //   console.log("🚀 ~ BlockNote ~ userInfo:", userInfo);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: "sus",
        color: stringToColor("sss"),
      },
    },
  });

  return (
    <div className="max-w-6xl relative max-auto">
      <BlockNoteView
        theme={darkMode ? "dark" : "light"}
        editor={editor}
        className="min-h-screen"
      />
    </div>
  );
}

const Editor = () => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  const darkModeStyles = `hover:text-white  ${
    darkMode
      ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
      : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
  }`;

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc.destroy();
      yProvider.destroy();
    };
  }, [room]);

  if (!doc || !provider) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        {/**Trannslate Document AI */}
        {/**ChatToDocument AI */}

        {/**Dark Mode */}
        <Button
          className={darkModeStyles}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
      <BlockNote provider={provider} doc={doc} darkMode={darkMode} />
    </div>
  );
};

export default Editor;
