// components/ConfettiCelebration.tsx
'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface ConfettiCelebrationProps {
    trigger: boolean;
    onDone?: () => void;
}

export default function ConfettiCelebration({ trigger, onDone }: ConfettiCelebrationProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (trigger) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                onDone?.();
            }, 6000); // 5 seconds of confetti
            return () => clearTimeout(timer);
        }
    }, [trigger, onDone]);

    if (!show) return null;

    return (
        <Confetti
            width={typeof window !== 'undefined' ? window.innerWidth : 800}
            height={typeof window !== 'undefined' ? window.innerHeight : 700}
            recycle={false}
            numberOfPieces={350}
            gravity={0.4}
            initialVelocityY={14}
            wind={0.02}
            opacity={1}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
            }}
            colors={[
                '#A3FF82', // Lime Green
                '#39FF14', // Electric Lime
                '#00FFAA', // Cyan
                '#FFD700', // Gold
                '#FF69B4', // Hot Pink
                '#FF4500', // Orange Red
                '#9400D3', // Violet
                '#00CED1', // Dark Turquoise
                '#FF1493', // Deep Pink
                '#32CD32', // LimeGreen
                '#FFA500', // Orange
                '#FF6347', // Tomato
                '#7B68EE', // Medium Slate Blue
                '#00FF7F', // Spring Green
                '#FF4500', // Red Orange
            ]}
        />
    );
}