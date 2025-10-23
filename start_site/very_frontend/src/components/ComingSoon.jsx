import Link from "next/link";

export default function ComingSoon({ feature = "This page" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-charcoal to-black text-center px-3">
      {/* Logo / Hero */}
      <h3 className="text-3xl sm:text-6xl font-extrabold text-white drop-shadow-lg">
        🚧 Coming Soon 🚧
      </h3>

      <p className="mt-4 max-w-lg text-base sm:text-lg text-gray-300">
        {feature} isn’t ready yet, but we’re working on it. <br />
         Check back soon!
      </p>

      {/* Animated loader dots */}
      <div className="flex gap-2 my-7">
        <span className="w-3 h-3 bg-lime-400 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        <span className="w-3 h-3 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
      </div>
        <Link
          href="/"
          className="font-bold cursor-pointer bg-lime-400 border-3 border-gray-500/100 px-8 py-1 rounded-full text-black hover:bg-white active:bg-white hover:text-black
        active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#0f0] active:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
        >
          <span className="lg:hidden">Home</span>
          <span className="hidden lg:inline">Go Home</span>
        </Link>
      </div>
  );
}
