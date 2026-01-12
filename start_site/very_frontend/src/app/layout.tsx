import type { Metadata } from "next";
import localFont from 'next/font/local';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import Header from "@/components/Header";
import TopButton from "@/components/TopButton";
import Footer from "@/components/Footer";
import ServiceWorkerRegister from './sw-register';


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
  description: "Tech. Code. Culture. VeryCodedly is your go-to tech hub for hardware deep-dives, free coding courses, unfiltered takes and the latest digital trends. No cookies, no login, no tracking.",
  metadataBase: new URL("https://verycodedly.com"),
  manifest: '/manifest.json',
  alternates: {
    canonical: "https://verycodedly.com",
    languages: {
      'en-US': 'https://verycodedly.com/en-US',
    }
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
    title: 'VeryCodedly | Tech. Code. Culture. From the inside.',
    description: "Tech. Code. Culture. VeryCodedly is your go-to tech hub for hardware deep-dives, free coding courses, unfiltered takes and the latest digital trends. No cookies, no login, no tracking.",
    url: 'https://verycodedly.com',
    siteName: 'VeryCodedly',
    images: [{ url: 'https://verycodedly.com/opengraph-image.png' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "VeryCodedly | Tech. Code. Culture. From the inside.",
    description: "Tech. Code. Culture. VeryCodedly is your go-to tech hub for hardware deep-dives, free coding courses, unfiltered takes and the latest digital trends. No cookies, no login, no tracking.",
    images: ["https://verycodedly.com/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-scrollbar">
      <head>
        <link rel="manifest" href="/manifest.json" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
        <meta name="apple-mobile-web-app-title" content="VeryCodedly" />
        <meta name="theme-color" content="#000000" />

        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />

        {/* <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "9a2f443e5bad423184ad04e9c0146df"}'>
        </script> */}

      </head>
      <body className={`${pops.variable} ${robo.variable} ${geist.variable} antialiased`}>
        <Header />
        <ServiceWorkerRegister />
        {children}
        <TopButton />
        <Footer />
      </body>
    </html>
  );
}

// Tech. Code. Culture. We’re your friendly neighborhood tech hub — decoding the stories, tools, and trends shaping the future of the web.