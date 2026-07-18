"use client";

import { useEffect, useState } from "react";

function getRemaining() {
  const now = new Date();

  const tomorrow = new Date();

  tomorrow.setHours(24, 0, 0, 0);

  const diff = tomorrow.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));

  const minutes = Math.floor(
    (diff % (1000 * 60 * 60)) / (1000 * 60)
  );

  const seconds = Math.floor(
    (diff % (1000 * 60)) / 1000
  );

  return { hours, minutes, seconds };
}

export default function Countdown() {

  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (

    <div className="text-center">
      <p className="text-[10px] uppercase tracking-[.3em] text-gray-600">
        Today ends in
      </p>
      <p className="mt-1 font-semibold text-sm text-gray-300">
        {String(time.hours).padStart(2, "0")}h{" "}
        {String(time.minutes).padStart(2, "0")}m{" "}
        {String(time.seconds).padStart(2, "0")}s
      </p>
    </div>
  );
}