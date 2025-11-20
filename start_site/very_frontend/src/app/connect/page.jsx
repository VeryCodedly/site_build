import { redirect } from "next/navigation";
import Link from "next/link"

export default function Connect() {
  redirect("https://discord.gg/53wVsqEcbE");
  
  // fallback UI 
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <p>
        Taking you to Discord...{" "}
        <Link
          href="https://discord.gg/53wVsqEcbE"
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