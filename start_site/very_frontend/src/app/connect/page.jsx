import Link from "next/link";

export default function ConnectPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.08),_transparent_55%)]" />

      <section className="relative z-10 max-w-3xl my-auto mx-auto px-6 py-40 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
          Community
        </p>

        <h1 className="text-4xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
          VeryCodedly on{" "}
          <span className="text-indigo-500">Discord</span>{" "}
          
        </h1>

        <p className="text-base text-gray-300 max-w-2xl px-2 mx-auto leading-relaxed">
          Ask questions, get feedback, share progress and learn alongside others,
          with real-time updates on tools, trends, and tech.
        </p>

        <div className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="https://discord.gg/53wVsqEcbE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:font-semibold order-2 bg-transparent cursor-pointer border-3 border-gray-500/100 px-10 py-1 rounded-full text-white hover:bg-white active:bg-white hover:text-black
            active:text-black shadow-[0_4px_0_0_#4F46E5] hover:shadow-[0_2px_0_0_#4F46E5] active:shadow-[0_2px_0_0_#4F46E5] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
          >
            Discord
          </Link>

          <span className="text-sm text-gray-500 order-1">
            No pressure. Lurk or participate.
          </span>
        </div>

        {/* <div className="mt-20">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-lime-400 transition"
          >
            ← Back to VeryCodedly
          </Link>
        </div> */}
      </section>
    </main>
  );
}
