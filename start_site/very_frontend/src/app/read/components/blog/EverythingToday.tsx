"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { EverythingData } from "@/types/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


interface Props {
    entries: EverythingData[];
}

export default function EverythingToday({ entries }: Props) {
    if (!entries?.length) return null;

    return (
        <section className="relative pt-10 lg:pt-16 pb-4 lg:pb-8 my-24 px-2 sm:px-4">
            <div className="max-w-9xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tighter">
                        Here&apos;s Everything,<span className="text-lime-400"> Today.</span>
                    </h2>
                    <p className="text-sm text-gray-500 tracking-tight">
                        This is where everything in between goes. And then some.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden md:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                    <div className="flex flex-col md:flex-row">
                        {entries.slice(0, 3).map((entry, index) => (
                            <motion.article
                                key={entry.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: index * 0.06 }}
                                className="group relative flex-1 py-1.5 md:py-5 md:px-1 md:first:pl-0 md:last:pr-0"
                            >
                                <span className="hidden md:block absolute -top-[3px] left-5 md:first:left-0 w-1.5 h-1.5 rounded-full bg-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(154,230,0,0.4)]" />

                                <div className="relative h-full flex flex-col rounded-lg border border-zinc-900/80 bg-zinc-900/30 p-4 transition-colors duration-200 hover:border-zinc-800 hover:bg-zinc-900/50">
                                    <span className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {entry.subcategory?.name && (
                                        <p className="text-[10px] mb-4 font-semibold tracking-tighter text-pink-400 uppercase">
                                            {entry.subcategory.name}
                                        </p>
                                    )}

                                    {entry.title && (
                                        <h3 className="text-xs text-white mb-1 leading-snug group-hover:text-lime-400 transition-colors duration-200">
                                            {entry.title}
                                        </h3>
                                    )}
                                     {/* ) : (
                                         <p className="invisible">hold place hehehe</p>
                                     )} */}

                                    {entry.content && (
                                        <p className={`text-xs text-gray-300/90 leading-relaxed mb-2 whitespace-pre-wrap break-words
                                        ${ entry.title ? "line-clamp-3" : " line-clamp-4" }`}>
                                            {entry.content}
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between mt-auto pt-2">
                                        {entry.source && (
                                            <Link
                                                href={entry.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-[10px] text-gray-500/80 hover:text-lime-400 transition-colors duration-200"
                                            >
                                                <span className="uppercase tracking-tighter">Source</span>
                                                <span aria-hidden="true">↗</span>
                                            </Link>
                                        )}
                                        <span className="text-[10px] text-gray-500/80">
                                            {new Date(entry.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="hidden md:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <Link
                        href="/read/everything-today"
                        className="group flex items-center gap-1.5 text-lime-400 hover:text-lime-300 tracking-tighter text-sm font-medium transition-colors whitespace-nowrap"
                    >
                        Read everything
                        <FontAwesomeIcon icon={faArrowRight} className="text-xs group-active:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}