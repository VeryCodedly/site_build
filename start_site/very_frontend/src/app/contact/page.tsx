// 'use client';

// import { motion as Motion } from 'framer-motion';
// import { useState } from 'react';

// export default function ContactPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState<{ type: 'error' | null; message?: string }>({ type: null });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const { name, email, message } = formData;

//     if (!name.trim() || !email.trim() || !message.trim()) {
//       setStatus({ type: 'error', message: 'Please fill out all fields.' });
//       return;
//     }

//     // Generate mailto link with pre-filled data
//     const subject = encodeURIComponent('Message from VeryCodedly Site');
//     const body = encodeURIComponent(`Hi!\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
//     const mailtoLink = `mailto:verycodedly@gmail.com?subject=${subject}&body=${body}`;

//     // Open default mail app
//     window.location.href = mailtoLink;

//     // Reset form and clear status
//     setFormData({ name: '', email: '', message: '' });
//     setStatus({ type: null });
//   };

//   return (
//     <section className="relative min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
//       <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>
//       <Motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="group max-w-3xl mx-auto rounded-2xl p-8 sm:p-10 text-center space-y-6 sm:space-y-8 border-2 border-gray-700/60 bg-white/3 
//                   backdrop-blur-lg shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] focus:outline-none focus:ring-2 
//                   focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20 transition-all duration-300"
//         tabIndex={0}
//         role="region"
//         aria-label="Contact Us Section"
//       >
//         <Motion.h2
//           className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Contact Us
//         </Motion.h2>

//         <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
//           Got a question, feedback, or just want to say hi? Drop us a message and we’ll get back to you.
//           {/*  whenever lol */}
//         </p>

//         {status.type && (
//           <Motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.2 }}
//             className="p-3 rounded-lg text-sm bg-rose-500/10 text-rose-400 border border-rose-500/30"
//           >
//             {status.message}
//           </Motion.div>
//         )}

//         <form className="space-y-6" onSubmit={handleSubmit} noValidate>
//           <Motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//           >
//             <label htmlFor="contact-name" className="block text-sm sm:text-base text-gray-400 mb-2 text-start">
//               {/* Name */}
//             </label>
//             <input
//               id="contact-name"
//               name="name"
//               type="text"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 rounded-lg bg-white/5 border-2 border-gray-700/60 text-white placeholder-gray-500 
//                          focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
//                          transition-all duration-300"
//               autoComplete="name"
//               required
//             />
//           </Motion.div>

//           <Motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             <label htmlFor="contact-email" className="block text-sm sm:text-base text-gray-400 mb-2">
//               {/* Email */}
//             </label>
//             <input
//               id="contact-email"
//               name="email"
//               type="email"
//               placeholder="Your Email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 rounded-lg bg-white/5 border-2 border-gray-700/60 text-white placeholder-gray-500 
//                          focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
//                          transition-all duration-300"
//               autoComplete="email"
//               required
//             />
//           </Motion.div>

//           <Motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <label htmlFor="contact-message" className="block text-sm sm:text-base text-gray-400 mb-2">
//               {/* Message */}
//             </label>
//             <textarea
//               id="contact-message"
//               name="message"
//               placeholder="Your Message"
//               rows={5}
//               value={formData.message}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 rounded-lg bg-white/5 border-2 border-gray-700/60 text-white placeholder-gray-500 
//                          focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/10
//                          transition-all duration-300 resize-vertical"
//               required
//             />
//           </Motion.div>

//           <Motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//           >
//             <Motion.button
//               type="submit"
//               className="font-semibold cursor-pointer border-3 border-gray-500/100 bg-lime-400 px-7 py-1 rounded-full text-black hover:bg-white active:bg-white
//                       active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
//             >
//               <span className="md:hidden">Send</span>
//               <span className="hidden md:inline">Send Message</span>
//             </Motion.button>
//           </Motion.div>
//         </form>
//       </Motion.div>
//     </section>
//   );
// }
// 'use client';

// import { motion as Motion } from 'framer-motion';
// import { useState, useEffect, useCallback } from 'react';

// type FormData = { name: string; email: string; message: string };
// type Errors = Partial<Record<keyof FormData, string>>;

// export default function ContactPage() {
//   const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
//   const [errors, setErrors] = useState<Errors>({});
//   const [status, setStatus] = useState<{ type: 'error' | null; message?: string }>({ type: null });

//   // ---------- Validation helpers ----------
//   const validate = useCallback(() => {
//     const newErrors: Errors = {};

//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     else if (formData.name.trim().length < 2) newErrors.name = 'Name must be ≥ 2 characters';

//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       newErrors.email = 'Enter a valid email address';

//     if (!formData.message.trim()) newErrors.message = 'Message is required';
//     else if (formData.message.trim().length < 10)
//       newErrors.message = 'Message must be ≥ 10 characters';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData]);

//   // ---------- Real-time validation ----------
//   useEffect(() => {
//     validate();
//   }, [validate]);

//   // ---------- Input change ----------
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // clear error for this field immediately
//     setErrors((prev) => ({ ...prev, [name as keyof FormData]: undefined }));
//   };

//   // ---------- Submit ----------
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const isValid = validate();
//     if (!isValid) {
//       setStatus({ type: 'error', message: 'Please fix the errors above.' });
//       return;
//     }

//     // ---- mailto ----
//     const subject = encodeURIComponent('Message from VeryCodedly Site');
//     const body = encodeURIComponent(
//       `Hi!\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
//     );
//     const mailtoLink = `mailto:verycodedly@gmail.com?subject=${subject}&body=${body}`;
//     window.location.href = mailtoLink;

//     // Reset
//     setFormData({ name: '', email: '', message: '' });
//     setStatus({ type: null });
//   };

//   return (
//     <section className="relative min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
//       <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>

//       <Motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="group max-w-3xl mx-auto rounded-2xl p-8 sm:p-10 text-center space-y-6 sm:space-y-8 border-2 border-gray-700/60 bg-white/3 
//                   backdrop-blur-lg shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] focus:outline-none focus:ring-2 
//                   focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20 transition-all duration-300"
//         tabIndex={0}
//         role="region"
//         aria-label="Contact Us Section"
//       >
//         <Motion.h2
//           className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Contact Us
//         </Motion.h2>

//         <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
//           Got a question, feedback, or just want to say hi? Drop us a message and we’ll get back to you.
//         </p>

//         {/* Global error */}
//         {status.type && (
//           <Motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.2 }}
//             className="p-3 rounded-lg text-sm bg-rose-500/10 text-rose-400 border border-rose-500/30"
//           >
//             {status.message}
//           </Motion.div>
//         )}

//         <form className="space-y-6" onSubmit={handleSubmit} noValidate>
//           {/* ---------- NAME ---------- */}
//           <Motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0, ...(errors.name && { x: [-5, 5, -5, 5, 0] }) }}
//             transition={{ duration: 0.4, delay: 0.3, ...(errors.name && { x: { duration: 0.4, repeat: 1 } }) }}
//             className="relative"
//           >
//             <input
//               id="contact-name"
//               name="name"
//               type="text"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-3 rounded-lg bg-white/5 border-2 text-white placeholder-gray-500 
//                          focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
//                          transition-all duration-300 ${
//                            errors.name ? 'border-rose-500/70' : 'border-gray-700/60'
//                          }`}
//               autoComplete="name"
//               required
//             />
//             {errors.name && (
//               <Motion.span
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                 aria-live="polite"
//               >
//                 {errors.name}
//               </Motion.span>
//             )}
//           </Motion.div>

//           {/* ---------- EMAIL ---------- */}
//           <Motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0, ...(errors.email && { x: [-5, 5, -5, 5, 0] }) }}
//             transition={{ duration: 0.5, delay: 0.4, ...(errors.email && { x: { duration: 0.4, repeat: 1 } }) }}
//             className="relative"
//           >
//             <input
//               id="contact-email"
//               name="email"
//               type="email"
//               placeholder="Your Email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-3 rounded-lg bg-white/5 border-2 text-white placeholder-gray-500 
//                          focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
//                          transition-all duration-300 ${
//                            errors.email ? 'border-rose-500/70' : 'border-gray-700/60'
//                          }`}
//               autoComplete="email"
//               required
//             />
//             {errors.email && (
//               <Motion.span
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                 aria-live="polite"
//               >
//                 {errors.email}
//               </Motion.span>
//             )}
//           </Motion.div>

//           {/* ---------- MESSAGE ---------- */}
//           <Motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0, ...(errors.message && { x: [-5, 5, -5, 5, 0] }) }}
//             transition={{ duration: 0.5, delay: 0.5, ...(errors.message && { x: { duration: 0.4, repeat: 1 } }) }}
//             className="relative"
//           >
//             <textarea
//               id="contact-message"
//               name="message"
//               placeholder="Your Message"
//               rows={5}
//               value={formData.message}
//               onChange={handleInputChange}
//               className={`w-full px-4 py-3 rounded-lg bg-white/5 border-2 text-white placeholder-gray-500 
//                          focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/10
//                          transition-all duration-300 resize-vertical ${
//                            errors.message ? 'border-rose-500/70' : 'border-gray-700/60'
//                          }`}
//               required
//             />
//             {errors.message && (
//               <Motion.span
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                 aria-live="polite"
//               >
//                 {errors.message}
//               </Motion.span>
//             )}
//           </Motion.div>

//           {/* ---------- SUBMIT ---------- */}
//           <Motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center items-center"
//           >
//             <Motion.button
//               type="submit"
//               disabled={Object.keys(errors).length > 0}
//               className="font-semibold cursor-pointer mt-3 border-3 border-gray-500/100 bg-lime-400 px-7 py-1 rounded-full text-black hover:bg-white active:bg-white
//                       active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
//             >
//               <span className="md:hidden">Send</span>
//               <span className="hidden md:inline">Send Message</span>
//             </Motion.button>
//           </Motion.div>
//         </form>
//       </Motion.div>
//     </section>
//   );
// }
'use client';

import { motion as Motion } from 'framer-motion';
import { useState, useCallback } from 'react';

type FormData = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [showErrors, setShowErrors] = useState(false); // Only show after submit
  const [status, setStatus] = useState<{ type: 'error' | null; message?: string }>({ type: null });

  // ---------- Validation (runs only on submit) ----------
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

  // ---------- Input Change ----------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when typing (but don't show until submit)
    if (showErrors) {
      setErrors((prev) => ({ ...prev, [name as keyof FormData]: undefined }));
    }
  };

  // ---------- Submit ----------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowErrors(true); // Now show errors
    const isValid = validate();

    if (!isValid) {
      setStatus({ type: 'error', message: 'Please fix the errors below.' });
      return;
    }

    // ---- mailto ----
    const subject = encodeURIComponent('Message from VeryCodedly Site');
    const body = encodeURIComponent(
      `Hi!\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    const mailtoLink = `mailto:verycodedly@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    // Reset
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setShowErrors(false);
    setStatus({ type: null });
  };

  // const hasErrors = Object.keys(errors).length > 0;

  return (
    <section className="relative min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60"></div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="group max-w-3xl mx-auto rounded-2xl p-8 sm:p-10 text-center space-y-6 sm:space-y-8 border-2 border-gray-700/60 bg-white/3 
                  backdrop-blur-lg shadow-[0_5px_10px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] focus:outline-none focus:ring-2 
                  focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20 transition-all duration-300"
        tabIndex={0}
        role="region"
        aria-label="Contact Us Section"
      >
        <Motion.h2
          className="text-3xl sm:text-4xl font-black text-lime-400 group-hover:scale-105 group-active:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </Motion.h2>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Got a question, feedback, or just want to say hi? Drop us a message. We’ll get back to you.
        </p>

        {/* Global error */}
        {status.type && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="p-3 rounded-lg text-sm bg-rose-500/10 text-rose-400 border border-rose-500/30"
          >
            {status.message}
          </Motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {/* ---------- NAME ---------- */}
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
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border-2 text-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                         transition-all duration-300 ${
                           showErrors && errors.name ? 'border-rose-500/70' : 'border-gray-700/60'
                         }`}
              autoComplete="name"
              required
            />
            {showErrors && errors.name && (
              <Motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 left-0 text-xs text-rose-400"
                aria-live="polite"
              >
                {errors.name}
              </Motion.span>
            )}
          </Motion.div>

          {/* ---------- EMAIL ---------- */}
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
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border-2 text-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/20
                         transition-all duration-300 ${
                           showErrors && errors.email ? 'border-rose-500/70' : 'border-gray-700/60'
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

          {/* ---------- MESSAGE ---------- */}
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
            <textarea
              id="contact-message"
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border-2 text-white placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-lime-300/50 focus:ring-offset-2 focus:ring-offset-white/10
                         transition-all duration-300 resize-vertical ${
                           showErrors && errors.message ? 'border-rose-500/70' : 'border-gray-700/60'
                         }`}
              required
            />
            {showErrors && errors.message && (
              <Motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 left-0 text-xs text-rose-400"
                aria-live="polite"
              >
                {errors.message}
              </Motion.span>
            )}
          </Motion.div>

          {/* ---------- SUBMIT BUTTON ---------- */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Motion.button
              type="submit"
              // disabled={showErrors && hasErrors}
              className="font-semibold cursor-pointer mt-3 border-3 border-gray-500/100 bg-lime-400 px-7 py-1 rounded-full text-black hover:bg-white 
                      active:bg-white active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:shadow-[0_2px_0_0_#00ff00] 
                        active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
            >
              <span className="md:hidden">Send</span>
              <span className="hidden md:inline">Send Message</span>
            </Motion.button>
          </Motion.div>
        </form>
      </Motion.div>
    </section>
  );
}