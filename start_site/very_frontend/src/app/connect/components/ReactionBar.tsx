"use client";

import { useState, useRef } from "react";

interface Props {
    messageId: number;
    reactions: {
        mine?: typeof ITEMS[number] | null;
        counts: Record<typeof ITEMS[number], number>;
    };
    onUpdate: (reactions: Props["reactions"]) => void;
}

const ITEMS = [
    "valid",
    "props",
    "yikes",
    "sus",
    "nope",
] as const;

function getCookie(name: string) {
    return document.cookie
        .split("; ")
        .find(cookie => cookie.startsWith(name + "="))
        ?.split("=")[1];
}

export default function ReactionBar({ messageId, reactions, onUpdate }: Props) {
    const [hovered, setHovered] = useState<string | null>(null);
    const [pendingReaction, setPendingReaction] =
        useState<typeof ITEMS[number] | null>(null);
    const sendingRef = useRef(false);

    const API = process.env.NEXT_PUBLIC_API_URL;

    async function react(reaction: typeof ITEMS[number]) {
        if (sendingRef.current) return;

        sendingRef.current = true;
        setPendingReaction(reaction);
        try {
            const res = await fetch(
                `${API}/connect/messages/${messageId}/reaction/`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken") || "",
                    },
                    body: JSON.stringify({
                        reaction,
                    }),
                }
            );

            if (!res.ok) return;

            const data = await res.json();
            onUpdate(data.reactions);

        } catch {
            // lu lu lu
        } finally {
            sendingRef.current = false;
            setPendingReaction(null);
        }
    }

    return (
        <div className="flex items-center gap-1.5 text-[13px] sm:text-xs">
            {ITEMS.map((item) => {
                const selected = pendingReaction !== null
                    ? pendingReaction === item
                    : reactions.mine === item;
                const isHovered = hovered === item;
                const count = reactions.counts[item] || 0;
                const showFull = hovered === item || selected;

                return (
                    <button
                        key={item}
                        onClick={() => react(item)}
                        onMouseEnter={() => setHovered(item)}
                        onMouseLeave={() => setHovered(null)}
                        aria-label="React button"
                        // onTouchStart={() => setHovered(item)}
                        // onTouchEnd={() => setHovered(null)}
                        className={`px-1.5 py-0.5 md:font-medium font-mono rounded transition-all duration-300 ease-out ${selected
                            ? "text-lime-400"
                            : isHovered
                                ? "text-gray-400"
                                : "text-gray-400/70"
                            }`}
                    >
                        <span className="inline-block whitespace-nowrap transition-all duration-300 ease-out">
                            {showFull
                                ? item.charAt(0).toUpperCase() + item.slice(1)
                                : item.charAt(0).toUpperCase()
                            }
                            {count > 0 && (
                                <span className={`ml-0.5 text-[10px] font-medium transition-all duration-300 ease-out 
                                    ${selected ? "text-lime-400/80" : "text-gray-400/70"}`}>
                                    {" "}{count}
                                </span>
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}