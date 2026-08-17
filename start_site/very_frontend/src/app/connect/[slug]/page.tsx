import RoomClient from "./RoomClient";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Room } from "@/types/connect";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

async function getRoom(slug: string): Promise<Room | null> {
  if (!apiURL) return null;

  try {
    const res = await fetch(
      `${apiURL}/connect/rooms/${slug}/`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.room;

  } catch {
    return null;
  }
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await getRoom(slug);

  if (!room) notFound();

  const description = room.description ||
    `Join the ${room.title} discussion on VeryCodedly Connect.`;

  return (
    <>
      <Script id="connect-room-structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: room.title,
          description,
          isPartOf: {
            "@type": "WebPage",
            name: "Connect",
            url: "https://verycodedly.com/connect",
          },
          publisher: {
            "@type": "Organization",
            name: "VeryCodedly",
            sameAs: "https://verycodedly.com",
          },
          url: `https://verycodedly.com/connect/${room.slug}`,
          inLanguage: "en",
        })}
      </Script>

      <Script
        id="connect-room-breadcrumb-structured-data"
        type="application/ld+json"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "VeryCodedly | Tech. Code. Culture.",
              item: "https://verycodedly.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Connect",
              item: "https://verycodedly.com/connect",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: room.title,
              item: `https://verycodedly.com/connect/${room.slug}`,
            },
          ],
        })}
      </Script>

      <RoomClient slug={slug} typing={[]} />;
    </>
  );
}
// import RoomClient from "./RoomClient";


// async function getRoom(slug: string) {

//   const API = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const res = await fetch(
//       `${API}/connect/rooms/${slug}/`,
//       {
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       throw new Error();
//     }

//     return {
//       room: await res.json(),
//       error: null,
//     };
//   }

//   catch {
//     return {
//       room: null,
//       error: "Couldn't load room.",
//     };
//   }
// }

// export default async function RoomPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>
// }) {

//   const { slug } = await params;
//   const { room, error } = await getRoom(slug);

//   return (
//     <RoomClient room={room} error={error} />
//   );
// }