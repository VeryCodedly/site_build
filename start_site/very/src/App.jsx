// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import Home from './pages/Home.jsx';
// import Blog from './pages/Blog.jsx';
// import About from './pages/About.jsx';
// import Contact from './pages/Contact.jsx';
// import Footer from './components/Footer.jsx';

// export default function App() {
//   return (
//     <div className="bg-obsidian text-off-white min-h-screen flex flex-col">
//       <header className="px-6 py-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">Home</Link>
//         <nav className="space-x-6">
//           <Link to="/about" className="hover:text-neon">About</Link>
//           <Link to="/blog" className="hover:text-neon">Blog</Link>
//           <Link to="/contact" className="hover:text-neon">Contact</Link>
//         </nav>
//       </header>

//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import React from "react";
import { Routes, Route } from 'react-router-dom';
import "./index.css";
import Layout from './components/Layout';
import Home from './components/Home.jsx';
import About from './pages/About';
import Blog from './pages/Blog';
import Support from './pages/Support';
import CommunityChat from './pages/CommunityChat.jsx';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/404.jsx';

export default function App() {

  return (
    <>
    {/* <main className="scroll-smooth flex-grow min-h-screen bg-black text-white font-noto relative"> */}
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="support" element={<Support />} />
        <Route path="community" element={<CommunityChat />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
      {/* // <Home /> */}
      
     {/* </main> */}
    </>
  );
}
