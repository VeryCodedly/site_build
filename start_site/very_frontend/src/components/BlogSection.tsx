import Link from "next/link";

export default function BlogSection() {
  return (
    <section className="py-24 bg-transparent border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          From the <span className="text-pink-400">Blog</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mb-12 max-w-2xl mx-auto">
            Unfiltered takes on Tech, Code, Culture and everything in between.<br /> 
            {/* Thoughtful, clear, and actually useful. */}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Why Python Keeps Winning",
              desc: "It’s not just syntax — it’s clarity, community, and flow.",
              tag: "Apps & Software",
            },
            {
              title: "React Still Feels Very Fresh",
              desc: "Even a decade later, it’s the gold standard for frontends.",
              tag: "Apps & Software",
            },
            {
              title: "AI Tools That Actually Help",
              desc: "Skip the hype — these are the real productivity boosters.",
              tag: "Innovation & AI",
            },
          ].map((post, i) => (
            <div
              key={i}
              className="bg-[linear-gradient(to_bottom_right,rgba(255,192,203,0.08),rgba(255,20,147,0.06))] rounded-2xl
                         p-6 text-left transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_30px_-10px_rgba(255,105,180,0.4)]
                         active:translate-y-[-5px] active:shadow-[0_0_30px_-10px_rgba(255,105,180,0.4)]"
            >
            <span className="inline-block mb-3 text-xs text-pink-400 bg-pink-400/10 px-2 py-1 rounded">
                {post.tag}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {post.title}
              </h3>
              <p className="text-gray-400 mb-4">{post.desc}</p>
              <Link
                href="/blog"
                className="text-pink-400 font-semibold hover:text-pink-300 hover:underline transition-all"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>

        {/* <Link
          href="/blog"
          className="inline-block mt-14 px-8 py-3 rounded-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 transition-all duration-300"
        >
          Visit the Blog
        </Link> */}
        <div className="flex justify-center mt-18">
        <Link
            href="/blog"
            //   className="inline-block mt-14 px-8 py-3 rounded-full bg-lime-400/10 hover:bg-lime-400/20 text-lime-300 transition-all duration-300"
            className="font-semibold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white px-9 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
        active:text-black shadow-[0_4px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fb64b6] active:shadow-[0_2px_0_0_#ff69b4] active:translate-y-1.5 hover:translate-y-0.5  transition-all duration-200"
            // className="font-semibold cursor-pointer border-2 border-pink-400/70 bg-pink-500/90 text-white px-6 py-2 rounded-full hover:bg-pink-400 hover:shadow-[0_0_15px_#ff69b4] hover:text-white transition-all duration-300"
            >
            <span className="lg:hidden">/Blog</span>
            <span className="hidden lg:inline">Go to /Blog</span>
        </Link>
        </div>
      </div>
    </section>
  );
}
