import { redirect } from "next/navigation";
import Link from "next/link"

export default function Know() {
  redirect("https://www.youtube.com/channel/UCNDy9Q0qPHcY-TT2BD7B1kw");
  
  // fallback UI 
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <p>
        Taking you to Youtube...{" "}
        <Link
          href="https://www.youtube.com/channel/UCNDy9Q0qPHcY-TT2BD7B1kw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime-400 underline"
        >
          Click here if nothing happens
        </Link>
      </p>
    </div>
  );
}