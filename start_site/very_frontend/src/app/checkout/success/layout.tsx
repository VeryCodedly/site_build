import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Successful",
  description: "Thank you for your order.",
  robots: { index: false, follow: true },
};

export default function CheckoutSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}