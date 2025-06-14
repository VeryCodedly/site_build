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
            className="fixed bottom-6 right-6 z-50 bg-lime-400 text-black px-2 py-2 rounded-full hover:bg-white cursor-pointer border-3 border-gray-500/100 hover:text-black hover:translate-y-1 shadow-[0_4px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200"
            >
            <FontAwesomeIcon icon={faArrowUp} size='lg' />
            </button>
        )}
        </>
    );
}