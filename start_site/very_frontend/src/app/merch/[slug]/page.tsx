import ProductClient from "./ProductClient";
import Link from "next/link";
import Script from "next/script";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/store/products/${slug}/`, {
      next: { revalidate: 300 }   // 5 minutes
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getRelatedProducts(category: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/store/products/?category=${category}`,
      { next: { revalidate: 1800 } } // cache: "no-store",
    );

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return (
      <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Product not found.
          </p>

          <Link
            href="/merch"
            className="text-lime-400 hover:text-white transition-colors"
          >
            Continue shopping →
          </Link>
        </div>
      </section>
    );
  }

  const relatedProducts = await getRelatedProducts(
    product.category
  );

  return (
    <>
      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.fancy_name,
          "description": product.tagline,
          "image": [
            product.preview_image
          ],
          "url": `https://verycodedly.com/merch/${product.slug}`,
          "brand": {
            "@type": "Brand",
            "name": "VeryCodedly"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://verycodedly.com/merch/${product.slug}`,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock"
          }
        })}
      </Script>
      <Script id="product-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "VeryCodedly | Tech. Code. Culture.",
              "item": "https://verycodedly.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "VeryCodedly Supply",
              "item": "https://verycodedly.com/merch"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": `${product.fancy_name} | VeryCodedly Supply`,
              "item": `https://verycodedly.com/merch/${product.slug}`
            }
          ]
        })}
      </Script>
      <ProductClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}