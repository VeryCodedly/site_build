import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative h-screen bg-black overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('/images/bg-404.jpg')] bg-center bg-cover"
      />

      {/* Vignette / void fade */}
      <div
        className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_55%,rgba(0,0,0,0.85)_70%,rgba(0,0,0,1)_100%)]"
      />


      {/* Centered content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-lime-400">404</h2>

          <p className="text-base sm:text-lg text-white">
            Nothing to see here.
          </p>

          <div className="flex justify-center pt-4">
            <Link
              href="/"
              className="font-semibold cursor-pointer
                         bg-black/70 border-3 border-gray-500/100
                         px-7 py-1 rounded-full text-white
                         hover:bg-white hover:text-black
                         hover:translate-y-0.5 active:bg-white
                         shadow-[0_4px_0_0_#9AE600] active:text-black
                         hover:shadow-[0_2px_0_0_#9AE600]
                         active:shadow-[0_2px_0_0_#9AE600]
                         active:translate-y-2
                         transition-all duration-200"
            >
              Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

// import Link from 'next/link';

// export default function NotFound() {
//   return (
//     <div className="h-screen bg-[url('/images/bg-404.jpg')] bg-center bg-cover text-center space-y-6 py-16">
//       <div className="mx-auto my-auto">
//         <h2 className="text-4xl font-bold text-lime-400 pt-10">404</h2>
//       <p className="text-xl text-white">Nothing to see here.</p>
//       <div className='flex justify-center pt-8 text-base'>
//         <Link
//           href="/"
//           className="font-semibold cursor-pointer bg-black/70 border-3 border-gray-500/100 px-7 py-1 rounded-full text-white hover:bg-white hover:text-black hover:translate-y-0.5 shadow-[0_4px_0_0_#9AE600] hover:shadow-[0_2px_0_0_#9AE600] active:shadow-[0_2px_0_0_#9AE600] active:translate-y-2 transition-all duration-200"
//         >
//           Home
//         </Link>
//       </div>
//       </div>
//     </div>
//   );
// }
