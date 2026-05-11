import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Your Order',
  description: 'Enter your order details to check the status of your VeryCodedly order.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://verycodedly.com/track-order',
  },
  openGraph: {
    title: 'Track Your Order',
    description: 'Enter your order details to check the status of your VeryCodedly order.',
    url: 'https://verycodedly.com/track-order',
    siteName: 'VeryCodedly',
    images: [{ url: 'https://verycodedly.com/og-image.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track Your Order',
    description: 'Enter your order details to check the status of your VeryCodedly order.',
    images: ['https://verycodedly.com/og-image.png'],
    creator: '@verycodedly',
  },
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}