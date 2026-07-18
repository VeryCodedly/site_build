import RoomClient from "./RoomClient";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <RoomClient slug={slug} typing={[]} />;
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