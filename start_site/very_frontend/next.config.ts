// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['localhost', '127.0.0.1', 'verycodedly.com'],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/*  CSP (Fixed & Safe)  */
const cspProd = [
  "default-src 'self'",
  "base-uri 'self'",
  "block-all-mixed-content",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://res.cloudinary.com https://www.googletagmanager.com https://google-analytics.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://api.verycodedly.com https://res.cloudinary.com wss: https://www.google-analytics.com https://analytics.google.com",
  "frame-src 'self' https://www.youtube.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "worker-src 'self'",
].join("; ");

// Optional: Dev mode allows localhost
const cspDev = cspProd
  .replace(
    /connect-src[^;]*/,
    "connect-src 'self' http://localhost:8000 https://api.verycodedly.com https://res.cloudinary.com wss: https://www.google-analytics.com https://analytics.google.com"
  )
  .replace(
    /script-src[^;]*/,
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' https://www.googletagmanager.com https://www.google-analytics.com"
  );

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "payment=()",
      "usb=()",
      "bluetooth=()",
      "fullscreen=(self)",
      "clipboard-write=(self)",
      "browsing-topics=()",
      "interest-cohort=()",
    ].join(", "),
  },
];

/*  Next.js Config  */
const nextConfig: NextConfig = {
  reactStrictMode: !isDev,
  poweredByHeader: false,

  // LOW RAM + COOLIFY (revisit if miration)
  // output: isDev ? undefined : 'standalone',

  experimental: {
    scrollRestoration: true,
    // helps with memory during webpack build
    webpackMemoryOptimizations: !isDev,
  },

  productionBrowserSourceMaps: false, // (saves memory & size)
  compress: true, // recommended for ISR + performance

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },

  async headers() {
    const csp = isDev ? cspDev : cspProd;
    return [
    {
      source: "/_next/static/:path*",
      headers: [
        { 
          key: "Cache-Control", 
          value: "public, max-age=31536000, immutable" 
        },
      ],
    },
    // 4️⃣ Service worker
    {
      source: "/sw.js",
      headers: [
        { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        { key: "Cache-Control", value: "max-age=3600, must-revalidate" },
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
      ],
    },
    // 5️⃣ Manifest
    {
      source: "/manifest.json",
      headers: [
        { key: "Cache-Control", value: "public, s-maxage=600, stale-while-revalidate=60" },
      ],
    },
    // 6️⃣ Offline page and images
    {
      source: "/offline.html",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/images/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    // 7️⃣ All other pages (dynamic, API, etc.)
    {
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=59" },
        ...securityHeaders,
      ],
    },
    ];
  },
};

export default nextConfig;


 // {
      //   source: "/(.*)",
      //   headers: [
      //     { key: "Content-Security-Policy", value: csp },
      //     ...securityHeaders,
      //     // Add caching for CDN / ISR
      //     { key: "Cache-Control", value: "s-maxage=600, stale-while-revalidate=60" },
      //   ],
      // },
      // // Next.js static assets
      // {
      //   source: "/_next/static/(.*)",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable",
      //     },
      //   ],
      // },
      // // Fonts & media
      // {
      //   source: "/_next/static/media/(.*)",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable",
      //     },
      //   ],
      // },
      // {
      //   source: '/sw.js',
      //   headers: [
      //     {
      //       key: 'Content-Type',
      //       value: 'application/javascript; charset=utf-8',
      //     },
      //     {
      //       key: 'Cache-Control',
      //       value: 'max-age=3600, must-revalidate',
      //     },
      //     {
      //       key: 'Content-Security-Policy',
      //       value: "default-src 'self'; script-src 'self'",
      //     },
      //   ],
      // },
      // {
      //   source: "/manifest.json",
      //   headers: [{ key: "Cache-Control", value: "public, s-maxage=600, stale-while-revalidate=60" }],
      // },
      // {
      //   source: "/icons/:path*",
      //   headers: [{ key: "Cache-Control", value: "public, s-maxage=600, stale-while-revalidate=60" }],
      // },
      // {
      //   source: "/images/:path*",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable",
      //     },
      //   ],
      // }
      //   // 1️⃣ Next.js static JS chunks
    // {
    //   source: "/_next/static/chunks/(.*)",
    //   headers: [
    //     { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    //   ],
    // },
    // // 2️⃣ Next.js CSS chunks
    // {
    //   source: "/_next/static/css/(.*)",
    //   headers: [
    //     { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    //   ],
    // },
    // // 3️⃣ Fonts / media
    // {
    //   source: "/_next/static/media/(.*)",
    //   headers: [
    //     { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    //   ],
    // },