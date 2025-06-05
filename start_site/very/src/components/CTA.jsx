import React from 'react';

export default function CTA() {
    return (
        <>
        {/* Final CTA Section */}
        <section className="bg-gradient-to-tr from-black via-zinc-900 to-black text-white py-30 text-center">
        <div className="max-w-4xl mx-auto">
            <h2 className="font-pops text-4xl md:text-5xl font-bold mb-8">
                Ready to Create Something Brilliant?
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-10">
                Sign up to join a community of bold thinkers, dreamers, and doers. Your next big thing starts here.
            </p>
            <div className='flex flex-col md:flex-row justify-center pt-12'>
                <a href="#get-started" className="font-semibold cursor-pointer border-2 border-gray-500/100 px-9 py-1 rounded-full hover:bg-white hover:text-black hover:translate-y-1 shadow-[0_3px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200">
                    Get Started
                </a>
            </div>
        </div>
        </section>
        </>
    ); 
}