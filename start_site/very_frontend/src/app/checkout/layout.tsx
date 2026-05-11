import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase securely. Enter your shipping details and payment information.',
  alternates: {
    canonical: 'https://verycodedly.com/checkout',
  },
  openGraph: {
    title: 'Checkout',
    description: 'Complete your purchase securely. Enter your shipping details and payment information.',
    url: 'https://verycodedly.com/checkout',
    type: 'website',
    images: [{ url: 'https://verycodedly.com/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Checkout',
    description: 'Complete your purchase securely. Enter your shipping details and payment information.',
    images: ['https://verycodedly.com/og-image.png'],
    creator: '@verycodedly',
  },
  robots: {
    index: false, // Prevent search engines from indexing checkout pages
    follow: true,
  },
};

export default function CheckoutLayout({ children }: Props) {
  return <>{children}</>;
}