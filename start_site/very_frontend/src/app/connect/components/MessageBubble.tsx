"use client";

import { useState, useRef } from "react";
import { motion as Motion } from "framer-motion";
import MessageActions from "./MessageActions";
import ReactionBar from "./ReactionBar";
import { Message } from "@/types/connect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faPersonDigging } from "@fortawesome/free-solid-svg-icons";


interface Props {
    messages: Message[];
    onMessageUpdate: (
        id: number,
        data: {
            buried?: boolean;
            off_topic_hidden?: boolean;
            off_topic?: number;
            bury?: number;
            reactions?: Message["reactions"];
        }
    ) => void;
}

export default function MessageBubble({ messages, onMessageUpdate }: Props) {
    const [view, setView] = useState<number[]>([]);
    const lastMessageRef = useRef<HTMLDivElement>(null);

    if (!messages.length) {
        return (
            <section className="my-10 rounded-3xl border border-dashed border-zinc-900 py-6 text-center">
                <p className="text-3xl mb-4 opacity-50">💬</p>
                <h3 className="text-2xl font-semibold text-white opacity-80">
                    You&apos;re early.
                </h3>
                <p className="text-gray-500 mb-1 max-w-md mx-auto leading-7">
                    Start today&apos;s conversation.
                </p>
            </section>
        );
    }

    return (
        <section className="mt-8 space-y- pb-42">
            {messages.map((message, index) => {
                const isViewed = view.includes(message.id);
                const isLast = index === messages.length - 1;
                if (message.buried && !isViewed) {
                    return (
                        <Motion.article
                            key={message.id}
                            ref={isLast ? lastMessageRef : undefined}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * .03, duration: .35 }}
                            className="border-b border-zinc-900 py-"
                        >
                            <button
                                onClick={() => setView(prev => [...prev, message.id])}
                                className="group mt- flex items-center gap-6 text-xs text-zinc-600 transition"
                            >
                                <span className="tracking-tighter">
                                    Buried by the room
                                </span>
                                <span className="group-hover:text-lime-500/80 group-active:text-lime-500/80 underline">
                                    Dig <FontAwesomeIcon icon={faPersonDigging} className="-scale-x-100" />
                                </span>
                            </button>
                        </Motion.article>
                    );
                }
                const isShown = view.includes(message.id);
                if (message.off_topic_hidden && !isShown) {
                    return (
                        <Motion.article
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * .03, duration: .35 }}
                            className="border-b border-zinc-900 py-"
                        >
                            <button
                                onClick={() => setView(prev => [...prev, message.id])}
                                className="group mt- flex items-center gap-6 text-xs text-zinc-600 transition"
                            >
                                <span className="tracking-tighter">
                                    <FontAwesomeIcon icon={faFlag} className="-scale-x-100" />  Off-topic
                                </span>
                                <span className="group-hover:text-lime-500/80 group-active:text-lime-500/80 underline">
                                    View
                                </span>
                            </button>
                        </Motion.article>
                    );
                }

                return (
                    <Motion.article
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .35 }}
                        className="pb-1 pt-0.5"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                            <h6 className={
                                message.buried || message.off_topic_hidden
                                    ? "text-sm text-zinc-600 tracking-tighter"
                                    : "text-sm text-lime-400 tracking-tighter"
                            }>
                                {message.handle}
                            </h6>
                                <ReactionBar
                                    messageId={message.id}
                                    reactions={message.reactions}
                                    onUpdate={(reactions) =>
                                        onMessageUpdate(message.id, { reactions: { ...reactions, mine: reactions.mine ?? null } })
                                    }
                                />
                            </div>
                            <MessageActions
                                messageId={message.id}
                                onUpdate={(data) => onMessageUpdate(message.id, data)
                                }
                            />
                        </div>
                        <div className="flex flex-wrap items-end justify-end gap-0.5">
                            <p className={
                                message.buried || message.off_topic_hidden
                                    ? "mt- mb- leading-5 text-sm italic text-zinc-500 opacity-50 whitespace-pre-wrap break-words flex-1 min-w-[60%]"
                                    : "mt- mb- leading-5 text-sm text-gray-300 whitespace-pre-wrap break-words flex-1 min-w-[60%]"
                            }>
                                {message.content}
                            </p>
                            <div className="flex justify-end">
                                <span className="text-[0.62rem] text-gray-500 tracking-tighter pr-0.5 whitespace-nowrap flex-shrink-0">
                                {new Date(message.created_at).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}
                                </span>
                            </div>
                        </div>
                    </Motion.article>
                );
            })}
        </section>
    );
}
