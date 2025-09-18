export default function AboutPage() {
  return (
    <section className="group min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <div className="max-w-4xl mx-auto rounded-2xl p-10 text-center space-y-8 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400">
        <h2 className="text-4xl font-bold text-lime-400 group-hover:scale-110 transition-transform duration-700">About Us</h2>
        <p className="text-gray-300 leading-relaxed">
          Very Codedly is a community-driven platform dedicated to making tech knowledge more accessible, 
          more fun, and way less intimidating. Whether you’re a total beginner or a seasoned developer, 
          this space is built to help you read, learn, know, and connect. 🚀
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Our Mission</h2>
            <p className="text-gray-400">
              To simplify tech education by breaking down complex topics into approachable lessons 
              while creating a space for every person.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Our Values</h2>
            <ul className="text-gray-400 list-disc list-inside space-y-1">
              <li>Accessibility & clarity over jargon</li>
              <li>Community over competition</li>
              <li>Curiosity & lifelong learning</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
