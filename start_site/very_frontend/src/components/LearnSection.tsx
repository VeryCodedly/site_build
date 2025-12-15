import Link from "next/link";
import { faLongArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LearnSection() {
  return (
    <section className="py-24 bg-transparent border-y border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Learn with <span className="text-lime-400">VeryCodedly</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mb-12 max-w-2xl mx-auto">
          Beginner-friendly coding lessons that help complex ideas click,
          one concept at a time.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Python Basics",
              desc: "From print statements to first projects: start simple, start smart.",
              tag: "Beginner",
            },
            {
              title: "Frontend Flow",
              desc: "JavaScript and the logic that shapes every web page you see.",
              tag: "Beginner",
            },
            {
              title: "React Explained",
              desc: "Hooks, components, and why it all just *clicks* once you see it right.",
              tag: "Advanced",
            },
          ].map((lesson, i) => (
            <div
              key={i}
              className="bg-[linear-gradient(to_bottom_right,rgba(0,255,100,0.09),rgba(0,255,150,0.04))] rounded-2xl 
                        p-6 text-left transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_30px_-10px_rgba(144,238,144,0.4)]
                        active:translate-y-[-5px] active:shadow-[0_0_30px_-10px_rgba(144,238,144,0.4)]"
            >
              <span className="inline-block font-semibold tracking-tight mb-3 text-xs text-lime-400 bg-lime-400/10 px-2 py-1 rounded">
                {lesson.tag}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-300/90 mb-4">{lesson.desc}</p>
              <Link
                href="/learn"
                aria-label={`${lesson.tag} button`}
                className="text-lime-400 font-semibold hover:text-lime-300 active:text-lime-300 hover:underline transition-all
                inline-flex items-center gap-2"
              >
                Start learning
                <FontAwesomeIcon className="" icon={faLongArrowRight} size="sm" />
                <span className="sr-only"> about {lesson.tag}</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-18">
          <Link
            href="/learn"
            aria-label="Learn page button"
            //   className="inline-block mt-14 px-8 py-3 rounded-full bg-lime-400/10 hover:bg-lime-400/20 text-lime-300 transition-all duration-300"
            className="font-bold cursor-pointer border-3 border-gray-500/100 bg-transparent px-8.5 py-1 rounded-full text-white hover:bg-white active:bg-white hover:text-black
                    active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
          >
            <span className="sr-only">Learn Now</span>
            <span className="lg:hidden">Learn</span>
            <span className="hidden lg:inline">Learn Now</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
