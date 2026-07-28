"use client";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  handle: string;
}

export default function IdentityCard({ handle }: Props) {
  return (
    <div className="relative ml-0.5">
      {/* Session line — clean, minimal */}
      {/* <div className="flex items-center gap-3 mb-3 px-1">
        <span className="w-1.5 h-1.5 rounded-full bg-lime-400/70 animate-pulse" />
        <span className="text-[10px] tracking-[0.15em] uppercase text-gray-500">
          session
        </span>
        <span className="text-[10px] text-gray-600">—</span>
        <span className="text-[10px] text-gray-500 font-mono">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div> */}

      <div className="order-t order-gray-800/50 pt-3">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gray-500">
          {/* <span className="text-xs text-gray-500 font-mono select-none">❯</span> */}
          <FontAwesomeIcon icon={faUser} className="text-lime-800" />
          <span className="uppercase">
            your identity
          </span>
          {/* <span className="flex-1 h-px bg-gray-800/50" /> */}
        </div>

        <div className="mt-3">
          <span className="text-2xl font-light text-white/60 mr-1">@</span>
          <span className="text-3xl font-bold tracking-tight text-lime-400">
            {handle}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-400/70 tracking-tight">
          Yours today. Gone tomorrow.
        </p>

        <div className="mt-3 flex items-center gap-4 text-[10px] text-gray-500">
          <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-lime-400/70 animate-pulse" />
            active
          </span>
          <span className="font-extrabold text-gray-500/50">|</span>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
          {/* <span className="text-gray-600/50">|</span> */}
          {/* <span className="text-gray-600/50">#{Math.floor(Math.random() * 1000)}</span> */}
        </div>
      </div>
    </div>
  );
}

//     <section
//     //   initial={{ opacity: 0, y: 20 }}
//     //   animate={{ opacity: 1, y: 0 }}
//     //   transition={{ delay: .2, duration: .5 }}
//       className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl px-7 py-6"
//     >
//       <p className="text-[11px] uppercase tracking-[.35em] text-gray-500">
//         Today&apos;s Identity
//       </p>
//       <h2 className="mt-3 text-3xl font-bold text-lime-400">
//         {handle}
//       </h2>
//       <p className="mt-4 text-sm leading-7 text-gray-400 max-w-lg">
//         Your identity lasts until today&apos;s discussion closes. Tomorrow you&apos;ll receive a new one.
//       </p>
//     </section>