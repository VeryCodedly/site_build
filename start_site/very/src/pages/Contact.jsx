// import React, { useState, useRef } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';

// export default function ContactUs() {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState('');
//   const recaptchaRef = useRef(null);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus('Verifying CAPTCHA...');

//     try {
//       const token = await recaptchaRef.current.executeAsync();
//       recaptchaRef.current.reset();

//       const payload = { ...formData, recaptcha_token: token };

//       const response = await fetch('http://localhost:8000/api/contact/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         setStatus('✅ Message sent successfully!');
//         setFormData({ name: '', email: '', message: '' });
//       } else {
//         const data = await response.json();
//         setStatus(`❌ ${data.detail || 'Failed to send message'}`);
//       }
//     } catch (err) {
//       setStatus('❌ Network error or CAPTCHA failed.', err);
//     }
//   };

//   return (
//     <div className="bg-black min-h-screen py-20 px-6 font-inter text-gray-300">
//       <div className="max-w-3xl mx-auto text-center">
//         <h1 className="text-4xl font-bold text-lime-400 mb-4">Got questions? Want to say hi?</h1>
//         <p className="text-md text-gray-400 mb-10">Initiate first contact, human. We’d love to hear from you.</p>

//         <form className="space-y-6 text-left" onSubmit={handleSubmit}>
//           <label className="block">
//             <span className="block text-sm font-semibold text-gray-200 mb-1">Name</span>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               placeholder="Jane Coder"
//               maxLength={30}
//               className="w-md border-0 border-b-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
//             />
//           </label>

//           <label className="block">
//             <span className="block text-sm font-semibold text-gray-200 mb-1">Email</span>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="you@example.com"
//               maxLength={40}
//               className="w-md border-0 border-b-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
//             />
//           </label>

//           <label className="block">
//             <span className="block text-sm font-semibold text-gray-200 mb-1">Message</span>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               rows="5"
//               placeholder="Tell us everything. We’re listening..."
//               maxLength={500}
//               className="w-full border-0 border-b-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
//             />
//           </label>

//           <div className="text-center pt-10">
//             <button
//               type="submit"
//               className="cursor-pointer border-2 border-gray-500/100 px-9 py-1 rounded-full hover:bg-white hover:text-black hover:translate-y-1 shadow-[0_4px_0_0_#0f0] hover:shadow-[0_2px_0_0_#0f0] active:translate-y-0 transition-all duration-200"
//             >
//               Send Message
//             </button>
//           </div>
//         </form>

//         <p className="mt-4 text-sm text-lime-400">{status}</p>

//         <ReCAPTCHA
//           ref={recaptchaRef}
//           sitekey="6LfClVYrAAAAAB1B5tzkMIsZaIKsmb54WWjbvxqT"
//           size="invisible"
//         />

//         <p className="mt-8 text-sm text-gray-400">
//           We'll get back to you faster than a JavaScript runtime error.
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

// Optional: site key via env (make sure it's injected during build if using Vite or CRA)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SECRET_KEY || "6LfClVYrAAAAAB1B5tzkMIsZaIKsmb54WWjbvxqT";

export default function ContactUs() {

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaRef.current) return setStatus("CAPTCHA not ready. Please try again.");

    setLoading(true);
    setStatus('Verifying CAPTCHA...');

    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      const payload = { ...formData, recaptcha_token: token };

      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`❌ ${data.detail || 'Something went wrong. Please try again.'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Network or server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen py-20 px-6 font-inter text-gray-300">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-lime-400 mb-4">Got questions? Want to say hi?</h1>
        <p className="text-md text-gray-400 mb-10">Initiate first contact, human. We’d love to hear from you.</p>

        <form className="space-y-6 text-left" onSubmit={handleSubmit}>
          <label className="block">
            <span className="block text-sm font-semibold text-gray-200 mb-1">Name</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Jane Coder"
              maxLength={30}
              className="w-full border-0 border-b-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-semibold text-gray-200 mb-1">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              maxLength={40}
              className="w-full border-0 border-b-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-semibold text-gray-200 mb-1">Message</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Tell us everything. We’re listening..."
              maxLength={500}
              className="w-full border-0 border-b-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </label>

          <div className="text-center pt-10">
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer border-2 px-9 py-1 rounded-full shadow-[0_4px_0_0_#0f0] transition-all duration-200 
                ${loading
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'border-gray-500/100 hover:bg-white hover:text-black hover:translate-y-1 hover:shadow-[0_2px_0_0_#0f0]'
                }`}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-lime-400">{status}</p>

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_SITE_KEY}
          size="normal"
        />

        <p className="mt-8 text-sm text-gray-400">
          We'll get back to you faster than a JavaScript runtime error.
        </p>
      </div>
    </div>
  );
}
