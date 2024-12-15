"use client";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { stringToColor } from "@/lib/string-to-color";

const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: { name: string; email: string; avatar: string };
}) => {
  const color = stringToColor(info.email || "1");

  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{ top: y, left: x, pointerEvents: "none" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="50"
        height="50"
        fill="red"
        stroke="blue"
        stroke-width="1"
        style={{
          fill: color,
          stroke: color,
        }}
      >
        <path d="M3 3l18 9-7 2 4 8-9-9-2 7z" />
      </svg>
      <motion.div
        style={{ top: y, left: x, pointerEvents: "none" }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="px-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"
      >
        {info.name || info.email}
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
