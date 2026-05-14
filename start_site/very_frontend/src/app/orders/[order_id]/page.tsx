"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheckCircle,
  faTruck,
  faBoxOpen,
  faClock,
  faMapMarkerAlt,
  faReceipt,
  faCreditCard,
  faBoxes,
} from "@fortawesome/free-solid-svg-icons";
// import PageLoader from "@/components/PageLoader";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  order_id: string;
  status: string;
  payment_reference?: string;
  payment_status: string;
  tracking_number?: string;
  tracking_url?: string;
  items?: OrderItem[];
  name?: string;
  shipping_address?: string;
  email?: string;
  phone?: string;
  total_amount?: number;
  created_at?: string;
  shipping_cost?: number;
  city?: string;
  state?: string;
  country?: string;
}

const statusSteps = {
  pending: { label: "Order Placed", icon: faClock, color: "text-yellow-400" },
  paid: { label: "Payment Confirmed", icon: faCreditCard, color: "text-lime-400" },
  processing: { label: "Processing", icon: faBoxes, color: "text-blue-400" },
  shipped: { label: "Shipped", icon: faTruck, color: "text-purple-400" },
  delivered: { label: "Delivered", icon: faCheckCircle, color: "text-green-400" },
  cancelled: { label: "Cancelled", icon: faBoxOpen, color: "text-red-400" },
};

const statusOrder = ["pending", "paid", "processing", "shipped", "delivered"];

export default function OrderTrackingPage() {
  const { order_id } = useParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!order_id) return;

    // 1. Try to get credentials from sessionStorage instead of URL
    const storedAuth = sessionStorage.getItem(`auth_${order_id}`);
    
    if (!storedAuth) {
      setError("Please enter your details in the tracking form to view this order.");
      setLoading(false);
      return;
    }

    const { email, payment_reference } = JSON.parse(storedAuth);

    const fetchOrder = async () => {
      try {
        // Use your existing POST logic
        const res = await fetch(`${process.env.NEXT_PUBLIC_TRACK_URL}/`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: order_id,
            email: email,
            payment_reference: payment_reference,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Order not found");
          // Optional: clear session if the backend says it's invalid
          sessionStorage.removeItem(`auth_${order_id}`);
        } else {
          setOrder(data);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [order_id]);

  if (loading) return;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 bg-gradient-to-b from-black to-zinc-950/50">
        {error}
        <Link href="/track-order" className="ml-4 text-lime-400 underline">
          Go to Track Order Form
        </Link>
      </div>
    );
  }
  if (!order) return null;

  const getCurrentStep = () => {
    if (order.status === "cancelled") return -1;
    const idx = statusOrder.indexOf(order.status);
    return idx >= 0 ? idx : 0;
  };

  const currentStep = getCurrentStep();

  return (
    <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      {/* Background pattern overlay (optional) */}
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-50 pointer-events-none" />

      {/* Back button */}
      <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto mb-6 relative z-10"
      >
          <Link
              href="/merch"
              className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:text-white active:scale-60 transition-all duration-300"
          >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </Link>
      </Motion.div>

      <div className="max-w-5xl lg:px-3 mx-auto relative z-10">
        {/* Order header card */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="group rounded-2xl p-6 sm:p-8 mb-8 border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 active:bg-pink-400 transition-colors" />
                <h1 className="text-2xl sm:text-3xl font-black text-white">Order #{order.order_id}</h1>
              </div>
              <p className="text-gray-400 text-sm">
                Placed on{" "}
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </p>
              <p className="text-gray-400 text-sm">
                Payment Reference: {order.payment_reference}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  order.status === "delivered"
                    ? "bg-green-500/20 text-green-400"
                    : order.status === "cancelled"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-lime-500/20 text-lime-400"
                }`}
              >
                {order.status}
              </span>
              <span className="text-gray-500 text-sm">•</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  order.payment_status === "success"
                    ? "bg-lime-500/20 text-lime-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {order.payment_status}
              </span>
            </div>
          </div>
        </Motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: Status timeline and order items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status timeline card */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group bg-white/3 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 active:bg-pink-400 transition-colors" />
                <h2 className="text-lg font-semibold text-white">Order Status</h2>
              </div>

              {order.status !== "cancelled" ? (
                <div className="relative">
                  {/* Timeline line (vertical on mobile, horizontal on desktop) */}
                  <div className="hidden md:flex justify-between relative">
                    {statusOrder.map((status, idx) => {
                      const step = statusSteps[status as keyof typeof statusSteps];
                      const isCompleted = idx < currentStep;
                      const isCurrent = idx === currentStep;
                      return (
                        <div key={status} className="flex-1 text-center relative">
                          {/* connector line */}
                          {idx < statusOrder.length - 1 && (
                            <div
                              className={`absolute top-4 left-[50%] w-full h-0.5 ${
                                idx < currentStep ? "bg-lime-400" : "bg-gray-700"
                              }`}
                              style={{ right: "-50%" }}
                            />
                          )}
                          <div className="relative z-10 mb-2">
                            <div
                              className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center border-2 ${
                                isCompleted || isCurrent
                                  ? "border-lime-400 bg-lime-400/20"
                                  : "border-gray-700 bg-black/50"
                              }`}
                            >
                              <FontAwesomeIcon
                                icon={step.icon}
                                className={`text-sm ${
                                  isCompleted || isCurrent ? "text-lime-400" : "text-gray-500"
                                }`}
                              />
                            </div>
                            <p className="text-xs mt-2 font-medium text-gray-300">{step.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile vertical timeline */}
                  <div className="md:hidden space-y-4">
                    {statusOrder.map((status, idx) => {
                      const step = statusSteps[status as keyof typeof statusSteps];
                      const isCompleted = idx < currentStep;
                      const isCurrent = idx === currentStep;
                      if (idx > currentStep && status !== order.status) return null;
                      return (
                        <div key={status} className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              isCompleted || isCurrent
                                ? "border-lime-400 bg-lime-400/20"
                                : "border-gray-700 bg-black/50"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={step.icon}
                              className={`text-base ${
                                isCompleted || isCurrent ? "text-lime-400" : "text-gray-500"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white">{step.label}</p>
                            <p className="text-xs text-gray-400">
                              {isCompleted
                                ? "Completed"
                                : isCurrent
                                ? "Current"
                                : "Pending"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-red-400">This order has been cancelled.</div>
              )}

              {order.tracking_number && order.tracking_url && (
                <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Tracking number</span>
                  <Link
                    href={order.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-lime-400 hover:underline"
                  >
                    {order.tracking_number} →
                  </Link>
                </div>
              )}
            </Motion.div>

            {/* Order items card */}
            {order.items && order.items.length > 0 && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="group bg-white/3 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 active:bg-pink-400 transition-colors" />
                  <h2 className="text-lg font-semibold text-white">Order Items</h2>
                </div>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0">
                      <div>
                        <p className="text-gray-300/90 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-lime-400">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-lime-400">
                      ${order.total_amount?.toFixed(2) || "—"}
                    </span>
                  </div>
                </div>
              </Motion.div>
            )}
          </div>

          {/* Right column: Shipping & payment info */}
          <div className="space-y-8">
            {/* Shipping info card */}
            {order.shipping_address && (
              <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white/3 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lime-400" />
                  <h2 className="text-lg font-semibold text-white">Shipping Details</h2>
                </div>
                {order.name && (
                  <p className="text-gray-300/90 text-sm mt-2">{order.name}</p>
                )}
                {order.email && (
                  <p className="text-gray-300/90 text-sm">{order.email}</p>
                )}
                {order.phone && (
                  <p className="text-gray-300/90 text-sm">{order.phone}</p>
                )}
                <p className="text-gray-300/90 text-sm whitespace-pre-wrap">{order.shipping_address}</p>
                {order.country && (
                  <p className="text-gray-300/90 text-sm">
                    {[order.city, order.state, order.country].filter(Boolean).join(', ')}
                  </p>
                )}
              </Motion.div>
            )}

            {/* Payment summary card */}
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white/3 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faReceipt} className="text-lime-400" />
                <h2 className="text-lg font-semibold text-white">Payment Summary</h2>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${order.total_amount?.toFixed(2) || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">${order.shipping_cost?.toFixed(2) || "—"}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800 font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-lime-400">${order.total_amount?.toFixed(2) || "—"}</span>
                </div>
              </div>
            </Motion.div>

            {/* Support contact */}
            <div className="text-center text-xs text-gray-500">
              <p>Questions about your order?</p>
              <a href="/contact" className="text-lime-400 hover:underline active:underline active:text-white">
                Contact support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}