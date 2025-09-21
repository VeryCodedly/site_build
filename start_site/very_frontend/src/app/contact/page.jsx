export default function ContactPage() {
  return (
    <section className="group relative min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <div className="max-w-3xl mx-auto rounded-2xl p-10 text-center space-y-8 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400">
        <h1 className="text-4xl font-bold text-lime-400 mb-6 group-hover:scale-110 transition-transform duration-700">Contact Us</h1>
        <p className="text-gray-300 mb-10">
          Got a question, feedback, or just want to say hi? Drop us a message
          and we’ll get back to you whenever lol
        </p>

        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-1/4 font-bold cursor-pointer border-2 border-gray-500/100 bg-lime-400 hover:bg-white text-black px-3 py-0.5 rounded-full shadow-[0_3px_0_0_#0f0] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200">
            <span className="md:hidden">Send</span>
            <span className="hidden md:inline">Send Message</span>
          </button>
        </form>
      </div>
    </section>
  );
}
