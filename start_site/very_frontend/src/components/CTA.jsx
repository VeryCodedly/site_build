// // import React from 'react';

// // export default function CTA() {
// //     return (
// //         <>
// //         {/* Final CTA Section */}
// //         <section className="bg-gradient-to-tr from-black via-zinc-900 to-black text-white py-30 text-center">
// //         <div className="max-w-4xl mx-auto">
// //             <h2 className="font-pops text-4xl md:text-5xl font-bold mb-8">
// //                 Ready to Create Something Brilliant?
// //             </h2>
// //             <p className="text-gray-300 text-lg md:text-xl mb-10">
// //                 Sign up to join a community of bold thinkers, dreamers, and doers. Your next big thing starts here.
// //             </p>
// //             <div className='flex flex-col md:flex-row justify-center pt-12'>
// //                 <a href="#get-started" className="font-semibold cursor-pointer border-3 border-gray-500/100 px-9 py-1 rounded-full hover:bg-white hover:text-black hover:translate-y-1 shadow-[0_3px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200">
// //                     Get Started
// //                 </a>
// //             </div>
// //         </div>
// //         </section>
// //         </>
// //     ); 
// // }
// import React from 'react';

// export default function CTA() {
//   return (
//     <section className="bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white py-28 text-center relative">
//       <div className="max-w-4xl mx-auto px-6">
//         <h2 className="font-pops text-4xl md:text-5xl font-bold mb-6">
//           Ready to Create Something Brilliant?
//         </h2>
//         <p className="text-gray-300 text-lg md:text-lg mb-10 max-w-2xl mx-auto">
//           Sign up to join a community of bold thinkers, dreamers, and doers. Your next big thing starts here.
//         </p>
//         <div className="flex justify-center py-6">
//             <a href="#get-started" className="font-semibold cursor-pointer border-3 border-gray-500/100 px-9 py-1 rounded-full hover:bg-white hover:text-black hover:translate-y-1 shadow-[0_3px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200">
//                 Get Started
//             </a>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from 'react';

export default function CTA() {
  return (
    <section className="relative bg-gradient-to-br from-black via-zinc-900 to-black text-white py-28 px-8 overflow-hidden">
      
      {/* Accent Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-lime-400/20 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex justify-end">
        <div className="text-right md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white to-lime-300 bg-clip-text text-transparent">
            Ready to Create <br /> Something Brilliant?
          </h2>
          <p className="text-gray-400 text-md md:text-lg mb-10 max-w-lg ml-auto">
            Sign up to join a community of bold thinkers, dreamers, and doers. Your next big thing starts here.
          </p>

          <div className="flex space-x-4 justify-end">
            <a
              href="https://discord.gg/UVWNezaj"
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold cursor-pointer border-3 border-gray-500/100 px-9 py-1 rounded-full hover:bg-white hover:font-bold hover:text-black hover:translate-y-0.5 shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 transition-all duration-200"
            >Get Started
              {/* <span className="absolute inset-0 bg-gradient-to-t from-lime-400 to-lime-300 
                               translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out"></span> */}
              {/* <span className="relative z-10 group-hover:text-black">Get Started</span> */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
