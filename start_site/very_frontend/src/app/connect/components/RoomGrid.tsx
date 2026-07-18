"use client";

import { motion as Motion } from "framer-motion";

import RoomCard from "./RoomCard";

interface Room {
  title: string;
  slug: string;
  icon: string;
  description: string;
  accent: string;
  voices_today?: number;
}

interface Props {
  rooms: Room[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

// const item = {
//   hidden: { opacity: 0, y: 25 },
//   show: { opacity: 1, y: 0,
//     transition: {
//       duration: .45,
//       ease: "easeOut",
//     },
//   },
// };

export default function RoomGrid({ rooms }: Props) {

  if (!rooms.length) {
    return (
      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-zinc-800 bg-zinc-900/30 py-24 px-8 text-center"
      >
        <h3 className="text-3xl font-bold">
          Looks quiet.
        </h3>
        <p className="mt-5 max-w-md mx-auto text-gray-400 leading-8">
          Tomorrow&apos;s conversations will begin soon.
        </p>
      </Motion.div>
    );
  }

  return (
    <Motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
    >
      {rooms.map((room) => (
        <Motion.div
          key={room.slug}
          className="backdrop-blur-lg"
        //   variants={item}
        >
          <RoomCard room={room} />
        </Motion.div>
      ))}
    </Motion.div>
  );
}