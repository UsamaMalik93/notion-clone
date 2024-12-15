"use client";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";

const LiveBlockProvider = ({ children }: { children: React.ReactNode }) => {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PULBIC_KEY)
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PULBIC_KEY is not found");

  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
};

export default LiveBlockProvider;
