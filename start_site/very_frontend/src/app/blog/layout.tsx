import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import "./globals.css";
import { Providers } from '../../lib/providers';
// import BlogHeader from "@/app/blog/components/blog/BlogHeader";


config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Blog  |  VeryCodedly",
  description: "Your friendly neighborhood tech hub.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang='en'>
      <div className="flex flex-col">
        {/* <BlogHeader /> */}
          <Providers>{children}</Providers>
      </div>
    // </html>
  );
}
