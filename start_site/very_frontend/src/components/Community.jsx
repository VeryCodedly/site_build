// import React from 'react';

// export default function Community() {
//   return (
//     <>
//     <section className="w-full py-18 bg-black flex flex-col items-center justify-center text-center px-6">
//         <div className="max-w-4xl">
//           <h2 className="text-4xl md:text-5xl font-pops font-bold text-white mb-10">
//             Join a Thriving Creative Community
//           </h2>
//           <p className="text-gray-400 text-lg md:text-xl mb-10">
//             Collaborate, get inspired, and build magic with people who think like you do. Your next idea might just come from your next conversation.
//           </p>

//           <div className="flex flex-wrap justify-center gap-4 py-6 mb-15">
//             <span className="bg-pink-400/10 text-pink-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-pink-400/20">
//               Daily inspiration
//             </span>
//             <span className="bg-lime-400/10 text-lime-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-lime-400/20">
//               Lots of Creatives
//             </span>
//             <span className="bg-cyan-400/10 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md border border-cyan-400/20">
//               Safe, inclusive space
//             </span>
//           </div>
          
//         <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
//           <a href="https://discord.gg/d659pybS" className="font-bold cursor-pointer border-2 border-gray-500/100 bg-lime-400 text-black px-6 py-1 rounded-full hover:bg-white hover:text-black shadow-[0_4px_0_0_#0f0] hover:translate-y-1 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200">
//             Join Now
//           </a>
//           </div>
//           <p className="text-gray-500 text-sm mt-4">
//             No spam, no ads, just pure creative energy.
//           </p>
//         </div>
//       </section>
//       </>
//   );
// }
// import React from 'react';

// export default function Community() {
//   return (
//     <section className="w-full bg-black py-20 px-6 md:px-12">
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10">
        
//         {/* Left Content */}
//         <div className="flex-1 text-center md:text-left">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
//             Join a Thriving <span className="text-lime-400">Creative Community</span>
//           </h2>
//           <p className="text-gray-400 text-md md:text-md mb-8 max-w-xl mx-auto md:mx-0">
//             Collaborate, get inspired, and build magic with people who think like you do. 
//             Your next idea might just come from your next conversation.
//           </p>
          
//           <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
//             <span className="bg-pink-400/10 text-pink-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-pink-400/20">
//               Daily inspiration
//             </span>
//             <span className="bg-lime-400/10 text-lime-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-lime-400/20">
//               Creative minds
//             </span>
//             <span className="bg-cyan-400/10 text-cyan-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-cyan-400/20">
//               Inclusive space
//             </span>
//           </div>
//           <div className="flex space-x-4">
//           <a 
//             href="https://discord.gg/d659pybS" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="font-bold cursor-pointer border-3 border-gray-500/100 px-9 py-1 rounded-full text-white text-l hover:bg-white hover:text-black hover:translate-y-0.5 shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200"
//           >
//             Join Now
//           </a>
          
//           </div>
//           <p className="text-gray-500 text-xs mt-4">
//             No spam, no ads, just pure creative energy.
//           </p>
//         </div>
        
//         {/* Optional Image/Visual */}
//         <div className="w-full h-70 flex-1 overflow-hidden md:block">
//           {/* <div className="w-full h-64 bg-gradient-to-tr from-lime-400/20 to-cyan-400/20 rounded-2xl backdrop-blur-lg border border-gray-800 shadow-xl"></div> */}
//           <img className="w-full h-full rounded-4xl object-cover" src="images/community-img.svg" alt="community-illustration" />
//         </div>
//       </div>
//     </section>
//   );
// }
import React from 'react';

export default function Community() {
  return (
    <section className="w-full bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-12">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Join a Thriving <span className="text-lime-400">Creative Community</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto md:mx-0">
            Collaborate, get inspired, and build magic with people who think like you do. 
            Your next idea might just come from your next conversation.
          </p>
          
          {/* Feature tags */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
            <span className="bg-pink-400/10 text-pink-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-pink-400/20">
              Daily inspiration
            </span>
            <span className="bg-lime-400/10 text-lime-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-lime-400/20">
              Creative minds
            </span>
            <span className="bg-cyan-400/10 text-cyan-300 px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md border border-cyan-400/20">
              Inclusive space
            </span>
          </div>

          {/* Join button */}
          <div className="flex justify-center md:justify-start">
            <a 
              href="https://discord.gg/d659pybS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block font-bold border-3 border-gray-500 px-9 py-1 rounded-full text-white text-md hover:bg-white hover:text-black hover:translate-y-0.5 shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1 transition-all duration-200"
            >
              Join Now
            </a>
          </div>

          <p className="text-gray-500 text-xs mt-4">
            No spam, no ads, just pure creative energy.
          </p>
        </div>
        
        {/* Right Visual */}
        <div className="w-full md:w-1/2 flex-1 overflow-hidden">
          <img 
            className="w-full h-72 md:h-96 rounded-3xl object-cover" 
            src="images/community-img.svg" 
            alt="Community illustration" 
          />
        </div>
      </div>
    </section>
  );
}
