// src/pages/NotFound.jsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen bg-[url('/images/bg-404.jpg')] bg-center bg-cover text-center space-y-6 py-16">
      <h2 className="text-4xl font-bold text-lime-400">404</h2>
      <p className="text-xl text-white">Oops! You found a void in the matrix.</p>
      <div className='flex justify-center pt-8'>
        <Link
          href="/"
          className="font-bold cursor-pointer bg-black/70 border-3 border-gray-500/100 px-8 py-1 rounded-full text-white hover:bg-white hover:text-black hover:translate-y-0.5 shadow-[0_4px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-2 transition-all duration-200"
        >
          Beam me up, Scotty!
        </Link>
      </div>
    </div>
  );
}
