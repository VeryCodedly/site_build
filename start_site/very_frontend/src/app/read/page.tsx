import ReadPageClient from "./ReadPageClient";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is missing!');


export const revalidate = 60;

export default async function ReadPage() {
  const res = await fetch(`${apiUrl}/read-page-data/`, {
    next: { revalidate },
  });

  const data = res.ok ? await res.json() : {};

  return <ReadPageClient data={data} />;
}
