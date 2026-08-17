import { faLongArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


export default function KnowSection() {
  return (
    <section className="py-24 bg-transparent order-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          More to <span className="text-pink-400">Know</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mb-12 max-w-2xl mx-auto">
            Videos, convos, and media worth pressing play for.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "VeryCodedly Today",
              desc: "What's happening in tech right now, explained in way under 10 minutes.",
              slug: "verycodedly-today",
            },
            {
              title: "The Climb",
              desc: "Behind the scenes of building, figuring things out, and hopefully not failing.",
              slug: "the-climb",
            },
            {
              title: "Very Decoded",
              desc: "Explainers for the tech stuff you're curious about but forgot to Google.",
              slug: "very-decoded",
            },
          ].map((series, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 rounded-2xl
                         p-6 text-left transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_30px_-10px_rgba(255,105,180,0.2)]
                         active:translate-y-[-5px] active:shadow-[0_0_30px_-10px_rgba(255,105,180,0.2)]"
            >
              <span className="inline-block font-semibold tracking-tight mb-3 text-xs text-pink-400 bg-pink-400/10 px-2 py-1 rounded">
                Series
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {series.title}
              </h3>
              <p className="text-gray-300/90 mb-4">{series.desc}</p>
              <Link
                href={`/know/series/${series.slug}`}
                aria-label={`${series.title} series`}
                className="text-pink-400 font-semibold hover:text-pink-300 active:text-pink-300
                 inline-flex items-center gap-2 hover:underline transition-all"
              >
                Explore
                <FontAwesomeIcon className="" icon={faLongArrowRight} size="sm" />
                <span className="sr-only"> {series.title}</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-18">
          <Link
            href="/know"
            aria-label="Know page button"
            className="font-bold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white px-7.5 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
                    active:text-black shadow-[0_4px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fe379a] active:shadow-[0_2px_0_0_#fe379a] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
          >
            <span className="sr-only">Know More</span>
            <span className="lg:hidden">Know</span>
            <span className="hidden lg:inline">Know More</span>
          </Link>
        </div>
      </div>
    </section>
  );
}