import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faGraduationCap, faChartLine, faRss } from '@fortawesome/free-solid-svg-icons';
import { motion as Motion } from 'framer-motion';

const cards = [
  {
    id: 'read',
    title: 'Read',
    description: 'Daily articles with technical depth, clarity, and purpose.',
    icon: faNewspaper
  },
  {
    id: 'learn',
    title: 'Learn',
    description: 'Step-by-step coding paths for beginner to advanced.',
    icon: faGraduationCap
  },
  {
    id: 'know',
    title: 'Know',
    description: 'Stay informed on tech trends, updates, and insights.',
    icon: faChartLine
  },
  {
    id: 'connect',
    title: 'Connect',
    description: 'Subscribe, keep up, and keep evolving in the tech space.',
    icon: faRss
  },
];

export default function TeaserCards() {
  return (
    <>
    <section className="h-screen mt-20 md:py-18 md:px-14 bg-[url('../images/bg-1.jpg')] bg-center bg-cover flex items-center justify-center">
        <div className="grid grid-cols-6 md:grid-cols-4 gap-8 w-full max-w-6xl">
          {cards.map((card, index) => (
            <Motion.div
              key={index}
              href={"#" + card.id}
              className="rounded-3xl p-6 md:p-8 shadow-xl border border-gray-700 bg-white/5 backdrop-blur-md hover:shadow-3xl hover:ring-2 hover:ring-lime-400/30 transition-all duration-400 relative group"
              whileHover={{ scale: 1.09, rotate: 0 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Optional Icon or Symbol */}
              <div className="text-lime-400 text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={card.icon} />
              </div>

              <h2 className="text-white text-xl md:text-2xl font-pops font-semibold mb-2">
                {card.title}
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed">
                {card.description}
              </p>

              {/* Optional underline on hover */}
              <div className="absolute bottom-4 left-6 h-0.5 w-20 bg-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Motion.div>
          ))}
        </div>
      </section>
    
    {/* // <div className="bg-graphite border border-off-white p-6 rounded-lg flex items-start space-x-4">
    //   <i className="fa-solid fa-lightbulb text-neon text-2xl mt-1"></i>
    //   <div>
    //     <h3 className="text-2xl font-semibold mb-2 text-off-white">{title}</h3>
    //     <p className="text-shadow-gray">{text}</p>
    //   </div>
    // </div> */}
    </>
  );
}