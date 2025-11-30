"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faNewspaper, faFolderOpen, faFolderBlank, faGraduationCap, faBookOpen, faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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
        const API_URL = process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_API_URL
            : "http://localhost:8000/api";

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

    return (
        <>
            {/* Trigger */}
            <button
                onClick={() => setIsOpen(true)}
                aria-label="Toggle Search"
                className="cursor-pointer fixed top-1/2 -translate-y-1/2 right-0 z-50 px-1 py-1 bg-transparent backdrop-blur-md rounded-l-2xl transition-all hover:scale-110
                            shadow-[0_0_5px_3px_rgba(55,55,55,0.4)] hover:shadow-[0_0_8px_5px_rgba(255,255,255,0.20)]"
            >
                <FontAwesomeIcon icon={faSearch} className="w-6 h-8 text-gray-300/90 hover:text-white" />
            </button>

            {/* Overlay + Search Panel */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-70" />
                    <div className="fixed top-0 left-0 right-0 z-70 flex justify-center pt-24 px-4">
                        <div
                            ref={inputRef}
                            className="w-full max-w-2xl relative"
                        >
                            {/* Glassmorphic Input */}
                            <div className="relative sm:w-full w-[94%] max-w-2xl mx-auto">
                                <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                                <input
                                    aria-label="Search"
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full pl-8 pr-16 py-4 bg-black/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 text-lg focus:outline-none focus:ring-offset focus:ring-2 focus:ring-offset-1 focus:ring-pink-300/50 transition-all shadow-2xl"
                                />
                                <button
                                    aria-label="Search icon"
                                    onClick={() => { setIsOpen(false); setQuery(""); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Live Results */}
                            {query && (
                                <div 
                                className="mt-4 bg-black/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden
                                w-[94%] sm:w-full max-w-2xl mx-auto">
                                    <div 
                                        className="overflow-y-auto max-h-[70vh] sm:max-h-[60vh] ax-h-150 m:max-h-80 custom-scrollbar">
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
                                                <span className="text-xl sm:text-2xl text-pink-200"><FontAwesomeIcon icon={getIcon(item.icon)} /></span>
                                                <div>
                                                    <div className="text-white text-base font-medium">{item.title}</div>
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
                    </div>
                </>
            )}
        </>
    );
}