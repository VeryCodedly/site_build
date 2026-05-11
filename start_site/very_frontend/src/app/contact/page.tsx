'use client';

import { motion as Motion } from 'framer-motion';
import { useState, useCallback } from 'react';

type FormData = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | null; message?: string }>({ type: null });

  const validate = useCallback(() => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be ≥ 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address';

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10)
      newErrors.message = 'Message must be ≥ 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (showErrors) {
      setErrors((prev) => ({ ...prev, [name as keyof FormData]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrors(true);
    const isValid = validate();

    if (!isValid) {
      setStatus({ type: 'error', message: 'Please fix the errors below.' });
      return;
    }

    const subject = encodeURIComponent('Message from the VeryCodedly Site');
    const body = encodeURIComponent(
      `Hi!\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    window.location.href = `mailto:connect@verycodedly.com?subject=${subject}&body=${body}`;

    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setShowErrors(false);
    setStatus({ type: null });
  };

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-stretch opacity-60 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 sm:p-12 border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Motion.h2
            className="text-3xl sm:text-4xl font-black text-lime-400 text-center"
            whileHover={{ scale: 1.02 }}
          >
            Contact Us
          </Motion.h2>

          <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed text-center">
            Got a question, feedback, or just want to say hi? Drop us a message. We’ll get back to you.
          </p>

          {status.type && (
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 rounded-lg text-sm bg-rose-500/10 text-rose-400 border border-rose-500/30"
            >
              {status.message}
            </Motion.div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Name field */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                ...(showErrors && errors.name && { x: [-5, 5, -5, 5, 0] })
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ...(showErrors && errors.name && { x: { duration: 0.4, repeat: 1 } })
              }}
              className="relative"
            >
              <label className="block text-xs text-gray-500 mb-1">Your Name</label>
              <input
                name="name"
                type="text"
                placeholder="Human Person"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                  ${showErrors && errors.name ? 'border-rose-500' : 'border-gray-700/60'}`}
                autoComplete="name"
              />
              {showErrors && errors.name && (
                <Motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-0 text-xs text-rose-400"
                >
                  {errors.name}
                </Motion.span>
              )}
            </Motion.div>

            {/* Email field */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
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
              <label className="block text-xs text-gray-500 mb-1">Your Email</label>
              <input
                name="email"
                type="email"
                placeholder="humanperson@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                  ${showErrors && errors.email ? 'border-rose-500' : 'border-gray-700/60'}`}
                autoComplete="email"
              />
              {showErrors && errors.email && (
                <Motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-0 text-xs text-rose-400"
                >
                  {errors.email}
                </Motion.span>
              )}
            </Motion.div>

            {/* Message field */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                ...(showErrors && errors.message && { x: [-5, 5, -5, 5, 0] })
              }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ...(showErrors && errors.message && { x: { duration: 0.4, repeat: 1 } })
              }}
              className="relative"
            >
              <label className="block text-xs text-gray-500 mb-1">Your Message</label>
              <textarea
                name="message"
                placeholder="Hello fellow human..."
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300 resize-vertical
                  ${showErrors && errors.message ? 'border-rose-500' : 'border-gray-700/60'}`}
              />
              {showErrors && errors.message && (
                <Motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-0 text-xs text-rose-400"
                >
                  {errors.message}
                </Motion.span>
              )}
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center"
            >
              <button
                type="submit"
                className="font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 px-8 py-1 rounded-full text-black hover:bg-white 
                  active:bg-white active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] 
                  active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
              >
                Send Message
              </button>
            </Motion.div>
          </form>
        </Motion.div>
      </div>
    </section>
  );
}