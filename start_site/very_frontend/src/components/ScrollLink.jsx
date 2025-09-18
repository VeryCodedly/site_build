"use client"; // because it uses useRouter

import { useRouter } from "next/navigation";

export default function ScrollLink({ to, children, className }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(to); // navigate
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
