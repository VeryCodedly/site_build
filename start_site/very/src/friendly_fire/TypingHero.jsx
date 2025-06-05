// import React, { useEffect, useState } from 'react';

// const TypingHero = () => {
//   const baseText = "Hi. I'm glad you're her";
//   const tailVariants = ['r', 's', 'e', '.', ':', ')'];
//   const [displayText, setDisplayText] = useState('');
//   const [cursorVisible, setCursorVisible] = useState(true);
//   const [phase, setPhase] = useState('typing'); // typing | glitch | done
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     let timeout;

//     if (phase === 'typing' && index < baseText.length) {
//       timeout = setTimeout(() => {
//         setDisplayText(prev => prev + baseText[index]);
//         setIndex(prev => prev + 1);
//       }, Math.random() * 120 + 60); // Random delays for realism
//     } else if (phase === 'typing' && index === baseText.length) {
//       setTimeout(() => setPhase('glitch'), 400);
//     }

//     return () => clearTimeout(timeout);
//   }, [index, phase]);

//   useEffect(() => {
//     let glitchIndex = 0;
//     let timeout;

//     if (phase === 'glitch') {
//       const glitchSequence = () => {
//         if (glitchIndex < tailVariants.length) {
//           const newText = baseText + tailVariants[glitchIndex];
//           setDisplayText(newText);
//           glitchIndex++;

//           timeout = setTimeout(() => {
//             glitchSequence();
//           }, 300 + Math.random() * 100);
//         } else {
//           setPhase('done');
//         }
//       };
//       glitchSequence();
//     }

//     return () => clearTimeout(timeout);
//   }, [phase]);

//   useEffect(() => {
//     const blinkInterval = setInterval(() => {
//       setCursorVisible(prev => !prev);
//     }, Math.random() * 300 + 300); // Cursor speed varies randomly

//     return () => clearInterval(blinkInterval);
//   }, []);

//   return (
//     <h1 className="text-5xl sm:text-6xl font-prime font-bold mb-6 text-charcoal drop-shadow">
//       {displayText}
//       <span className="inline-block w-[1ch]">{cursorVisible ? '|' : ' '}</span>
//     </h1>
//   );
// };

// export default TypingHero;

// src/components/TypingHero.jsx
import React, { useEffect, useState } from 'react';

const TypingHero = () => {
  const baseText = "Hi. I'm glad you're herr";
  const glitchSequence = [
    'r',
    '',              // backspace 'r'
    's',             // types 's'
    '',              // backspace 's'
    'e',             // types 'e'
    '.',             // types '.'
    ' ',             // space before emoticon
    ':',             // types ':'
    ')',              // types ')'
    ')'
  ];

  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [phase, setPhase] = useState('typing'); // typing | glitch | done
  const [index, setIndex] = useState(0);
  const [glitchIndex, setGlitchIndex] = useState(0);
  const [currentTail, setCurrentTail] = useState('');

  // Typing out the base text
  useEffect(() => {
    let timeout;

    if (phase === 'typing' && index < baseText.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + baseText[index]);
        setIndex(prev => prev + 1);
      }, Math.random() * 120 + 60);
    } else if (phase === 'typing' && index === baseText.length) {
      setTimeout(() => setPhase('glitch'), 400);
    }

    return () => clearTimeout(timeout);
  }, [index, phase]);

  // Glitch typing phase with backspacing and additions
  useEffect(() => {
    let timeout;

    if (phase === 'glitch' && glitchIndex < glitchSequence.length) {
      timeout = setTimeout(() => {
        const nextChar = glitchSequence[glitchIndex];

        if (nextChar === '') {
          setCurrentTail(prev => prev.slice(0, -1)); // backspace
        } else {
          setCurrentTail(prev => prev + nextChar);   // type character
        }

        setDisplayText(baseText.slice(0, -1) + currentTail);
        setGlitchIndex(prev => prev + 1);
      }, Math.random() * 140 + 100);
    } else if (phase === 'glitch' && glitchIndex === glitchSequence.length) {
      setPhase('done');
    }

    return () => clearTimeout(timeout);
  }, [glitchIndex, phase, currentTail]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, Math.random() * 300 + 300);

    return () => clearInterval(blink);
  }, []);

  return (
    <h1 className="text-3xl sm:text-6xl font-prime mb-6 text-charcoal drop-shadow">
      {displayText}
      <span className="inline-block w-[1ch]">{cursorVisible ? '|' : ' '}</span>
    </h1>
  );
};

export default TypingHero;
