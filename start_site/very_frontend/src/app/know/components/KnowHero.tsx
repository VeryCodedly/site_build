"use client";

import { useEffect, useRef, useState } from "react";
import KnowSearch from "./KnowSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";


const desktopVideo = "/video/vc-web-intro-ups.mp4";
const mobileVideo = "/video/vc-intro-mob-fx.mp4";


export default function KnowHero() {
  const desktopRef = useRef<HTMLVideoElement>(null);
  const mobileRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;

    const video =
      window.innerWidth < 640 ? mobileRef.current : desktopRef.current;

    video?.play();
  }, [playing]);

  function finished() {
    setPlaying(false);

    desktopRef.current?.load();
    mobileRef.current?.load();
  }

  return (
    <section className="bg-black max-h-screen overflow-hidden">
      <div className="relative h-[67vh] smh-[67vh] mdh-[67vh] lgh-[67vh]">
        <video
          ref={desktopRef}
          className="hidden sm:block md:block lg:block h-full w-full object-contain"
          playsInline
          controls={false}
          onEnded={finished}
          preload="metadata" // Changed to metadata
        >
          <source src={desktopVideo} type="video/mp4" />
        </video>

        <video
          ref={mobileRef}
          className="sm:hidden h-full w-full object-cover"
          playsInline
          controls={false}
          onEnded={finished}
          preload="auto" // Changed to auto because tiny
        >
          <source src={mobileVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

        {!playing && (
          <button
            onClick={() => setPlaying(true)}
            className="absolute bottom-32 sm:bottom-12 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden group flex items-center justify-center transition-opacity duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/6 rounded-full" />

            <span className="pointer-events-none absolute inset-0">
              <span className="absolute inset-0 bg-gradient-to-b from-pink-300/30 to-pink-600/30 rounded-full translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-400 ease-out" />
            </span>

            <FontAwesomeIcon icon={faPlay} size="xl" className="relative z-10 text-white/90 ml-0.5" />
          </button>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-7 sm:px-8 py-2">
        <KnowSearch />
      </div>
    </section>
  );
}