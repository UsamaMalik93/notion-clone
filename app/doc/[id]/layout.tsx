import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { use } from "react";

const Doclayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  //   auth.protect(); //refirect to login screen if not logged in
  const { id } = use(params);

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};

export default Doclayout;
