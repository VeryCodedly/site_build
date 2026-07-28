"use client";

import { useState, useRef  } from "react";
import { Message } from "@/types/connect";


interface Props {
    slug: string;
    onMessage: (message: Message) => void;
    typing: string[];
}

const MAX_LENGTH = 1000;

function getCookie(name: string) {
    return document.cookie
        .split("; ")
        .find(cookie => cookie.startsWith(name + "="))
        ?.split("=")[1];
}

export default function Composer({ slug, onMessage, typing = [] }: Props) {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [content, setContent] = useState("");
    const [sending, setSending] = useState(false);
    const remaining = MAX_LENGTH - content.length;
    // const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastTyping = useRef(0);


    async function sendTyping() {
        const now = Date.now();
        if (now - lastTyping.current < 2000)
            return;
        lastTyping.current = now;
        
        try {
            await fetch(
                `${API}/connect/rooms/${slug}/typing/`,
                {
                    method: "POST",
                    credentials: "include",
                    cache: "no-store",
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken") || "",
                    },
                }
            );
        } catch {
            // console.log(err);
        }
        // console.log("typing sent");
    }

    async function submit() {
        const text = content.trim();
        if (!text || sending) return;
        setSending(true);

        try {
            const res = await fetch(
                `${API}/connect/rooms/${slug}/messages/`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken") || "",
                    },
                    body: JSON.stringify({
                        content: text,
                    }),
                }
            );
            if (!res.ok) {
                throw new Error();
            }
            const message = await res.json();
            setContent("");
            onMessage(message);
        }
        catch {
            // console.error("Couldn't send message");
        }
        finally {
            lastTyping.current = 0;
            setSending(false);
        }
    }

    return (
        <section className="fixed bottom-0 left-0 right-0 z-20 bg-black/75 backdrop-blur-lg px-6 sm:px-10 mt-4 rounded-t-md">
            {/* <label className="text-xs uppercase tracking-[.35em] text-gray-500 px-3">
                Join the convo
            </label> */}
            <div className="max-w-4xl mx-auto">
            <p className={`text-[10px] py-1.5 pl-5 text-zinc-500 italic transition-opacity duration-300 ${typing.length > 0 ? 'opacity-100' : 'opacity-0'
                }`}>
                {typing.length === 0
                    ? '\u2009' // thin space for  height
                    : typing.length === 1
                        ? `${typing[0]} is cooking...`
                        : typing.length === 2
                            ? `${typing[0]} and ${typing[1]} are cooking...`
                            : `${typing.length} people are cooking...`
                }
            </p>
            <textarea
                rows={1}
                value={content}
                maxLength={MAX_LENGTH}
                onChange={(e) => {
                    // console.log("changed");
                    setContent(e.target.value);
                    sendTyping();
                    // if (typingTimeout.current) {
                    //     clearTimeout(typingTimeout.current);
                    // }
                    // typingTimeout.current = setTimeout(sendTyping, 300);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        submit();
                    }
                }}
                placeholder="Let's have it..."
                className="w-full text-sm rounded-3xl bg-white/6 px-6 py-5 overflow-hidden border-b border-b-white/12 focus:border-b
                            resize-none outline-none focus:border-b-lime-400/70 transition leading-5 text-gray-200 placeholder:text-gray-600"
            />
            <div className="flex items-center justify-between mt-3 pb-5 sm:pb-5 px-6.5 sm:px-6">
                {/* <p className="text-xs text-gray-600"> */}
                <span className={`text-xs ${remaining < 100 ? "text-pink-800/80" : "text-gray-600"}`}>
                    {remaining}
                </span>
                {/* </p> */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={submit}
                        disabled={sending || !content.trim()}
                        className="font-semibold border-3 border-gray-500 bg-transparent text-white text-sm px-6 py-1 rounded-full hover:bg-white active:bg-white hover:text-black active:text-black shadow-[0_4px_0_0_#78ff02] hover:shadow-[0_2px_0_0_#00ff00] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
                    >
                        {sending ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
            </div>
        </section>
    );
}