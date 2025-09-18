// // src/pages/Terms.jsx

// export default function Terms() {
//   return (
//     <div className="prose prose-neutral max-w-3xl mx-auto text-white">
//       <h1 className="text-3xl font-bold">Terms of Use</h1>

//       <p>
//         By using this site, you agree to a few sensible things:
//       </p>

//       <ol className="list-decimal ml-5 space-y-2">
//         <li>
//           Don’t copy content and claim it as your own. Be cool, give credit.
//         </li>
//         <li>
//           No AI doomsday trolling. We're here to learn and have fun.
//         </li>
//         <li>
//           I make no promises that everything here is flawless — but I do try.
//         </li>
//         <li>
//           The tech world moves fast, so things may change or break. I’ll patch it up.
//         </li>
//       </ol>

//       <p>
//         TL;DR: Be kind, don’t be sketchy, and enjoy the ride.
//       </p>

//       <p className="text-sm italic">
//         Questions? Just reach out — I don’t bite (unless...)
//       </p>
//     </div>
//   );
// }

export default function TermsPage() {
  return (
    <section className="relative group min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
      <div className="mx-auto max-w-3xl rounded-2xl p-10 text-center space-y-8 border border-gray-800 bg-white/5 backdrop-blur-lg 
              shadow-[0_15px_20px_rgba(0,0,0,0.6),0_15px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_20px_rgba(0,0,0,0.7),0_25px_30px_rgba(0,0,0,0.6)]
              hover:ring-1 transition-all duration-400">
        <h2 className="text-4xl font-bold text-lime-400 text-center group-hover:scale-110 transition-transform duration-700">Terms of Use</h2>
        <p className="text-gray-300 leading-relaxed">
          By using this site, you agree to play nice and respect the following rules:
        </p>
        <ul className="text-gray-400 list-disc list-inside space-y-2">
          <li>Don’t misuse or exploit the platform.</li>
          <li>Respect other community members.</li>
          <li>Use the content for learning, not plagiarism.</li>
        </ul>
        <p className="text-gray-400">
          These terms may change over time. Keep an eye on this page for changes.
        </p>
      </div>
    </section>
  );
}
