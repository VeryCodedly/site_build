// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['localhost', '127.0.0.1', 'verycodedly.com'],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/*  CSP (Fixed & Safe)  */
const cspBase = [
  "default-src 'self'",
  "base-uri 'self'",
  "block-all-mixed-content",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://res.cloudinary.com https://verycodedly.com https://api.verycodedly.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' https://res.cloudinary.com https://*.vercel.app https://verycodedly.com https://api.verycodedly.com https://vitals.vercel-insights.com",
  "style-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://api.verycodedly.com https://res.cloudinary.com https://vitals.vercel-insights.com wss:",
  "frame-src 'self' https://www.youtube.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "worker-src 'self'",
].join("; ");

// Optional: Dev mode allows localhost
const cspDev = cspBase
  .replace(
    /img-src[^;]*/,
    "img-src 'self' data: blob: http://localhost:8000 http://127.0.0.1:8000 https://res.cloudinary.com https://verycodedly.com https://api.verycodedly.com"
  )
  .replace(
    /script-src[^;]*/,
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' http://localhost:8000 https://res.cloudinary.com https://*.vercel.app https://verycodedly.com https://api.verycodedly.com https://vitals.vercel-insights.com"
  )
  .replace(
    /connect-src[^;]*/,
    "connect-src 'self' http://localhost:8000 http://127.0.0.1:8000 https://api.verycodedly.com https://res.cloudinary.com https://vitals.vercel-insights.com ws://localhost:8000 wss:"
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
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "verycodedly.com", pathname: "/**" },
      // { protocol: "https", hostname: "api.verycodedly.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/**" },
    ],
  },

  async headers() {
    const csp = isProd ? cspBase : cspDev;
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp }, 
          ...securityHeaders,
        ],
      },
      {
        source: "/manifest.json",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;