'use client';

import { motion as Motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type Errors = { email?: string };

export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | null; message?: string }>({ type: null });
  const [isVisible, setIsVisible] = useState(false);

  // Show card after 25 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 25000);
    return () => clearTimeout(timer);
  }, []);

  // Validation 
  const validate = useCallback(() => {
    const newErrors: Errors = {};

    const trimmed = email.trim();
    if (!trimmed) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email]);

  // Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (showErrors) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // Submit 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrors(true);

    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fix the error below.' });
      return;
    }

    // Success: mailto
    const subject = encodeURIComponent('Newsletter Subscription for VeryCodedly');
    const body = encodeURIComponent(
      `Hi,\n\nPlease subscribe me to the VeryCodedly newsletter.\n\nEmail: ${email.trim()}`
    );
    window.location.href = `mailto:verycodedly@gmail.com?subject=${subject}&body=${body}`;

    // Reset
    setEmail('');
    setErrors({});
    setShowErrors(false);
    setStatus({ type: null });
    setIsVisible(false);
  };

  const handleClose = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <Motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 max-w-[80vw] sm:max-w-md rounded-xl border-3 
      border-slate-700/50 bg-gradient-to-br from-black/15 to-transparent/90 backdrop-blur-lg shadow-[0_0_2px_#cccccc] 
      hover:shadow-[0_0_10px_#222222] active:shadow-[0_0_10px_#222222] p-6 sm:p-8 text-center transition-all duration-300 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter Subscription Modal"
    >
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-300 hover:text-lime-400 active:text-lime-400 focus:outline-none 
        focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-[#181d1d] p-1 rounded-md"
        aria-label="Close newsletter modal"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <Motion.h2
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl sm:text-2xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400"
      >
        Join Our Newsletter
      </Motion.h2>
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-2 mb-4">
        Stay updated with the latest tech insights. No spam, just the good stuff.
      </p>

      {/* Global error */}
      {status.type && (
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="p-3 rounded-lg text-sm bg-rose-500/10 text-rose-400 border border-rose-500/30 mb-4"
        >
          {status.message}
        </Motion.div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* EMAIL FIELD */}
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            ...(showErrors && errors.email && { x: [-5, 5, -5, 5, 0] })
          }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ...(showErrors && errors.email && { x: { duration: 0.4, repeat: 1 } })
          }}
          className="relative"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email Address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 rounded-md bg-white/5 text-white placeholder-gray-400 border-2 
                       focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-[#181d1d] 
                       transition-all duration-200 text-sm sm:text-base ${
                         showErrors && errors.email ? 'border-rose-500/70' : 'border-zinc-500/80'
                       }`}
            autoComplete="email"
            required
          />
          {showErrors && errors.email && (
            <Motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-5 left-0 text-xs text-rose-400"
              aria-live="polite"
            >
              {errors.email}
            </Motion.span>
          )}
        </Motion.div>

        {/* SUBMIT */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            type="submit"
            className="w-[30%] sm:w-[40%] px-2 sm:px-4 py-1 mt-4 font-bold text-black bg-lime-400 border-3 border-gray-500/100 rounded-full hover:bg-white active:bg-white hover:text-black 
                    active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 
                      transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-zinc-400 text-sm sm:text-base"
          >
            <span className='sm:hidden'>Join</span>
            <span className='hidden sm:inline'>Subscribe</span>
          </button>
        </Motion.div>
      </form>
    </Motion.div>
  );
}