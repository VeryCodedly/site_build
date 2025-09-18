export default function PrivacyPage() {
  return (
    <section className="relative group min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <div className="mx-auto max-w-3xl rounded-2xl p-10 text-center space-y-8 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400">
        <h2 className="text-4xl font-bold text-lime-400 text-center group-hover:scale-110 transition-transform duration-700">Privacy Policy</h2>
        <p className="text-gray-300 leading-relaxed">
          Your trust matters to us. Here’s how we handle your information:
        </p>
        <ul className="text-gray-400 list-disc list-inside space-y-2">
          <li>We don’t sell your data to third parties.</li>
          <li>We collect minimal info needed to improve the experience.</li>
          <li>You control what personal details you share.</li>
        </ul>
        <p className="text-gray-400">
          Questions? Reach out via our <a href="/contact" className="text-lime-400 underline">contact page</a>.
        </p>
      </div>
    </section>
  );
}
