"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";


interface Props {
  transcript: string;
}

export default function Transcript({ transcript }: Props) {
  const [open, setOpen] = useState(false);

  if (!transcript) return null;

  return (
    <section className="max-w-6xl mx-auto mt-12">
      <div className="relative">
        <motion.button
          onClick={() => setOpen(!open)}
          className="w-full relative overflow-hidden rounded-xl transition-all duration-300 group/btn"
          whileTap={{ scale: 0.99 }}
        >
          <div className="relative flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                      <span className="w-3 h-3 bg-lime-400 rounded-full" />
              <h3 className="text-xl sm:text-2xl text-white">Transcript</h3>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300">
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-sm transition-all duration-200 ${open ? 'text-lime-400 rotate-180' : 'text-gray-400'}`}
              />
            </div>
          </div>
        </motion.button>

        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-2 bg-white/4 rounded-2xl px-6 md:px-7 py-5">
                <div className="whitespace-pre-wrap text-sm text-gray-300/80 leading-relaxed">
                  {transcript}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}