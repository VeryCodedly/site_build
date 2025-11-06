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
  description: "Your friendly neighborhood tech hub.",
  metadataBase: new URL("https://verycodedly.com"),
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
    "modern technology"
  ],
  openGraph: {
    title: 'VeryCodedly',
    description: 'Your friendly neighborhood tech hub.',
    url: 'https://verycodedly.com',
    siteName: 'VeryCodedly',
    images: [
      {
        url: 'https://verycodedly.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: "Learn | VeryCodedly",
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "VeryCodedly",
    description: "Your friendly neighborhood tech hub.",
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
      <body className={`${pops.variable} ${robo.variable} ${geist.variable} antialiased`}>
        <Header />
        {children}
        <TopButton />
        <Footer />
      </body>
    </html>
  );
}
