import type { Metadata } from "next";
import localFont from 'next/font/local';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Header from "@/components/Header";
import TopButton from "@/components/TopButton";
import Footer from "@/components/Footer";
import Head from "next/head";


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
  description: "Tech. Code. Culture. We’re your friendly neighborhood tech hub for all things digital.",
  metadataBase: new URL("https://verycodedly.com"),
  manifest: '/manifest.json',
  alternates: {
    canonical: "/",
    languages: {
      'en-US': 'https://verycodedly.com/en-US',
    }
  },
  keywords: [
    "tech news",
    "software trends",
    "ai updates",
    "tech culture",
    "programming tips",
    "tech stories",
    "developer insights",
    "smart gadgets",
    "tech explained",
    "modern tech"
  ],
  openGraph: {
    title: 'VeryCodedly',
    description: 'Tech. Code. Culture. We’re your friendly neighborhood tech hub for all things digital.',
    url: 'https://verycodedly.com',
    siteName: 'VeryCodedly',
    images: [{ url: 'https://verycodedly.com/opengraph-image.png' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "VeryCodedly",
    description: "Tech. Code. Culture. We’re your friendly neighborhood tech hub for all things digital.",
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
      <head />
      <Head>
        {/* PWA Manifest */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
        
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="VeryCodedly" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        <meta name="theme-color" content="#000000" />
      </Head>
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