"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import IdentityCard from "../components/IdentityCard";
import MessageBubble from "../components/MessageBubble";
import Composer from "../components/Composer";
import type { RoomDetail, Message } from "@/types/connect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";


interface Props {
    slug: string;
    typing: string[];
}

export default function RoomClient({ slug }: Props) {
    const API = process.env.NEXT_PUBLIC_API_URL;

    const [room, setRoom] = useState<RoomDetail | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<string | null>(null);

    const latestUpdate = useRef<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [newMessages, setNewMessages] = useState(0);
    const [isNearBottom, setIsNearBottom] = useState(true);

    const [typing, setTyping] = useState<string[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isNearBottomRef = useRef(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(
                    `${API}/connect/rooms/${slug}/`,
                    {
                        credentials: "include",
                    }
                );

                if (!res.ok)
                    throw new Error();

                const data: RoomDetail = await res.json();
                // setTyping(data.typing);

                setRoom(data);

                if (data.messages.length) {
                    latestUpdate.current =
                        data.messages[data.messages.length - 1].updated_at;
                    setMessages(data.messages);
                }
            } catch {
                setError("Couldn't load room.");
            } finally {
                // setLoading(false);
            }
        }
        load();
    }, [slug, API]);

    useEffect(() => {
        if (!room) return;

        async function poll() {
            // if (document.hidden) return;

            try {
                let url = `${API}/connect/rooms/${slug}/updates/`;
                if (latestUpdate.current) {
                    url += `?after=${encodeURIComponent(latestUpdate.current)}`;
                }
                const res = await fetch(url, {
                    credentials: "include",
                });
                if (!res.ok) return;

                const data = await res.json();
                // setTyping(data.typing);
                setTyping(prev => {
                    if (
                        prev.length === data.typing.length &&
                        prev.every((x, i) => x === data.typing[i])
                    ) {
                        return prev;
                    }
                    return data.typing;
                });

                if (!data.messages.length) return;

                latestUpdate.current =
                    data.messages[data.messages.length - 1].updated_at;

                setMessages(prev => {
                    const existing = new Set(prev.map(m => m.id));
                    const incoming = data.messages.filter(
                        (m: Message) => !existing.has(m.id)
                    );
                    if (!incoming.length) return prev;
                    if (!isNearBottomRef.current) {
                        setNewMessages(n => n + incoming.length);
                    }
                    return [...prev, ...incoming];
                });
            } catch {
                // Ignore temporary polling errors
            }
        }

        function startPolling() {
            if (intervalRef.current) return;

            poll();

            intervalRef.current = setInterval(poll, 3000);
        }

        function stopPolling() {
            if (!intervalRef.current) return;

            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        function handleVisibility() {
            if (document.hidden) {
                stopPolling();
            } else {
                startPolling();
            }
        }

        handleVisibility();

        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            stopPolling();
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [room, slug, API]);

    useEffect(() => {
        function checkPosition() {
            const distance =
                document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
            setIsNearBottom(distance < 250);
        }
        checkPosition();
        window.addEventListener("scroll", checkPosition);
        return () =>
            window.removeEventListener("scroll", checkPosition);
    }, []);

    useEffect(() => {
        isNearBottomRef.current = isNearBottom;
    }, [isNearBottom]);

    useEffect(() => {
        if (isNearBottom) {
            setNewMessages(0);
        }
    }, [isNearBottom]);

    if (error || !room)
        return (
            <section className="min-h-screen flex items-center justify-center">
                {error}
            </section>
        );

    return (
        <section className="relative min-h-dvh bg-black text-white">
            <div className="flex justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto mt-8 mb-5 ml-5"
                >
                    <Link
                        href="/connect"
                        aria-label="Back to Connect"
                        className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:scale-60 transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                        <span className="sr-only">Back to Connect</span>
                    </Link>
                </motion.div>
                {/* <span className="w-1 h-6 rounded-sm bg-lime-400/40 flex-shrink-0" /> */}
                <div className="flex items-center mt-2 mr-5 lg:mr-18">
                    <p className="bg-pink-400/10 text-pink-400/70 px-3 py-1 rounded-full text-xs tracking-tighter">
                        {room.room.title}
                    </p>
                    {/* <p className="text-xs text-gray-500/60 tracking-tight">
                            {room.room.description}
                        </p> */}
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-6">

                <IdentityCard handle={room.handle} />

                {newMessages > 0 && (
                    <button
                        onClick={() => {
                            bottomRef.current?.scrollIntoView();
                            setNewMessages(0);
                        }}
                        className="group fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 items-center rounded-full border-3 px-5 py-2 tracking-tighter text-xs text-white/70 backdrop-blur-2xl bg-white/10 border-pink-400/40 hover:text-white active:text-white active:bg-white/10 active:border-pink-400/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.08)] active:shadow-[0_0_30px_rgba(236,72,153,0.08)] active:scale-95 transition-all duration-300 overflow-hidden"
                    >
                        <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-500/5 via-transparent to-pink-500/5" />
                        {newMessages > 9 ? "9+ new" : `${newMessages} new`}
                        <FontAwesomeIcon icon={faArrowDown} className="group-active:text-pink-400/70 font-light" size="sm" />
                    </button>
                )}

                <MessageBubble
                    messages={messages}
                    onMessageUpdate={(id, data) =>
                        setMessages(prev =>
                            prev.map(message =>
                                message.id === id
                                    ? {
                                        ...message,
                                        ...data,
                                    }
                                    : message
                            )
                        )
                    }
                />
                <div ref={bottomRef} />
                <Composer
                    slug={room.room.slug}
                    typing={typing}
                    onMessage={(message) => {
                        setMessages(prev => [...prev, message])
                        requestAnimationFrame(() => {
                            bottomRef.current?.scrollIntoView();
                        });
                    }}
                />
            </div>
        </section>
    );
}
