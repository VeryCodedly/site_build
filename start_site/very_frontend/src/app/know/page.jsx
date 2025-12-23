import Link from "next/link";

export default function KnowPage() {
  return (
    <main className="relative min-h-screen bg-black mb-15 mt-15 sm:mt-0 text-white overflow-hidden">
      {/* subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.08),_transparent_55%)]" />

      <section className="relative z-10 max-w-3xl mx-auto px-6 py-34 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
          Video
        </p>

        <h1 className="text-4xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
          VeryCodedly on{" "}
          <span className="text-red-500">YouTube</span>
        </h1>

        <p className="text-base text-gray-300 max-w-2xl mx-auto px- leading-relaxed">
          Unfiltered takes on Tech, Code, Culture and everything in between — for people
          who want to understand what’s happening, not just keep up.
        </p>

        <div className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="https://www.youtube.com/@verycodedly"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:font-semibold order-2 cursor-pointer border-3 border-gray-500/100 px-7.5 py-1 rounded-full text-white hover:bg-white active:bg-white hover:text-black
            active:text-black shadow-[0_4px_0_0_#DC2626] hover:shadow-[0_2px_0_0_#DC2626] active:shadow-[0_2px_0_0_#DC2626] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200">
            Subscribe
          </Link>

          <span className="text-sm text-gray-500 order-1">
            New videos we're sure you'd like.
          </span>
        </div>

        {/* <div className="mt-18">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-red-500 transition"
          >
            ← Back to VeryCodedly
          </Link>
        </div> */}
      </section>
    </main>
  );
}
