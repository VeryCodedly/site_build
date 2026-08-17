"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Typewriter } from 'react-simple-typewriter';
import { motion } from "framer-motion";


export default function KnowSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  function search(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/know/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={search} className="group max-w-2xl mx-auto mb-24">
      <motion.div className="relative text-center text-sm text-white/80 mb-4"
        onViewportEnter={() => setStartTyping(true)}
      >
        <h1 className="invisible block">
          VeryCodedly Know
        </h1>
        {startTyping && (
          <p className="absolute inset-0 font-medium flex items-center justify-center">
            <Typewriter
              words={['what would you like to know?']}
              loop={1}
              typeSpeed={40}
              delaySpeed={0}
            />
          </p>
        )}
      </motion.div>

      <div className="group relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Let's have it..."
          className="w-full text-sm rounded-3xl bg-white/6 px-8 py-4.5 pr-14 overflow-hidden border-b-2 border-b-white/12 focus:border-b-2
                    resize-none outline-none focus:border-b-lime-400/70 transition leading-5 text-gray-200 placeholder:text-gray-600"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-4 rounded-lg text-sm text-pink-400/60 group-hover:text-pink-400/80 group-active:text-pink-400/80 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon icon={faSearch} />
              <span className="sr-only">Search button</span>
        </button>
      </div>
    </form>
  );
}
