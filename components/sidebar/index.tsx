"use client";
import NewDocumentBtn from "./_components/NewDocumentBtn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { MenuIcon } from "lucide-react";
import { collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import { RoomDocument } from "@/types";
import SidebarOptions from "./_components/SidebarOptions";

const Sidebar = () => {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });
  const [data, _, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  if (error) return console.error("Ops erorr : ", error);

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupedData(grouped);
  }, [data]);

  const RenderDocumentList = () => {
    return (
      <>
        <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
        {groupedData.owner.map((doc) => (
          <SidebarOptions href={`/doc/${doc.id}`} id={doc.id} key={doc.id} />
        ))}
      </>
    );
  };

  const RenderSharedWithMe = () => {
    return (
      <>
        <h2 className="text-gray-500 font-semibold text-sm">Shared With Me</h2>
        {groupedData.editor.map((doc) => (
          <SidebarOptions href={`/doc/${doc.id}`} id={doc.id} key={doc.id} />
        ))}
      </>
    );
  };

  const RenderDocuments = () => {
    if (!groupedData.owner)
      return (
        <div className="text-gray-500 font-semibold text-sm">
          No Document Foud
        </div>
      );
    return (
      <>
        <RenderDocumentList />
        <RenderSharedWithMe />
      </>
    );
  };
  const menuOptions = (
    <>
      <NewDocumentBtn />
      <div className="flex py-4 flex-col space-y-4 md:max-w-48">
        <RenderDocuments />
      </div>
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-100 relative ">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
};

export default Sidebar;
