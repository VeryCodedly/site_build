"use client";

import { useState } from "react";
import { EverythingData, EverythingResponse } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { motion as Motion } from "framer-motion";


interface Props {
    initialData: EverythingResponse;
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}

function getDateKey(dateString: string) {
    return dateString.slice(0, 10);
}

function groupEntries(entries: EverythingData[]) {
    const groups: { date: string; entries: EverythingData[] }[] = [];
    entries.forEach((entry) => {
        const date = getDateKey(entry.created_at);
        let group = groups.find((item) => item.date === date);
        if (!group) {
            group = { date, entries: [] };
            groups.push(group);
        }
        group.entries.push(entry);
    });
    return groups;
}

export default function EverythingTodayFeed({ initialData }: Props) {
    const [entries, setEntries] = useState<EverythingData[]>(
        initialData.results || []
    );
    const [nextUrl, setNextUrl] = useState<string | null>(initialData.next);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function loadMore() {
        if (!nextUrl || loading) return;
        setLoading(true);
        setError(false);

        try {
            const response = await fetch(nextUrl);
            if (!response.ok) throw new Error("Failed to load more entries");

            const data: EverythingResponse = await response.json();

            setEntries((current) => {
                const existingIds = new Set(current.map((entry) => entry.id));
                const newEntries = data.results.filter(
                    (entry) => !existingIds.has(entry.id)
                );
                return [...current, ...newEntries];
            });

            setNextUrl(data.next);
        } catch (err) {
            console.error("Everything, Today pagination error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const groupedEntries = groupEntries(entries);

    return (
        <main className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8">

            <header className="mb-10">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-5">
                    <span className="text-gray-600">VeryCodedly</span>
                    <span className="text-zinc-600 mx-1.5">/</span>
                    <span className="text-gray-600">Read</span>
                    <span className="text-zinc-600 mx-1.5">/</span>
                    <span className="text-lime-400/80">ET</span>
                </p>

                <div className="flex items-end justify-between gap-6">
                    <div className="min-w-0">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white">
                            Here&apos;s Everything,
                            <Motion.span
                                className="mx-1"
                                initial={{ color: "#ffffff" }}
                                animate={{ color: "#9AE600" }}
                                transition={{ delay: 0.3, duration: 1 }}
                            >
                                Today.{" "}
                            </Motion.span>
                        </h1>
                        <p className="text-sm text-zinc-500 mt-4 leading-relaxed tracking-tighter">
                            Tech news and updates, unsolicited thoughts, and everything else that didn&apos;t get a full post.
                        </p>
                    </div>

                    <div className="w-24 shrink-0 sm:w-32 lg:w-40">
                        <Image
                            src="/images/SHELLy-smile.png"
                            alt="SHELLy"
                            width={240}
                            height={240}
                            priority
                            className="h-auto w-full object-contain"
                        />
                    </div>
                </div>
            </header>

            {/* Feed */}
            {entries.length > 0 ? (
                <div className="space-y-10">
                    {groupedEntries.map((group) => (
                        <section key={group.date}>
                            <div className="flex items-center gap-2.5 mb-4">
                                {/* <span className="w-1.5 h-1.5 rounded-full bg-white" /> */}
                                <p className="border-l-3 border-lime-400 pl-3 rounded-sm text-xs tracking-tighter text-white uppercase">
                                    {formatDate(group.date)}
                                </p>
                                <span className="text-[11px] font-medium text-gray-500/80">
                                    · {group.entries.length}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {group.entries.map((entry) => (
                                    <article
                                        key={entry.id}
                                        className="group relative rounded-lg border border-zinc-900/80 bg-zinc-900/30 p-3 transition-colors duration-200 hover:border-zinc-800 hover:bg-zinc-900/50"
                                    >
                                        <span className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {/* Data */}
                                        <div className="flex items-center justify-between gap-2 mb-1.5">
                                            {entry.subcategory?.name ? (
                                                <span className="text-[9px] mb-1 font-semibold tracking-tighter text-pink-400/90 uppercase">
                                                    {entry.subcategory.name}
                                                </span>
                                            ) : (
                                                <span />
                                            )}
                                            <span className="text-[9px] text-gray-600 shrink-0">
                                                {new Date(entry.created_at).toLocaleTimeString(
                                                    "en", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }
                                                )}
                                            </span>
                                        </div>

                                        {entry.title && (
                                            <h3 className="text-xs leading-snug text-white mb-1 group-hover:text-lime-400 transition-colors duration-200">
                                                {entry.title}
                                            </h3>
                                        )}

                                        {entry.content && (
                                            <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap break-words">
                                                {entry.content}
                                            </p>
                                        )}

                                        {entry.source && (
                                            <Link
                                                href={entry.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-0.5 text-[9px] text-gray-600 hover:text-lime-400 transition-colors duration-200"
                                            >
                                                <span className="uppercase tracking-tighter">Source</span>
                                                <span aria-hidden="true">↗</span>
                                            </Link>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-zinc-800/60 py-14 text-center">
                    <p className="mb-1.5 text-sm font-semibold text-white/80">Nothing here yet.</p>
                    <p className="text-xs text-zinc-500">Check back soon. We tend to find things.</p>
                </div>
            )}

            {/* More */}
            {nextUrl && (
                <div className="mt-12 flex flex-col items-center">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="font-semibold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white text-sm px-7 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
                                active:text-black shadow-[0_4px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fe379a] active:shadow-[0_2px_0_0_#fe379a] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {loading ? "Loading..." : "Load more"}
                    </button>

                    {error && (
                        <div className="mt-3 text-center">
                            <p className="mb-1.5 text-[11px] text-red-400/80">
                                Couldn&apos;t load more entries.
                            </p>
                            <button
                                onClick={loadMore}
                                className="text-[11px] text-lime-400 hover:text-white transition-colors"
                            >
                                Try again
                            </button>
                        </div>
                    )}
                </div>
            )}

            {!nextUrl && entries.length > 0 && (
                <div className="mt-24 flex items-center gap-3">
                    <span className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800/40 to-transparent" />
                    <p className="text-[10px] text-zinc-600 tracking-wider uppercase">
                        That&apos;s everything, more tomorrow.
                    </p>
                    <span className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-800/40 to-transparent" />
                </div>
            )}
        </main>
    );
}