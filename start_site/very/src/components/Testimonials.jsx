import React from 'react';
import { motion as Motion } from 'framer-motion';

// Sample testimonials
const testimonials = [
  {
    quote: "Joining this space unlocked my creative spark. I’ve never felt more seen and supported.",
    name: "Ada U.",
    role: "Digital Artist • Lagos 🇳🇬",
  },
  {
    quote: "It’s more than a platform — it’s a vibe. I'm building, sharing, and learning with some awesome people!",
    name: "Jordan K.",
    role: "AI Storyteller • Berlin 🇩🇪",
  },
  {
    quote: "The community uplifted me when I doubted myself. Now I’m launching my own project!",
    name: "Nia R.",
    role: "Creative Coder • Nairobi 🇰🇪",
  },
];

export default function Testimonials() {
    return (
    <>
    {/* Testimonials */}
    <section className="my-20 py-20 bg-black/90 px-18">
        <div className="max-w-6xl mx-auto text-center mb-12">
        <h3 className="font-pops text-3xl md:text-4xl font-semibold text-white mb-3">
            What Creatives Are Saying
        </h3>
        <p className="text-gray-400 text-md md:text-lg">
            Real voices from our community around the world.
        </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
            <Motion.div
                key={i}
                whileHover={{ scale: 1.09, rotate: 0 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-3xl py-5 md:p-5 shadow-xl border border-gray-700 bg-white/5 backdrop-blur-md hover:shadow-3xl hover:ring-2 hover:ring-lime-400/30 transition-all duration-400 relative group"
                >
                <div className="mb-4 text-lime-400 text-3xl">“</div>
                    <p className="text-sm text-gray-300 italic mb-6">“{t.quote}”</p>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-gray-400 text-sm">{t.role}
                </div>
            </Motion.div>
        ))}
        </div>
    </section>
    </>
    );
}
