import KnowSearchClient from "../search/KnowSearchClient";


interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function KnowSearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || "";

  return (
    <>
      <KnowSearchClient initialQuery={query} />
    </>
  );
}