import StoreClient from "./StoreClient";

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
    <StoreClient
      products={products}
      error={error}
    />
  );
}