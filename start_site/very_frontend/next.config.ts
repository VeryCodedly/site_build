// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['localhost', '127.0.0.1', 'verycodedly.com'],
//   },
// };

// export default nextConfig;

// next.config.ts

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Content-Security-Policy:
 * - production: tight, allows Cloudinary, domain, Vercel previews, and API.
 * - development: adds localhost (http) for images & API/connect while you run Django locally.
 *
 * NOTE: CSP is strict — if you add third-party scripts (analytics, widgets), you'll need to
 * add those hostnames to script-src/connect-src/img-src as appropriate.
 */

const cspProd = [
  "default-src 'self'",
  "base-uri 'self'",
  "block-all-mixed-content",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://res.cloudinary.com https://verycodedly.com https://api.verycodedly.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://res.cloudinary.com https://*.vercel.app https://verycodedly.com https://api.verycodedly.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "connect-src 'self' https://api.verycodedly.com https://res.cloudinary.com wss:",
  "frame-ancestors 'self'",
  "form-action 'self'",
].join("; ");

const cspDev = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: http://localhost:8000 http://127.0.0.1:8000 https://res.cloudinary.com https://verycodedly.com https://api.verycodedly.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://res.cloudinary.com https://*.vercel.app https://verycodedly.com http://localhost:8000",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "connect-src 'self' http://localhost:8000 http://127.0.0.1:8000 https://api.verycodedly.com https://res.cloudinary.com ws://localhost:8000 wss:",
  "frame-ancestors 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "verycodedly.com", pathname: "/**" },
      { protocol: "https", hostname: "www.verycodedly.com", pathname: "/**" },
      { protocol: "https", hostname: "api.verycodedly.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/media/**" },
      { protocol: "https", hostname: "verycodedly.com", pathname: "/media/**" },
    ],
  },

  async headers() {
    const csp = isProd ? cspProd : cspDev;
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          ...securityHeaders,
        ],
      },
    ];
  },
};

export default nextConfig;