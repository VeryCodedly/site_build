"use client";

import { motion as Motion } from "framer-motion";
import ConnectHero from "../connect/components/ConnectHero";
import RoomGrid from "../connect/components/RoomGrid";
import SearchBar from "../../components/SearchBar";

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

export default function ConnectClient({ rooms, error }: ConnectClientProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-black to-zinc-950 text-white">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/images/bg-1.webp')] bg-cover bg-center opacity-40 pointer-events-none" />
      {/* soft vignette */}
      <div className=" absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black pointer-events-none" />
      {/* subtle glow */}
      <div className="absolute top-[-20rem] left-1/2 -translate-x-1/2 h-[42rem] w-[42rem] rounded-full bg-lime-500/5 blur-[180px] pointer-events-none" />
      <div className="relative z-10">

        <ConnectHero />

        <section id="rooms" className="group/bar max-w-7xl mx-auto pt-4 pb-12">
          <div className="flex flex-row justify-between gap-8 px-6 items-center mb-8">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-10 rounded-xs bg-lime-400 group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400 transition-colors" />
              <Motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl text-white font-bold">
                Rooms
              </Motion.h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
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
            <div className="px-8 sm:px-8">
              <RoomGrid rooms={rooms} />
            </div>
          )}
        </section>

        <SearchBar />

        <section className="relative max-w-4xl mx-auto px-6 py-10 mt-16 mb-22">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400/80" />
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">Rooms are live</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tighter">
              Pick a room. <span className="text-lime-400">Join or start a convo.</span>
            </h2>

            <p className="mt-2 text-sm text-gray-300/60 max-w-lg leading-relaxed tracking-tighter">
              Convos reset daily. Handles refresh.<br />Be nice. Or else...
            </p>

            <div className="mt-6 flex items-center gap-4 text-[11px] text-gray-600 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                no accounts
              </span>
              <span className="w-px h-3 bg-gray-800/60" />
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                no signups
              </span>
              <span className="w-px h-3 bg-gray-800/60" />
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                24hr rooms
              </span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}