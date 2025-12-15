import ReadPageClient from "./ReadPageClient";


const API = process.env.NEXT_PUBLIC_API_URL!;


export const revalidate = 180;

export default async function ReadPage() {
  const res = await fetch(`${API}/read-page-data/`, {
    next: { revalidate: 180 },
  });

  const data = res.ok ? await res.json() : {};

  return <ReadPageClient data={data} />;
}
