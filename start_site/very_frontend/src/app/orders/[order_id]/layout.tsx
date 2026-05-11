// app/orders/[order_id]/layout.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ order_id: string }>;
  children: React.ReactNode;
};

async function getOrder(orderId: string) {
  try {
    const STATUS_URL = process.env.NEXT_PUBLIC_STATUS_URL;
    if (!STATUS_URL) return null;

    const res = await fetch(`${STATUS_URL}/${orderId}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { order_id } = await params;

  const order = await getOrder(order_id);

  if (!order) {
    return {
      title: 'Order Not Found',
      description: "The order you're looking for could not be found.",
      robots: { index: false, follow: true },
    };
  }

  const title = `Order #${order.order_id}`;
  const description = `Track your order. Status: ${order.status}.`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `https://verycodedly.com/orders/${order_id}`,
      images: ['https://verycodedly.com/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://verycodedly.com/og-image.png'],
      creator: '@verycodedly',
    },
  };
}

export default async function OrderLayout({ children, params }: Props) {
  const { order_id } = await params;

  const order = await getOrder(order_id);

  if (!order) notFound();

  return <>{children}</>;
}