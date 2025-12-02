import type { Metadata } from "next";
import localFont from 'next/font/local';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Header from "@/components/Header";
import TopButton from "@/components/TopButton";
import Footer from "@/components/Footer";

config.autoAddCss = false;

const pops = localFont({
  src: "../fonts/poppins-v23-latin-900.woff2",
  weight: "900",
  style: "normal",
  variable: "--font-pops",
  display: "swap",
});

const robo = localFont({
  src: "../fonts/roboto-mono-v30-latin-regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-robo",
  display: "swap",
});

const geist = localFont({
  src: "../fonts/geist-mono-v3-latin-900.woff2",
  weight: "900",
  style: "normal",
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: 'VeryCodedly', template: '%s | VeryCodedly' },
  description: "Tech. Code. Culture. We’re your go-to tech hub for all things digital, from coding tips to the latest tech trends.",
  metadataBase: new URL("https://verycodedly.com"),
  manifest: '/manifest.json',
  alternates: {
    canonical: "https://verycodedly.com",
    languages: {
      'en-US': 'https://verycodedly.com/en-US',
    }
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  keywords: [
    "tech",
    "coding",
    "software development",
    "programming",
    "ai",
    "tech news",
    "tech stories",
    "developer tools",
    "web development",
    "trending tech",
    "tech blog",
  ],
  openGraph: {
    title: 'VeryCodedly',
    description: "Tech. Code. Culture. We’re your go-to tech hub for all things digital, from coding tips to the latest tech trends.",
    url: 'https://verycodedly.com',
    siteName: 'VeryCodedly',
    images: [{ url: 'https://verycodedly.com/opengraph-image.png' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "VeryCodedly",
    description: "Tech. Code. Culture. We’re your go-to tech hub for all things digital, from coding tips to the latest tech trends.",
    images: ["https://verycodedly.com/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.verycodedly.com/api" />

        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />

        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="VeryCodedly" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "9a2f443e5bad423184ad04e9c0146df"}'>
        </script> */}

      </head>
      <body className={`${pops.variable} ${robo.variable} ${geist.variable} antialiased`}>
        <Header />
        {children}
        <TopButton />
        <Footer />
      </body>
    </html>
  );
}

// Tech. Code. Culture. We’re your friendly neighborhood tech hub — decoding the stories, tools, and trends shaping the future of the web.