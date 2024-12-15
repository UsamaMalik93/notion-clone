"use client";
import {
  RoomProvider as LiveBlockRoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loading from "./Loading";

const RoomProvider = ({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) => {
  return (
    <LiveBlockRoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
    </LiveBlockRoomProvider>
  );
};

export default RoomProvider;
