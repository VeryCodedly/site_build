// app/blog/category/[slug]/layout.tsx
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${slug}/`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return {
      title: "Category Not Found | VeryCodedly",
      description: "This category doesn't exist... yet.",
    };
  }

  const category = await res.json();

  return {
    title: `${category.name} | VeryCodedly`,
    description: `Latest posts in ${category.name} — tech, code, culture, and beyond.`,
    openGraph: {
      title: `${category.name} | VeryCodedly`,
      description: `All posts in ${category.name}`,
      type: "website",
      images: ["/og-banner.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | VeryCodedly`,
      description: `Latest in ${category.name}`,
    },
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* You can add header/footer here later if needed */}
      {children}
    </div>
  );
}