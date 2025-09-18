export default function FAQsPage() {
  return (
    <section className="group min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <div className="max-w-3xl mx-auto rounded-2xl p-10 text-center space-y-8 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400">
        <h2 className="text-4xl font-bold text-lime-400 group-hover:scale-110 transition-transform duration-700 text-center">FAQs</h2>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Is this platform free?</h2>
            <p className="text-gray-400">
              Yes! Most of our content is free to access. Premium resources may come later, 
              but our goal is to keep learning open.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Do I need prior coding experience?</h2>
            <p className="text-gray-400">
              Nope. We design lessons and articles for absolute beginners all the way to advanced learners.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">How do I join the community?</h2>
            <p className="text-gray-400">
              Check out our <a href="/community" className="text-lime-400 underline">community page</a> 
              to join Discord or Facebook groups.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
