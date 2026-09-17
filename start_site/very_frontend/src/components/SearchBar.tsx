"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faNewspaper, faFolderOpen, faFolderBlank, faGraduationCap, faBookOpen, faMagnifyingGlassMinus, faCartShopping, faCirclePlay, faPlay, faComments, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showTopBtn, setShowTopBtn] = useState(false);

    // Close on Esc or click outside
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
        const handleClickOutside = (e: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.addEventListener("mousedown", handleClickOutside);
            inputRef.current?.focus();
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Live search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        const API_URL = process.env.NEXT_PUBLIC_API_URL

        const timeout = setTimeout(() => {
            setLoading(true);
            fetch(`${API_URL}/search/?q=${encodeURIComponent(query)}`)
                .then(r => r.json())
                .then(data => {
                    setResults(data.results || data); // adjust for serializer
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }, 300);

        return () => clearTimeout(timeout);
    }, [query]);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "faNewspaper":
                return faNewspaper;
            case "faFolderBlank":
                return faFolderBlank;
            case "faFolderOpen":
                return faFolderOpen;
            case "faGraduationCap":
                return faGraduationCap;
            case "faBookOpen":
                return faBookOpen;
            case "faCartShopping":
                return faCartShopping;
            case "faCirclePlay":
                return faCirclePlay;
            case "faPlay":
                return faPlay;
            case "faLightbulb":
                return faLightbulb;
            case "faComments":
                return faComments;
            default:
                return faSearch;
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // cleanup on unmount 
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => setShowTopBtn(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            {/* Trigger */}
            {showTopBtn && (
            <button
                onClick={() => setIsOpen(true)}
                aria-label="Toggle Search"
                className="cursor-pointer fixed top-1/2 -translate-y-1/2 right-0 z-50 px-1 py-1 bg-transparent rounded-l-2xl transition-all hover:scale-110
                            shadow-[0_0_5px_3px_rgba(55,55,55,0.35)] outline-none"
            >
                <FontAwesomeIcon icon={faSearch} className="w-6 h-6 text-gray-300/90 hover:text-white" size="sm" />
            </button>)}

            {/* Overlay + Search Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/65 backdrop-blur-md z-70"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.25, ease: [0.34, 1.2, 0.64, 1] }}
                            className="fixed top-0 left-0 right-0 z-70 flex justify-center pt-24 sm:pt-20 px-4">
                            <div
                                ref={inputRef}
                                className="group w-full max-w-2xl relative"
                            >
                                {/* Glassmorphic Input */}
                                <div className="relative sm:w-full w-[94%] max-w-2xl mx-auto">
                                    {/* <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" /> */}
                                    <input
                                        aria-label="Search"
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search VeryCodedly..."
                                        className="w-full text-sm rounded-3xl bg-white/8 backdrop-blur-xl px-8 py-5 pr-14 overflow-hidden border-b-2 border-b-white/12 focus:border-b-2
                                                    resize-none outline-none focus:border-b-lime-400/70 transition leading-5 text-gray-200 placeholder:text-gray-400"
                                    />
                                    <button
                                        aria-label="Close Search"
                                        onClick={() => { setIsOpen(false); setQuery(""); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-4 rounded-lg text-sm text-pink-400/60 group-hover:text-pink-400/80 group-active:text-pink-400/80 transition-all duration-200"
                                    >
                                        <FontAwesomeIcon icon={faMagnifyingGlassMinus} className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Live Results */}
                                {query && (
                                    <div className="mt-4 bg-white/7 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl overflow-hidden
                                                    w-[94%] sm:w-full max-w-2xl mx-auto">
                                        <div
                                            className="overflow-y-auto max-h-[68vh] sm:max-h-[58vh] lg:max-h-[60vh] ax-h-150 m:max-h-80 custom-scrollbar">
                                            {loading && (
                                                <div className="p-3 text-center text-white/70">Searching...</div>
                                            )}
                                            {!loading && results.length === 0 && query && (
                                                <div className="p-3 text-center text-white/70">No hits yet. Try something else?</div>
                                            )}
                                            {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            {!loading && results.map((item: any, i: number) => (
                                                <Link
                                                    aria-label="Search result link"
                                                    key={i}
                                                    href={item.url}
                                                    onClick={() => { setIsOpen(false); setQuery(""); }}
                                                    className="px-5 py-2 hover:bg-white/8 active:bg-white/8 transition-all border-b border-white/10 last:border-0 flex items-center gap-4"
                                                >
                                                    <span className="text-xl sm:text-2xl text-pink-200/95"><FontAwesomeIcon icon={getIcon(item.icon)} /></span>
                                                    <div>
                                                        <div className="text-white/80 text-base font-medium">{item.title}</div>
                                                        {item.subtitle && (
                                                            <div className="text-white/50 text-sm">{item.subtitle}</div>
                                                        )}
                                                        <div className="text-xs text-white/40">{item.type}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}