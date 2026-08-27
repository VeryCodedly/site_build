"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MediaCard } from "@/types/know";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStopwatch, faPlay } from "@fortawesome/free-solid-svg-icons";

interface Props {
    title: string;
    description: string;
    media: MediaCard[];
}

export default function SeriesClient({ title, description, media }: Props) {
    const latest = media[0];

    return (
        <main className="relative w-full bg-gradient-to-b from-black to-zinc-950/30 text-white in-h-screen py-8 pb-12 px-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="my-2"
            >
                <Link
                    href="/know"
                    className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:scale-60 transition-all duration-300 text-sm sm:text-base"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    <span className="sr-only">Back to Know</span>
                </Link>
            </motion.div>

            <section className="max-w-5xl mx-auto bg-black text-white pb-18">
                <div className="mt-9 mb-6">
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent uppercase">
                        {title.replaceAll("-", " ")}
                    </h1>
                    <p className="italic text-md text-left text-gray-400 mt-6 mb-6 w-fit">
                        {description}
                    </p>
                    <p className="ml-1 text-md text-left text-gray-400 mt-6 mb-12 w-fit border-l-4 border-lime-400 rounded-sm pl-4 sm:pl-4">
                        {media.length} episode{media.length !== 1 && "s"}
                    </p>
                </div>

                {latest && (
                    <div className="mt-6 mb-16 group">
                        <Link href={`/know/${latest.slug}`}>
                            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900">
                                    <Image
                                        src={latest.thumbnail}
                                        alt={latest.title}
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105 overflow-hidden"
                                    />
                                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-gray-400 font-mono">
                                        {latest.media_format?.title}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-lime-400 group-hover:text-white group-active:text-white transition-colors duration-200">
                                        Latest Episode
                                    </span>
                                    <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white group-hover:text-lime-400 group-active:text-lime-400 transition-colors duration-200">
                                        {latest.title}
                                    </h2>
                                    {latest.description && (
                                        <p className="mt-3 text-sm text-gray-400 leading-relaxed line-clamp-3">
                                            {latest.description}
                                        </p>
                                    )}
                                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <FontAwesomeIcon icon={faStopwatch} className="text-gray-600" />
                                            {latest.duration}
                                        </span>
                                        {latest.topic && (
                                            <>
                                                <span className="text-gray-700">|</span>
                                                <span className="text-gray-500">
                                                    {typeof latest.topic === 'object' ? latest.topic.title : latest.topic}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="group/bar px-1 mt-18">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400" />
                        <h3 className="text-xl sm:text-2xl font-semibold text-white">All Episodes</h3>
                    </div>

                    {!media.length ? (
                        <section className="mt-10 rounded-3xl border border-dashed border-zinc-900 py-8 text-center">
                            <p className="text-3xl text-slate-400 mb-4 opacity-50"><FontAwesomeIcon icon={faPlay} /></p>
                            <h3 className="text-2xl font-semibold text-white opacity-80">
                                You&apos;re early.
                            </h3>
                            <p className="text-gray-500 my-2 max-w-md mx-auto leading-7 tracking-tight">
                                Nothing here for now, check back soon!
                            </p>
                        </section>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                            {media.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`/know/${item.slug}`}
                                    className="group"
                                >
                                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900">
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        {item.duration && (
                                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] text-gray-400 font-mono">
                                                {item.duration}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="mt-2 text-sm font-medium text-gray-200 group-hover:text-lime-400 group-active:text-lime-300 transition-colors duration-200 line-clamp-2">
                                        {item.title}
                                    </h4>

                                    <div className="mt-0.5 flex items-center gap-2 text-[10px]">
                                        {item.topic && (
                                            <span className="text-gray-400/60">
                                                {typeof item.topic === 'object' ? item.topic.title : item.topic}
                                            </span>
                                        )}
                                        {item.media_format && (
                                            <>
                                                <span className="text-gray-700">•</span>
                                                <span className="text-gray-400/45">
                                                    {typeof item.media_format === 'object' ? item.media_format.title : item.media_format}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
