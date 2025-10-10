import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsletterCard from "./NewsletterCard";
import { div } from "framer-motion/client";

export default function SideNav() {
  const [showSidebar, setShowSidebar] = useState(true);

  // Auto-collapse sidebar after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSidebar(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-64 border-r border-gray-200 dark:border-gray-800 md:flex flex-col justify-between">
    <motion.aside>
      animate={{ width: showSidebar ? 220 : 60 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-950 border-r border-lime-400 p-2 overflow-hidden"
      >
      <nav className="p-4 space-y-2">
        {/* Sidebar */}
   
        <h2 className="text-sm font-semibold text-gray-500 uppercase">Categories</h2>
        <ul className="space-y-1 text-sm">
          <li><a href="#" className="hover:text-lime-500">AI & ML</a></li>
          <li><a href="#" className="hover:text-lime-500">Web Dev</a></li>
          <li><a href="#" className="hover:text-lime-500">Mobile</a></li>
          <li><a href="#" className="hover:text-lime-500">Gadgets</a></li>
          <li><a href="#" className="hover:text-lime-500">International 🌍</a></li>
          <li><a href="#" className="hover:text-lime-500">Startups</a></li>
          <li><a href="#" className="hover:text-lime-500">Opinion</a></li>
        </ul>

        <h2 className="mt-6 text-sm font-semibold text-gray-500 uppercase">Dev Corner</h2>
        <ul className="space-y-1 text-sm">
          <li><a href="#" className="hover:text-lime-500">Tutorials</a></li>
          <li><a href="#" className="hover:text-lime-500">Tools</a></li>
          <li><a href="#" className="hover:text-lime-500">Snippets</a></li>
        </ul>
      </nav>

      {/* Newsletter CTA */}
      <NewsletterCard />
    </motion.aside>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function BlogLayout({ children }: { children: React.ReactNode }) {
//   const [collapsed, setCollapsed] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCollapsed(true);
//     }, 3000); // auto-collapse after 3s
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
//       {/* Sidebar */}
//       <aside
//         className={`relative transition-all duration-500 ease-in-out 
//         ${collapsed ? "w-12" : "w-64"} bg-white dark:bg-gray-800 shadow-lg`}
//       >
//         {/* Toggle */}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-lime-400 text-black flex items-center justify-center shadow hover:scale-105 transition"
//         >
//           {collapsed ? "»" : "«"}
//         </button>

//         {/* Sidebar Content */}
//         <nav className="mt-12 space-y-4 px-4">
//           <Link href="/category/ai" className="block hover:text-lime-400">
//             {collapsed ? "🤖" : "AI & Machine Learning"}
//           </Link>
//           <Link href="/category/dev" className="block hover:text-lime-400">
//             {collapsed ? "💻" : "Dev Zone"}
//           </Link>
//           <Link href="/category/international" className="block hover:text-lime-400">
//             {collapsed ? "🌍" : "International Tech"}
//           </Link>
//           <Link href="/category/startups" className="block hover:text-lime-400">
//             {collapsed ? "🚀" : "Startups"}
//           </Link>
//           <Link href="/category/culture" className="block hover:text-lime-400">
//             {collapsed ? "🎭" : "Tech Culture"}
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow px-6 py-3 flex justify-between items-center">
//           <Link href="/" className="font-bold text-lg">Very Codedly</Link>
//           <div className="flex gap-4 items-center">
//             <input
//               type="text"
//               placeholder="Search…"
//               className="hidden md:block rounded px-2 py-1 border dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
//             />
//             <button className="px-3 py-1 rounded bg-lime-400 text-black">Subscribe</button>
//             <button className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700">🌙</button>
//           </div>
//         </header>

//         {/* Page Content */}
//         <div className="flex-1 px-6 py-4">{children}</div>
        
//       </main>
//     </div>
//   );
// }
