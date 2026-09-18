"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const sections = [
    // Tech
    { id: "hardware", short: "HW", full: "Hardware" },
    { id: "ai", short: "AI", full: "AI" },
    { id: "big-deal", short: "BD", full: "Big Deal" },
    { id: "digital-money", short: "DM", full: "Digital Money" },
    { id: "key-players", short: "KP", full: "Key Players" },
    { id: "blockchain-crypto", short: "BC", full: "Blockchain & Crypto" },
    // Code
    { id: "dev-digest", short: "DD", full: "Dev Digest" },
    { id: "upskill", short: "US", full: "Upskill" },
    { id: "beginner-guides", short: "BG", full: "Beginner Guides" },
    { id: "data-defense", short: "DS", full: "Data Defense" },
    { id: "secure-habits", short: "SH", full: "Secure Habits" },
    { id: "privacy-compliance", short: "PC", full: "Privacy & Compliance" },
    // Culture
    { id: "featured", short: "FT", full: "Featured" },
    { id: "right-now", short: "RN", full: "Right Now" },
    { id: "showtime", short: "ST", full: "Showtime" },
    { id: "wired-world", short: "WW", full: "Wired World" },
    { id: "africa-now", short: "AN", full: "Africa Now" },
    { id: "policy-progress", short: "PP", full: "Policy & Progress" },
];

export default function JumpKey() {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const keyRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const offset = 150;
            let bestMatch: string | null = null;
            let bestDistance = Infinity;

            for (const section of sections) {
                const el = document.getElementById(section.id);
                if (!el) continue;

                const rect = el.getBoundingClientRect();

                // If this section spans the offset point, it's the winner
                if (rect.top <= offset && rect.bottom > offset) {
                    bestMatch = section.id;
                    break;
                }

                // Otherwise, track the closest one
                const distance = Math.abs(rect.top - offset);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestMatch = section.id;
                }
            }

            // Always set — this clears the old highlight
            setActiveSection(bestMatch);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on mount in case user already scrolled down
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (keyRef.current && !keyRef.current.contains(e.target as Node)) {
                setOpen(false);
                setHovered(null);
            }
        };
        if (open) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    function jumpTo(id: string) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ block: "start" });
            setOpen(false);
            setHovered(null);
            return;
        }

        const loader = document.querySelector(`[data-loads~="${id}"]`);
        loader?.scrollIntoView({ block: "start" });

        // Poll so section appears
        let attempts = 0;
        const interval = setInterval(() => {
            const loaded = document.getElementById(id);
            if (loaded) {
                loaded.scrollIntoView({ block: "start" });
                clearInterval(interval);
            }
            attempts++;
            if (attempts > 20) clearInterval(interval); // give up after 2s
        }, 100);

        setOpen(false);
        setHovered(null);
    }

    return (
        <div className="fixed top-0 left-0 z-40">
            {/* Toggle */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open section key"
                    className="group flex h-9 w-8 items-center justify-center transition-colors duration-300 rounded-full rotate-90"
                >
                    <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="m-4 text-md text-white/35 transition-colors group-hover:text-pink-400/60 group-active:text-pink-400/60"
                    />
                </button>
            )}

            {/* Expanded */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={keyRef}
                        initial={{ opacity: 0, scale: 0.5, x: -80, y: -80 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, x: -80, y: -80 }}
                        transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
                        style={{ transformOrigin: "top left" }}
                        className="fixed left-8 top-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-xl py-2.5 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                    >
                        {/* Close */}
                        {/* <button
                            onClick={() => setOpen(false)}
                            aria-label="Close section key"
                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-800/60 bg-black text-gray-500 transition-colors hover:text-white/80 active:text-white/80"
                        >
                            <FontAwesomeIcon icon={faXmark} className="text-[10px]" />
                        </button> */}

                        <p className="mb-1 px-1 text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400/80">
                            Jump
                        </p>

                        {/* Keys */}
                        <div className="flex flex-col gap-0.5">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={() => jumpTo(section.id)}
                                    onMouseEnter={() => setHovered(section.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    onTouchStart={() => setHovered(section.id)}
                                    onTouchEnd={() => setHovered(null)}
                                    className="relative flex items-center gap-3 rounded-lg px-1.5 py-1 sm:py-0.5 text-left transition-colors"
                                >
                                    <span className={`font-mono text-xs font-medium transition-colors 
                                    ${hovered === section.id || activeSection === section.id ? "text-pink-400/70" : "text-gray-400"}`}
                                    >
                                        {section.short}
                                    </span>
                                    <span className="h-3 w-px bg-gray-800" />
                                    <span className={`text-xs transition-colors tracking-tighter 
                                            ${hovered === section.id || activeSection === section.id ? "text-white/70" : "text-gray-400/60"}`}
                                    >
                                        {section.full}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}