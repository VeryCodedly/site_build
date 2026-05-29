// app/merch/[slug]/layout.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

async function getProduct(slug: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) return null;
    
    const res = await fetch(`${API_URL}/store/products/${slug}/`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The merch you are looking for could not be found.',
    };
  }

  const title = `${product.fancy_name} | VeryCodedly`;
  const description = product.tagline || `Make the ${product.fancy_name} look even better.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://verycodedly.com/merch/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://verycodedly.com/merch/${slug}`,
      images: [
        { url: product.preview_image || 'https://verycodedly.com/og-image.png' },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Merch",
      description: product.tagline || `Make the ${product.fancy_name} look even better.`,
      images: ["https://verycodedly.com/twitter-image.png"],
      creator: '@verycodedly'
    },
  };
}

export default async function MerchProductLayout({ children, params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return <>{children}</>;
}