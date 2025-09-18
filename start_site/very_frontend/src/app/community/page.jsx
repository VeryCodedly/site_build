export default function CommunityPage() {
  return (
    <section className="group min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <div className="max-w-4xl mx-auto bg rounded-2xl p-10 text-center space-y-8 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400 group">
        <h2 className="text-4xl font-bold text-lime-400 group-hover:scale-110 transition-transform duration-700">Community</h2>
        <p className="text-gray-300 leading-relaxed">
          Learning is better when you’re not alone. Our community brings together tech 
          learners, builders, and tinkerers to support each other, share knowledge, and grow together.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Ways to Join</h2>
            <ul className="text-gray-400 list-disc list-inside space-y-1">
              <li>Chat with peers on Discord</li>
              <li>Join discussions in our Facebook group</li>
              <li>Collaborate on community projects</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Why It Matters</h2>
            <p className="text-gray-400">
              You’re not just learning alone — you’re joining a network of people excited 
              to share tips, solve problems, and celebrate progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
