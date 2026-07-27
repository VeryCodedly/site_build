import type { Metadata } from "next";
import { notFound } from "next/navigation";


type Room = {
    title: string;
    slug: string;
    description: string;
};

type Props = {
    params: Promise<{ slug: string }>;
};

async function getRoom(slug: string): Promise<Room | null> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            return null;
        }
        const res = await fetch(
            `${apiUrl}/connect/rooms/${slug}/`,
            { next: { revalidate: 60 }}
        );

        if (!res.ok) return null;

        const data = await res.json();
        return data.room;

    } catch {
        return null;
    }
}

export async function generateMetadata(
    props: Props
): Promise<Metadata> {

    const { slug } = await props.params;
    const room = await getRoom(slug);

    if (!room) notFound();

    const title = `${room.title} | VeryCodedly`;
    const description = room.description ||
        `Join the ${room.title} discussion on VeryCodedly Connect.`;

    const image = "https://verycodedly.com/connect/opengraph-image.png";

    return {
        title,
        description,
        alternates: {
            canonical: `https://verycodedly.com/connect/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://verycodedly.com/connect/${slug}`,
            type: "website",
            images: [{ url: image }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@verycodedly",
        },
    };
}

export default function ConnectRoomLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}