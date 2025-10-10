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
  title: "VeryCodedly",
  description: "Your friendly neighborhood tech hub.",
  metadataBase: new URL("https://verycodedly.com"),
  alternates: {
    canonical: "/",
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
