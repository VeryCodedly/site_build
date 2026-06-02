import StoreClient from "./StoreClient";
import Script from "next/script";

async function getProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/store/products/`, {
      next: { revalidate: 300 }
      // cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load products");
    }

    return {
      products: await res.json(),
      error: null,
    };
  } catch (err) {
    console.error(err);

    return {
      products: [],
      error: "Failed to load products",
    };
  }
}

export default async function StorePage() {
  const { products, error } = await getProducts();

  return (
    <>
      <Script id="merch-breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
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
            }
          ]
        })}
      </Script>
      <StoreClient products={products} error={error} />
    </>
  );
}