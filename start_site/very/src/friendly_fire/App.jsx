// import React from 'react'
// import './index.css'
// import TypingHero from './components/TypingHero'; './components/TypingHero'

// function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-100 via-bg-orange-300/60-100 to-orange-100 text-charcoal font-mono">
//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center text-center py-24 px-6">
//         <TypingHero />

//         <p className="text-lg sm:text-xl max-w-xl mb-8 text-brand-charcoal/90">
//             AI, code, apps, and software trends - decoded with slightly nerdy tech talk.
//         </p>

//         <a
//           href="#start"
//           className="bg-bg-orange-300/60 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-300/60 transition duration-400"
//         >
//           Let's go! 🚀
//         </a>
//       </section>

//       {/* Decorative Section or Preview */}
//       <section className="py-8 bg-white/80 text-center">
//         {/* <h2 className="text-2xl font-semibold text-bg-orange-300/60 mb-4">✨ Projects, Playgrounds & Pixels</h2>
//         <p className="text-charcoal/70">
//           Dive into code experiments, tech tutorials, and some sweet smart-girl energy.
//         </p> */}
//       </section>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React from 'react';
import './index.css';
import TypingHero from './components/TypingHero';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-bg-orange-300/60-100 to-orange-100 text-charcoal font-mono">
      <section className="flex flex-col justify-around text-center py-10 px-6">
        <TypingHero />
        <div>
          <div>
            <p className="text-lg sm:text-xl max-w-xl mb-8 text-charcoal/90">
              AI, code, apps, and software trends — decoded with slightly nerdy tech talk.
            </p>
          </div>
        
          <div className='flex gap-6'>
            <a href="#start"
              className="bg-lilac w-50 outline-stone-300 outline-1 text-white px-5 py-3 rounded-b-3xl shadow-lg hover:bg-mint transition duration-400"
              >Start Learning <i className="fa-solid fa-graduation-cap"></i>
            </a>
            <a href="#start"
              className="bg-tangerine w-50 outline-stone-300 outline-1 text-white px-5 py-3 rounded-b-3xl shadow-lg hover:bg-mint transition duration-400"
              >Explore Blog <i className="fa-solid fa-eye"></i>
            </a>
          </div>
        </div>

        <div className="flex-1 hidden md:block">
          <img src="../images/site-avatar-nb.png" alt="cartoon-image-of-african-girl" className="w-full max-w-sm mx-auto" />
        </div>
        
      </section>

      <footer className=" overflow-hidden py-2 bg-softWhite/50">
        <div className="text-sm whitespace-nowrap animate-slide px-2 text-center text-charcoal/60">
          <p>Wahala for who no sabi tech — but not you sha.</p>
        </div>
      </footer>
    </div>
    
  );
}

export default App;
