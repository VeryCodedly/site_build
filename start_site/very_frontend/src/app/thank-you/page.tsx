'use client';

// import { useSearchParams } from 'next/navigation';

export default function ThankYou() {
//   const params = useSearchParams();
//   const tx = params.get('tx'); // Transaction ID for tracking

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-lime-400 mb-10">Thank You!</h1>
        <p className="text-xl mb-2">Your support means the world to us.</p>
        <p className="text-gray-400 mb-10">Check your email for confirmation.</p>
        <button
          onClick={() => window.history.back()}
          className="font-semibold cursor-pointer mt-3 border-3 border-gray-500/100 bg-lime-400 px-7 py-1 rounded-full text-black hover:bg-white 
                      active:bg-white active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] 
                        active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
        >
            Back to Site
        </button>
      </div>
    </div>
  );
}