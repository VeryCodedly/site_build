// app/support/page.jsx
import Link from "next/link";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function SupportPage() {
  return (
    <section className="group relative min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-stretch opacity-60 -z-10"></div>
      <div className="relative max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <header className="text-center">
          <h2 className="text-4xl md:text-4xl font-extrabold text-lime-400 mb-4 group-hover:scale-110 transition-transform duration-700">
            Help keep Very Codedly alive
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Very Codedly is built by a small, obsessed team. Your support keeps our content free,
            the community warm, and the servers humming. Every bit helps — and
            none of it changes who we are.
          </p>
        </header>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Financial */}
          <div className="rounded-2xl p-6 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400 group">
            <h2 className="text-lg font-semibold text-white mb-2">Financial support</h2>
            <p className="text-gray-400 text-sm mb-4">
              One-off or recurring donations fund hosting, tools, and new
              tutorials. Pick whatever works for you.
            </p>

            <div className="space-y-3">
              <a
                href="https://ko-fi.com/verycodedly"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-lime-400 text-black text-sm font-semibold cursor-pointer border-3 border-gray-500/100 px-9 py-1 rounded-full hover:bg-white hover:text-black hover:font-bold hover:translate-y-1 shadow-[0_4px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200"
              >
                Buy me a coffee ☕
              </a>

              <a
                href="https://www.patreon.com/YOUR_HANDLE"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 rounded-full border border-gray-500 text-white hover:bg-white/5 transition"
              >
                Become a Patron
              </a>

              <a
                href="https://github.com/sponsors/VeryCodedly"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 rounded-full border border-gray-500 text-white hover:bg-white/5 transition"
              >
                Sponsor on GitHub
              </a>
            </div>
          </div>

          {/* Card 2: Non-financial */}
          <div className="rounded-2xl p-6 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400 group">
            <h2 className="text-lg font-semibold text-white mb-2">Support without spending</h2>
            <p className="text-gray-400 text-sm mb-4">
              Share, star, join, and help other learners. These actions make a
              huge difference to discoverability and morale.
            </p>

            <ul className="text-gray-300 text-sm list-disc list-inside space-y-2 mb-4">
              <li>Share an article on Twitter, LinkedIn, or Reddit</li>
              <li>Star the repo on GitHub</li>
              <li>Invite friends to our Discord</li>
            </ul>

            <div className="flex gap-3">
              <a
                href="https://twitter.com/intent/tweet?text=Into%20coding%20+%20tech%20trends?%20Check%20out%20Very%20Codedly%20-%20https://verycodedly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-3 py-2 rounded-3xl border border-gray-500 text-white hover:bg-white/5 transition"
              >
                Share <FontAwesomeIcon icon={faTwitter} className="inline-flex ml-1" size="md" />
              </a>

              <a
                href="https://github.com/VeryCodedly/site_build"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-3 py-2 rounded-3xl border border-gray-500 text-white hover:bg-white/5 transition"
              >
                Star <FontAwesomeIcon icon={faGithub} className="inline ml-1" size="lg" />
              </a>
            </div>
          </div>

          {/* Card 3: Other support / feedback */}
          <div className="rounded-2xl p-6 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400 group">
            <h2 className="text-lg font-semibold text-white mb-2">Direct support & feedback</h2>
            <p className="text-gray-400 text-sm mb-4">
              Want to help shape the site? Here’s how you can get involved or contact us directly.
            </p>

            <div className="space-y-3">
              <Link
                href="/community"
                className="block w-full text-center bg-lime-400 text-black font-semibold text-sm hover:bg-lime- cursor-pointer border-3 border-gray-500/100 px-9 py-1 rounded-full hover:bg-white hover:text-black hover:font-bold hover:translate-y-1 shadow-[0_4px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200"
              >
                Join the community
              </Link>
              <a
                href="mailto:verycodedly@gmail.com?subject=Support%20Very%20Codedly"
                className="block w-full text-center px-4 py-2 rounded-full border border-gray-500 text-white hover:bg-white/5 transition"
              >
                Email us
              </a>
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-2 rounded-full border border-gray-500 text-white hover:bg-white/5 transition"
              >
                Send feedback
              </Link>
              
            </div>
          </div>
        </div>

        {/* Extra: small FAQs about supporting */}
        <div className="rounded-2xl p-6 bg-white/3 border border-gray-800 backdrop-blur-sm text-sm text-gray-300">
          <h3 className="text-white font-semibold mb-2">Quick FAQ</h3>
          <dl className="space-y-3">
            <div>
              <dt className="font-medium">Will support change the content?</dt>
              <dd className="text-gray-400">No — the core content remains free and available to everyone.</dd>
            </div>
            <div>
              <dt className="font-medium">Is support tax-deductible?</dt>
              <dd className="text-gray-400">We aren’t a non-profit; check individual platforms for their policies.</dd>
            </div>
            <div>
              <dt className="font-medium">Can I contribute content?</dt>
              <dd className="text-gray-400">Yes — email us or open a PR on our GitHub repo to get started.</dd>
            </div>
          </dl>
        </div>

        {/* Closing note */}
        <footer className="text-center text-sm text-gray-400 backdrop-blur-2xl border border-gray-800 rounded-2xl p-6 bg-black/3">
          <p>
            Thank you ❤️ for reading, learning, and being part of this little corner of the web.
          </p>
          <p className="mt-2">Every share, star, and coffee waters this tree 🌳</p>
        </footer>
      </div>
    </section>
  );
}
