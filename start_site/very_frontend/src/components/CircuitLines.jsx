"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CircuitLines({ cardIds }) {
  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    function updateLines() {
      const container = containerRef.current;
      if (!container) return;

      const newLines = [];
      const nodes = cardIds.map((id) =>
        document.getElementById(`card-${id}`)
      );

      const centers = nodes.map((node) => {
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        return {
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top + rect.height / 2,
        };
      });

      // Example connections: 1->2, 2->3, 3->4
      for (let i = 0; i < centers.length - 1; i++) {
        if (centers[i] && centers[i + 1]) {
          newLines.push([centers[i], centers[i + 1]]);
        }
      }

      setLines(newLines);
    }

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [cardIds]);

  return (
    <svg
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    >
      {lines.map(([start, end], i) => (
        <motion.path
          key={i}
          d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
          stroke="#9AE600"
          strokeWidth="1.5"
          fill="yes"
          strokeDasharray="8"
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </svg>
  );
}
