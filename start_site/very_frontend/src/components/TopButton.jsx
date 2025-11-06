"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function TopButton() {
  // State to control visibility of the button
    const [showTopBtn, setShowTopBtn] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setShowTopBtn(window.scrollY > 200);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
        {showTopBtn && (
            <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-4 sm:right-5 z-50 bg-lime-400 text-black px-0.5 py-2 rounded-full cursor-pointer border-3 border-gray-500/100 hover:bg-white active:bg-white hover:text-black
                    active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
            aria-label="Scroll to top"
            tabIndex={0}
            >
            <FontAwesomeIcon className="text-sm sm:text-base md:text-lg" icon={faArrowUp} size='lg' />
            </button>
        )}
        </>
    );
}