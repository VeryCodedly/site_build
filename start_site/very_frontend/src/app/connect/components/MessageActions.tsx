"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faFlag, faPersonDigging } from "@fortawesome/free-solid-svg-icons";

interface Props {
    messageId: number;
    onUpdate: (data: {
        buried: boolean;
        off_topic_hidden: boolean;
        off_topic: number;
        bury: number;
    }) => void;
}

function getCookie(name: string) {
    return document.cookie
        .split("; ")
        .find(cookie => cookie.startsWith(name + "="))
        ?.split("=")[1];
}

export default function MessageActions({ messageId, onUpdate }: Props) {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [expanded, setExpanded] = useState(false);
    const [confirm, setConfirm] = useState<"off_topic" | "bury" | null>(null);
    const [thanks, setThanks] = useState(false);
    const menuRef = useRef(null);

    const close = () => {
        setExpanded(false);
        setConfirm(null);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !(menuRef.current as HTMLElement).contains(e.target as Node)) {
                close();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (expanded || confirm || thanks) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [expanded, confirm, thanks]);

    async function submit(
        action: "off_topic" | "bury"
    ) {
        const res = await fetch(
            `${API}/connect/messages/${messageId}/action/`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken") || "",
                },
                body: JSON.stringify({
                    action,
                }),
            }
        );

        if (!res.ok)
            return;

        const data = await res.json();

        onUpdate(data);

        setConfirm(null);

        setThanks(true);

        setTimeout(() => {
            setThanks(false);
            setExpanded(false);
        }, 2000);
    }

    if (thanks) {
        return (
            <>
                <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={close} />
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div ref={menuRef} className="flex flex-col items-center justify-center gap-2 mt-2 text-base sm:text-lg text-gray-400/90 racking-tighter">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-lime-400" />
                        Thank you. <p>You helped moderate today&apos;s room.</p>
                    </div>
                </div>
            </>
        );
    }
    if (confirm) {
        return (
            <>
                <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={close} />
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div ref={menuRef} className="flex flex-col items-center gap-6 mt-2">
                        <p className="text-base sm:text-lg text-gray-300/90">
                            {confirm === "bury"
                                ? "Bury this comment?"
                                : "Is this off topic?"}
                        </p>
                        <div className="flex gap-5 justify-center text-base sm:text-lg">
                            <button
                                onClick={() => submit(confirm)}
                                className="hover:text-pink-800/90 active:text-pink-800/90 text-gray-300/90 transition tracking-tight"
                            >
                                Yes
                            </button>
                            <p className="text-white/45">|</p>
                            <button
                                // onClick={() => setConfirm(null)}
                                onClick={close}
                                className="text-gray-300/80 hover:text-white active:text-white transition tracking-tight"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (expanded) {
        return (
            <>
                <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={close} />
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="mt-2 flex text-base sm:text-lg group">
                        <div ref={menuRef} className="flex gap-6">
                            <button
                                onClick={() => setConfirm("off_topic")}
                                className="flex items-center gap-6 text-gray-400/90 hover:text-pink-800/80 transition tracking-tight"
                            >
                                <FontAwesomeIcon icon={faFlag} />
                                <p>Off topic</p>
                            </button>
                            <p className="text-white/45">|</p>
                            <button
                                onClick={() => setConfirm("bury")}
                                className="flex items-center gap-6 text-gray-400/90 hover:text-pink-800/80 transition tracking-tight"
                            >
                                <FontAwesomeIcon icon={faPersonDigging} />
                                <p>Bury</p>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <button
            onClick={() => setExpanded(true)}
            className="mr-[0.075rem] font-medium text-gray-400/90 hover:text-gray-200 active:text-lime-400 transition"
        >
            ···
        </button>
    );
}