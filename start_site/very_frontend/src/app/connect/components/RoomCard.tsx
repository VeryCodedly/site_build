"use client";

import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import * as Icons from "@fortawesome/free-solid-svg-icons";
import { faArrowRight, faCodeBranch, faUserShield, faCogs, faMicrochip, faGlobeAfrica, faFire, faMoneyBillTrendUp, faComments, faUsers, faTerminal } from "@fortawesome/free-solid-svg-icons";

interface Room {
  title: string;
  slug: string;
  icon: string;
  description: string;
  accent: string;
  participants?: number;
}

interface Props {
  room: Room;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, any> = {
  "faCogs": faCogs,
  "faGlobeAfrica": faGlobeAfrica,
  "faMoneyBillTrendUp": faMoneyBillTrendUp,
  "faUserShield": faUserShield,
  "faComments": faComments,
  "faUsers": faUsers,
  "faFire": faFire,
  "faMicrochip": faMicrochip,
  "faCodeBranch": faCodeBranch,
  "faTerminal": faTerminal,
};

export default function RoomCard({ room }: Props) {
  const Icon = iconMap[room.icon] ?? faComments;

  return (
    <Link href={`/connect/${room.slug}`}>
      <Motion.article
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="group overflow-hidden relative rounded-2xl border border-gray-800/60 bg-white/[0.02] hover:bg-white/[0.03] hover:border-zinc-600/60 p-6 transition-all duration-300"
      >
        {/* Accent bar */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon watermark */}
          <div className="absolute -right-2 -top-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <FontAwesomeIcon icon={Icon} className="text-[6rem] text-lime-400/5" />
          </div>

        {/* Accent dot - replacing the bar */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400/60 group-hover:bg-lime-400 transition-colors duration-200" />
          <span className="text-[10px] tracking-[0.15em] uppercase text-gray-500">Room</span>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-white group-hover:text-lime-400 transition-colors duration-200">
          {room.title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-400/80 leading-relaxed">
          {room.description}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-800/50 group-hover:border-gray-700/50 transition-colors">
          <span className="text-xs text-gray-500">
            {room.participants ?? 0} {room.participants === 1 ? 'voice' : 'voices'}
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-lime-400 group-hover:text-white transition-colors duration-200">
            Enter
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-[10px] group-active:translate-x-1 transition-transform duration-200"
            />
          </span>
        </div>
      </Motion.article>
    </Link>
  );
}