"use client";

import { useState, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBox } from "@fortawesome/free-solid-svg-icons";

interface OrderData {
  order_id: string;
  email?: string;
  payment_reference?: string;
}

type FormData = {
  orderId: string;
  email: string;
  paymentReference: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function TrackOrderPage() {
  const [formData, setFormData] = useState<FormData>({
    orderId: "",
    email: "",
    paymentReference: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | null; message?: string }>({ type: null });

  const validate = useCallback(() => {
    const newErrors: Errors = {};

    const orderId = formData.orderId.trim().toUpperCase();
    const paymentRef = formData.paymentReference.trim().toUpperCase();

    /* ORDER ID */
    if (!orderId) {
      newErrors.orderId = "Order number is required";
    } else if (!/^[A-Z0-9]{8}$/.test(orderId)) {
      newErrors.orderId = "Enter a valid order number";
    }

    /* EMAIL */
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    /* PAYMENT REFERENCE */
    if (!paymentRef) {
      newErrors.paymentReference = "Required";
    } else if (!/^VC-[A-Z0-9]{8}-\d{10}$/.test(paymentRef)) {
      newErrors.paymentReference = "Enter a valid payment reference";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === "orderId") {
      processedValue = value.toUpperCase();
    }
    
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    if (showErrors) {
      setErrors((prev) => ({ ...prev, [name as keyof FormData]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrors(true);
    const isValid = validate();

    if (!isValid) {
      setStatus({ type: 'error', message: 'Please fix the errors below.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: null });
    setOrder(null);

    try {
      const TRACK_URL = process.env.NEXT_PUBLIC_TRACK_URL;
      if (!TRACK_URL) {
        throw new Error("Tracking URL is not configured");
      }

      const res = await fetch(`${TRACK_URL}/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: formData.orderId.trim().toUpperCase(),
          email: formData.email.trim(),
          payment_reference: formData.paymentReference.trim().toUpperCase(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Store the "credentials" needed to fetch this order
        const authData = {
          email: formData.email.trim(),
          payment_reference: formData.paymentReference.trim().toUpperCase()
        };

        // Save to session storage using the order ID as a key
        sessionStorage.setItem(`auth_${data.order_id}`, JSON.stringify(authData));

        // Redirect to the status page without sensitive info in the URL
        window.location.href = `/orders/${data.order_id}`;
      } else { throw new Error(data.error || "Invalid details");}

      setOrder(data);
      setFormData({ orderId: "", email: "", paymentReference: "" });
      setErrors({});
      setShowErrors(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  if (order) {
    return (
      <div className="min-h-screen pt-10 pb-30 px-4 bg-gradient-to-b from-black to-zinc-950/50">
        {/* Show order details here if setup */}
        <h1>Order #{order.order_id}</h1>
        {/* Add tracking number, etc. */}
      </div>
    );
  }

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-stretch opacity-50 pointer-events-none" />

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

      <div className="max-w-3xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 sm:p-12 border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lime-400/10 border border-lime-400/30 mb-4">
              <FontAwesomeIcon icon={faBox} className="text-2xl text-lime-400" />
            </div>
            <Motion.h2
              className="text-3xl sm:text-4xl font-black text-lime-400"
              whileHover={{ scale: 1.02 }}
            >
              Track Your Order
            </Motion.h2>
            <p className="mt-2 text-gray-400 text-sm sm:text-base leading-relaxed">
              Enter your order details to check status
            </p>
          </div>

          {status.type && (
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 rounded-lg text-sm bg-rose-500/10 text-rose-400 border border-rose-500/30"
            >
              {status.message}
            </Motion.div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Order ID field */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                ...(showErrors && errors.orderId && { x: [-5, 5, -5, 5, 0] })
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ...(showErrors && errors.orderId && { x: { duration: 0.4, repeat: 1 } })
              }}
              className="relative"
            >
              <label className="block text-xs text-gray-500 mb-1">Order Number</label>
              <input
                name="orderId"
                type="text"
                placeholder="e.g., A3F9K2L1"
                value={formData.orderId}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                  ${showErrors && errors.orderId ? 'border-rose-500' : 'border-gray-700/60'}`}
                autoComplete="off"
              />
              {showErrors && errors.orderId && (
                <Motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-0 text-xs text-rose-400"
                >
                  {errors.orderId}
                </Motion.span>
              )}
            </Motion.div>

            {/* Email field */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                ...(showErrors && errors.email && { x: [-5, 5, -5, 5, 0] })
              }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ...(showErrors && errors.email && { x: { duration: 0.4, repeat: 1 } })
              }}
              className="relative"
            >
              <label className="block text-xs text-gray-500 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="humanperson@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                  ${showErrors && errors.email ? 'border-rose-500' : 'border-gray-700/60'}`}
                autoComplete="email"
              />
              {showErrors && errors.email && (
                <Motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-0 text-xs text-rose-400"
                >
                  {errors.email}
                </Motion.span>
              )}
            </Motion.div>

            {/* Payment Reference field not optional */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative"
            >
              <label className="block text-xs text-gray-500 mb-1">Payment Reference</label>
              <input
                name="paymentReference"
                type="text"
                placeholder="VC-xxxxxxxx-xxxxxxxxxx"
                value={formData.paymentReference}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 text-sm sm:text-base
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
                autoComplete="off"
              />
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 px-7 py-1 rounded-full text-black hover:bg-white 
                  active:bg-white active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] 
                  active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Track Order"}
              </button>
            </Motion.div>
          </form>
        </Motion.div>
      </div>
    </section>
  );
}