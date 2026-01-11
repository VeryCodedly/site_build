import type { Metadata } from "next";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import { Providers } from '../../lib/providers';
import FloatingMenu from "./components/blog/FloatingMenu";
import SearchBar from "@/components/SearchBar";


async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

export const metadata: Metadata = {
  title: "Read",
  description: "Unfiltered takes on Tech, Code, Culture and everything in between. No cookies, no login, no tracking. Just good reads.",
  alternates: {
    canonical: "https://verycodedly.com/read",
  },
  openGraph: {
    title: "Read",
    description: "Unfiltered takes on Tech, Code, Culture and everything in between. No cookies, no login, no tracking. Just good reads.",
    siteName: 'VeryCodedly',
    url: "https://verycodedly.com/read",
    images: [{ url: "https://verycodedly.com/read/opengraph-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Read",
    description: "Unfiltered takes on Tech, Code, Culture and everything in between. No cookies, no login, no tracking. Just good reads.",
    images: ["https://verycodedly.com/read/twitter-image.png"],
    creator: '@verycodedly'
  },
};

export default async function ReadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const categories = await getCategories();
  return (
    <>
      {/* <Providers> */}
        <FloatingMenu categories={categories} />
        <SearchBar />
        {children}
      {/* </Providers> */}
    </>
  );
}
