"use client";

import { motion as Motion } from "framer-motion";

import ConnectHero from "../connect/components/ConnectHero";
import RoomGrid from "../connect/components/RoomGrid";

interface Room {
  title: string;
  slug: string;
  icon: string;
  description: string;
  accent: string;
}

interface ConnectClientProps {
  rooms: Room[];
  error: string | null;
}

export default function ConnectClient({
  rooms,
  error,
}: ConnectClientProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-black to-zinc-950 text-white">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/images/bg-1.webp')] bg-cover bg-center opacity-30 pointer-events-none" />
      {/* soft vignette */}
      <div className=" absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black pointer-events-none" />
      {/* subtle glow */}
      <div className="absolute top-[-20rem] left-1/2 -translate-x-1/2 h-[42rem] w-[42rem] rounded-full bg-lime-500/5 blur-[180px] pointer-events-none" />
      <div className="relative z-10">

        <ConnectHero />

        <section
          id="rooms"
          className="max-w-7xl mx-auto px-5 sm:px-8 pt-4 pb-28"
        >
          {/* section heading */}
          <div className="flex flex-row justify-between gap-8 items-center mb-8 group">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-10 rounded-xs bg-lime-400 transition-colors group-hover:bg-pink-400 group-active:bg-pink-400" />
              <Motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl text-white font-bold">
                    Rooms
                </Motion.h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Pick any. We&apos;ll give you a handle for today.
            </p>
          </div>

          {error ? (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-pink-500/50 bg-pink-500/5 px-8 py-12 text-center"
            >
              <p className="text-pink-300 text-lg">
                {error}
              </p>

              <p className="text-gray-500 mt-3">
                Try again in a moment.
              </p>
            </Motion.div>
          ) : (
            <RoomGrid rooms={rooms} />
          )}
        </section>
      </div>
    </section>
  );
}