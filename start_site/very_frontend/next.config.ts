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
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          },
        ],
      },
      {
        source: "/_next/image/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          },
        ],
      },
      {
        source: "/(images|logos|icons|screenshots|favicon.ico|apple-touch-icon.png|manifest.json|offline.html)/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(about|community|connect|contact|faqs|support|know|privacy|terms|merch|thank-you|start)/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=604800, stale-while-revalidate=86400"
          },
        ],
      },
      // 4️⃣ Service worker
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "max-age=0, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
      {
        source: "/read/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400"
          },
        ],
      },
      {
        source: "/learn/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=21600, stale-while-revalidate=86400"
          },
        ],
      },
      // 7️⃣ All other pages (dynamic, API, etc.)
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Cache-Control", value: "public, s-maxage=60, stale-while-revalidate=86400" },
          ...securityHeaders,
        ],
      },
    ];
  },
};

export default nextConfig;
