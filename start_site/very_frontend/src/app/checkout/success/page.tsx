"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion as Motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowLeft,
  faTruck,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import PageLoader from "@/components/PageLoader";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [order, setOrder] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   localStorage.removeItem("verycodedly-cart");

//   if (!orderId) {
//     setLoading(false);
//     return;
//   }

//   const storedAuth = sessionStorage.getItem(`auth_${orderId}`);
  
//   // DEBUG: Check this in your browser console!
//   console.log("Looking for key:", `auth_${orderId}`);
//   console.log("Found data:", storedAuth);

//   if (storedAuth) {
//     const { email, payment_reference } = JSON.parse(storedAuth);
//     const API_URL = process.env.NEXT_PUBLIC_API_URL;

//     const fetchOrderDetails = async () => {
//       try {
//         // Ensure this results in http://localhost:8000/nkemjika/store/track-order/
//         const res = await fetch(`${API_URL}/store/track-order/`, { 
//           method: 'POST',
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             order_id: orderId,
//             email: email,
//             payment_reference: payment_reference,
//           }),
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setOrder(data);
//         } else {
//           console.error("Server responded with error:", res.status);
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderDetails();
//   } else {
//     setLoading(false);
//   }
// }, [orderId]);
  useEffect(() => {
  localStorage.removeItem("verycodedly-cart");

  if (!orderId) {
    setLoading(false);
    return;
  }

  const storedAuth = sessionStorage.getItem(`auth_${orderId}`);
  
  console.log("Order ID:", orderId);
  console.log("Stored Auth:", storedAuth);

  if (storedAuth) {
    const { email, payment_reference } = JSON.parse(storedAuth);

    // === TEMPORARY HARD CODE FOR TESTING ===
    fetch("http://localhost:8000/nkemjika/store/track-order/", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        email: email,
        payment_reference: payment_reference,
      }),
    })
    .then(res => {
      console.log("Response status:", res.status);
      if (!res.ok) {
        return res.text().then(text => { 
          console.error("Error body:", text);
          throw new Error(`HTTP ${res.status}: ${text}`); 
        });
      }
      return res.json();
    })
    .then(data => {
      console.log("Order data received:", data);
      setOrder(data);
    })
    .catch(err => {
      console.error("Fetch error:", err);
    })
    .finally(() => setLoading(false));
  } else {
    console.error("No auth data in sessionStorage");
    setLoading(false);
  }
}, [orderId]);

  if (loading) return <PageLoader />;

  return (
    <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
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

      <div className="max-w-2xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="group rounded-2xl p-8 sm:p-10 space-y-8 border border-gray-700/40 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
        >
          {/* Success icon */}
          <Motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 bg-lime-400/10 rounded-full flex items-center justify-center mx-auto"
          >
            <FontAwesomeIcon icon={faCheckCircle} className="text-lime-400 text-4xl" />
          </Motion.div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Thank you!</h1>
            <p className="text-gray-400">Your order has been placed successfully.</p>
          </div>

          {order && (
            <div className="bg-zinc-900/60 rounded-xl p-5 border border-zinc-800 text-left space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Total Paid:</span>
                <span className="text-lime-400 font-bold">${order.total_amount || order.amount}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Email:</span>
                <span className="text-white truncate max-w-[150px]">{order.email}</span>
              </div>
            </div>
          )}

          {/* Order ID card – simple, no external fetch */}
          <div className="bg-zinc-900/40 rounded-xl p-4 border border-zinc-800">
            <p className="text-xs text-gray-400/80 uppercase tracking-wide mb-1">Order ID</p>
            <Link
              href={`/orders/${orderId}`}
              className="text-lime-400 font-mono text-sm break-all hover:underline active:underline active:text-white inline-block"
            >
              {orderId}
            </Link>
            <p className="text-xs text-gray-400/80 mt-2">
              Click the link above to track your order.
            </p>
          </div>

          {/* Next steps */}
          <div className="space-y-4 text-sm text-gray-300">
            <div className="flex items-center gap-3 justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-lime-400" />
              <span>A confirmation email is on its way to your inbox.</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <FontAwesomeIcon icon={faTruck} className="text-lime-400" />
              <span>You&apos;ll be notified when your order ships.</span>
            </div>
            <p className="text-xs text-gray-400/80 mt-2">
              Questions? Reach us at{" "}
              <a href="mailto:support@verycodedly.com" className="text-lime-400 hover:underline active:underline active:text-white">
                support@verycodedly.com
              </a>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row sm:flex-row gap-4 justify-center py-4">
            <Link
              href="/merch"
              className="font-semibold cursor-pointer border-3 border-gray-500/100 bg-lime-400 px-8 py-1 rounded-full text-black hover:bg-white transition-all duration-200 shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:translate-y-1.5 hover:translate-y-0.5"
            >
              <span className="sm:hidden">Merch</span>
              <span className="hidden sm:inline">More Merch</span>
            </Link>
            <Link
              href={`/orders/${orderId}`}
              className="font-semibold cursor-pointer border-3 border-gray-500/100 px-8 py-1 rounded-full text-white hover:bg-white hover:text-black transition-all duration-200 shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] active:translate-y-1.5 hover:translate-y-0.5"
            >
              <span className="sm:hidden">Track</span>
              <span className="hidden sm:inline">Track Order</span>
            </Link>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}