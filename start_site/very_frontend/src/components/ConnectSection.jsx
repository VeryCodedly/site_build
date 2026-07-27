import { faLongArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ConnectSection() {
  return (
    <section className="py-24 bg-transparent order-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Wanna  <span className="text-lime-400">Chat?</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mb-12 max-w-2xl mx-auto">
          No login. No signups. You'll get a unique handle for the day.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Right Now",
              desc: "Today's biggest stories.",
              tag: "Live",
              slug: "right-now",
            },
            {
              title: "The Usual Suspect",
              desc: "Ah, yes. AI.",
              tag: "Live",
              slug: "the-usual-suspect",
            },
            {
              title: "Devs Only",
              desc: "What the title says.",
              tag: "Live",
              slug: "devs-only",
            },
          ].map((room, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 rounded-2xl
                         p-6 text-left transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_30px_-10px_rgba(154,230,0,0.2)]
                         active:translate-y-[-5px] active:shadow-[0_0_30px_-10px_rgba(154,230,0,0.2)]"
            >
              <span className="inline-flex items-center gap-1.5 font-semibold tracking-tight mb-3 text-xs text-lime-400 bg-lime-400/10 px-2 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                {room.tag}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {room.title}
              </h3>
              <p className="text-gray-300/90 mb-4">{room.desc}</p>
              <Link
                href={`/connect/${room.slug}`}
                aria-label={`${room.title} room`}
                className="text-lime-400 font-semibold hover:text-lime-300 active:text-lime-300
                 inline-flex items-center gap-2 hover:underline transition-all"
              >
                Join room
                <FontAwesomeIcon className="" icon={faLongArrowRight} size="sm" />
                <span className="sr-only"> {room.title}</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-18">
          <Link
            href="/connect"
            aria-label="Connect page button"
            className="font-bold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white px-7.5 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
                    active:text-black shadow-[0_4px_0_0_#78ff02] hover:shadow-[0_2px_0_0_#00ff00] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
          >
            <span className="sr-only">Connect</span>
            <span className="">Connect</span>
          </Link>
        </div>
      </div>
    </section>
  );
}