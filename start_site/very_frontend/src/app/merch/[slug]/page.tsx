import ProductClient from "./ProductClient";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/store/products/${slug}/`, {
      cache: "no-store",
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

          <a
            href="/merch"
            className="text-lime-400 hover:text-white transition-colors"
          >
            Continue shopping →
          </a>
        </div>
      </section>
    );
  }

  const relatedProducts = await getRelatedProducts(
    product.category
  );

  return (
    <ProductClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}