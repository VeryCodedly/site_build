import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Got a question, feedback, or just want to say hi? Drop us a message. We’ll get back to you.",
  alternates: {
    canonical: "https://verycodedly.com/contact",
  },
  openGraph: {
    title: "Contact",
    description: "Got a question, feedback, or just want to say hi? Drop us a message. We’ll get back to you.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/contact",
    images: [{ url: "https://verycodedly.com/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description: "Got a question, feedback, or just want to say hi? Drop us a message. We’ll get back to you.",
    images: ["https://verycodedly.com/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
