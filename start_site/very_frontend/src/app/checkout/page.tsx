"use client";

import { motion as Motion } from 'framer-motion';
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Country, State, City } from 'country-state-city';
import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import type { CountryCode } from "libphonenumber-js";

import CheckoutForm from "@/app/checkout/components/checkout/CheckoutForm";
import OrderSummary from "@/app/checkout/components/checkout/OrderSummary";
// import PageLoader from '@/components/PageLoader';
import { useCart } from '@/context/CartContext';


declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FlutterwaveCheckout: any;
  }
}

export interface CartItem {
  id: string;
  variant_id: number;
  // product_id: number;
  fancy_name: string;
  price: number;
  quantity: number;
}

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  address2: string;
  city: string;
  postalCode: string;
  orderNote: string;

  shipping_firstName: string;
  shipping_lastName: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_address2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;           // full name (for display)
  shipping_country_code: string;      // ← NEW: ISO code for Printful
  shipping_postalCode: string;
};

export type Errors = Partial<Record<keyof FormData, string>> & {
  country?: string;
  state?: string;
};

// type ShippingRate = {
//   rate: string;
// };

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cartItems, clearCart } = useCart();   //  Use hook

  const [processing, setProcessing] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  const [useDifferentShipping, setUseDifferentShipping] = useState(false);
  const [shippingQuote, setShippingQuote] = useState<number | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",  shipping_phone: "", 
    shipping_email: "", address: "", address2: "", city: "", postalCode: "",
    orderNote: "", shipping_firstName: "", shipping_lastName: "",
    shipping_address: "", shipping_address2: "", shipping_city: "",
    shipping_state: "", shipping_country: "", shipping_postalCode: "", shipping_country_code: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ type: 'error' | null; message?: string }>({ type: null });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<CountryCode>("AS");

  const countries = Country.getAllCountries().filter((c) => {
    try { getCountryCallingCode(c.isoCode as CountryCode); return true; } catch { return false; }
  });

  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedCountry && selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  const countryName = Country.getCountryByCode(selectedCountry)?.name || "";
  const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || "";

  // Auto-detect country from IP
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) {
          const code = data.country_code;
          setSelectedCountry(code);
          setSelectedPhoneCountry(code as CountryCode);

          setFormData(p => ({
            ...p,
            shipping_country_code: code,
            shipping_country: Country.getCountryByCode(code)?.name || ""
          }));
        }
      })
      .catch(() => {
        setSelectedCountry("US");
        setSelectedPhoneCountry("US");
      });
  }, []);

    // Redirect if cart is empty but not if checking out
  // useEffect(() => {
  //   if (cartItems.length > 0) {
  //     setLoading(false);
  //   } else if (cartItems.length === 0 && !loading) {
  //     router.push("/merch");
  //   }
  // }, [cartItems.length, loading, router]);   // Better dependency?

  useEffect(() => {
    if (cartItems.length === 0) {
      const timeout = setTimeout(() => {
        router.push("/merch");
      }, 100);
      return () => clearTimeout(timeout);
    }
    setLoading(false);
  }, [cartItems.length, router]);

  const formatPhone = (value: string, country?: CountryCode) => {
    const parsed = parsePhoneNumberFromString(value, country);
    return parsed?.isValid() ? parsed.formatInternational() : value;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (shippingQuote ?? 0);

    // === DEBUG VERSION - REPLACE YOUR CURRENT subtotal AND total ===
  // const subtotal = cartItems.reduce((sum, item) => {
  //   const itemTotal = item.price * item.quantity;
  //   console.log(`Item: ${item.fancy_name} | Price: ${item.price} | Qty: ${item.quantity} | Item Total: ${itemTotal}`);
  //   return sum + itemTotal;
  // }, 0);

  // const total = subtotal + (shippingQuote ?? 0);

  // console.log("=== FRONTEND CALCULATION ===");
  // console.log("Subtotal:", subtotal);
  // console.log("ShippingQuote:", shippingQuote);
  // console.log("Final Total shown to user:", total);
  // ==================================================

  // useEffect(() => {
  //   if (!useDifferentShipping) return;
  //   setFormData(prev => {
  //     const isFirstTime = !prev.shipping_firstName && !prev.shipping_lastName && !prev.shipping_address;
  //     if (!isFirstTime) return prev;
  //     return { ...prev, shipping_firstName: prev.firstName, shipping_lastName: prev.lastName, email: prev.email,
  //              shipping_phone: prev.phone, shipping_address: prev.address, shipping_address2: prev.address2,
  //              shipping_city: prev.city, shipping_state: stateName, shipping_country: countryName,
  //              shipping_postalCode: prev.postalCode };
  //   });
  // }, [useDifferentShipping, countryName, stateName]);

  useEffect(() => {
    if (!useDifferentShipping) return;

    setFormData(prev => {
      const isFirstTime = !prev.shipping_firstName && !prev.shipping_lastName && !prev.shipping_address;
      if (!isFirstTime) return prev;

      return {
        ...prev,
        shipping_firstName: prev.firstName,
        shipping_lastName: prev.lastName,
        shipping_email: prev.email,
        shipping_phone: prev.phone,
        shipping_address: prev.address,
        shipping_address2: prev.address2,
        shipping_city: prev.city,
        shipping_state: stateName,
        shipping_country: countryName,           // full name for display
        shipping_country_code: selectedCountry,  // ← ISO code for Printful
        shipping_postalCode: prev.postalCode,
      };
    });
  }, [useDifferentShipping, countryName, stateName, selectedCountry]);

  const getShipping = () => {
    if (!useDifferentShipping) {
      return {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        address2: formData.address2,
        city: formData.city,
        state: stateName,
        country: selectedCountry,           // ISO code (e.g. "NG")
        postal_code: formData.postalCode,
      };
    }

    // Different shipping address
    return {
      first_name: formData.shipping_firstName,
      last_name: formData.shipping_lastName,
      email: formData.shipping_email,
      phone: formData.shipping_phone,
      address: formData.shipping_address,
      address2: formData.shipping_address2,
      city: formData.shipping_city,
      state: formData.shipping_state,
      country: formData.shipping_country_code || selectedCountry,   // Prefer code, fallback
      postal_code: formData.shipping_postalCode,
    };
  };

  // reset shipping when address changes
  useEffect(() => {
    setShippingQuote(null);
  }, [
    formData.address,
    formData.city,
    selectedCountry,
    selectedState,
    useDifferentShipping,
    formData.shipping_address,
    formData.shipping_city,
    formData.shipping_country_code,
  ]);

  const handleGetShipping = async () => {
  setShippingLoading(true);
  setStatus({ type: null });

  if (!validate()) {
    setShowErrors(true);
    setShippingLoading(false);
    return;
  }

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const payload = {
      cart_items: cartItems.map(item => ({
        variant_id: Number(item.variant_id),
        quantity: item.quantity
      })),
      shipping: getShipping()
    };

    const res = await fetch(`${API_URL}/store/shipping/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || `Server error ${res.status}`);
    }

    const shippingRate = data.rate || (data.success && data.rate);

    if (typeof shippingRate !== 'number' || isNaN(shippingRate)) {
      throw new Error("Invalid shipping rate received from server");
    }

    console.log("✅ Shipping calculated:", shippingRate);
    setShippingQuote(shippingRate);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Shipping Error:", err);
    setStatus({ 
      type: 'error', 
      message: err.message || "Failed to calculate shipping" 
    });
  } finally {
    setShippingLoading(false);
  }
};

  const validate = useCallback(() => {
    const newErrors: Errors = {};
    const req = (v?: string) => !v?.trim();
    if (req(formData.firstName)) newErrors.firstName = "Required";
    if (req(formData.lastName)) newErrors.lastName = "Required";
    if (req(formData.email)) newErrors.email = "Required";
    if (req(formData.phone)) newErrors.phone = "Required";
    if (req(formData.address)) newErrors.address = "Required";
    if (!selectedCountry) newErrors.country = "Required";
    if (!selectedState) newErrors.state = "Required";
    if (req(formData.city)) newErrors.city = "Required";

    if (useDifferentShipping) {
      if (!formData.shipping_firstName) newErrors.shipping_firstName = "Required";
      if (!formData.shipping_lastName) newErrors.shipping_lastName = "Required";
      if (!formData.shipping_address) newErrors.shipping_address = "Required";
      if (!formData.shipping_city) newErrors.shipping_city = "Required";
      if (!formData.shipping_country) newErrors.shipping_country = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, selectedCountry, selectedState, useDifferentShipping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (showErrors) setErrors(prev => ({ ...prev, [name as keyof FormData]: undefined }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();
  setShowErrors(true);
  if (!validate()) return;
  if (shippingQuote === null || isNaN(shippingQuote)) {
    setStatus({ type: 'error', message: "Please calculate shipping first" });
    return;
  }

  setProcessing(true);

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      cart_items: cartItems.map(item => ({
        variant_id: Number(item.variant_id),
        quantity: item.quantity
      })),
      shipping_address: getShipping(),
      currency: "USD",
    };

    const orderResponse = await fetch(`${API_URL}/store/create-order/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      throw new Error(orderData.error || "Failed to create order");
    }

    // Open Flutterwave
        // Open Flutterwave
    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY!,
      tx_ref: orderData.tx_ref,
      amount: orderData.amount,
      currency: "USD",
      payment_options: "card, ussd, mobilemoney",

      customer: {
        email: formData.email,
        phone_number: formData.phone,
        name: `${formData.firstName} ${formData.lastName}`,
      },
      customizations: {
        title: "VeryCodedly Store",
        description: "Payment for merch",
        logo: "https://verycodedly.com/apple-touch-icon.png",
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: async (data: any) => {
        console.log("🚀 Flutterwave Callback:", data);

        if (data.status === "successful") {
          const flwRef = data.flw_ref || data.transaction_id;

          try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;

            await fetch(`${API_URL}/nkemjika/store/update-payment/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: orderData.order_id,
                flw_ref: flwRef,
                tx_ref: data.tx_ref,
                payment_response: data
              }),
            });
          } catch (err) {
            console.warn("Failed to update flw_ref (webhook should handle it):", err);
          }

          setProcessing(false);
          clearCart();

          // Redirect
          setTimeout(() => {
            router.push(`/checkout/success?order_id=${orderData.order_id}`);
          }, 700);
        }
      },

      onclose: () => {
        setProcessing(false);
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    setStatus({ type: 'error', message: err.message });
    setProcessing(false);
  }
};

  // FIX for Pay button
  const handlePayClick = () => handleSubmit();

  // if (loading) return <PageLoader />;

  if (cartItems.length === 0) {
    return <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50 flex items-center justify-center"><div className="text-center"><p className="text-gray-400 mb-4">Your cart is empty.</p><Link href="/merch" className="text-lime-400 hover:text-white transition-colors">Continue shopping →</Link></div></section>;
  }

  return (
    <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60 pointer-events-none"></div>

      <div className="sticky top-0 z-50 mb-3 border-b border-lime-400/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-xs md:text-sm">
          
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          
          <p className="text-gray-300">
            Checkout is being finalized. You can browse merch and build your cart while we finish setup.
          </p>

        </div>
      </div>

      <Motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto mb-6 relative z-10">
        <Link href="/merch" className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:text-white active:scale-60 transition-all duration-300 group">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </Link>
      </Motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 order-1">
            <CheckoutForm
              formData={formData} setFormData={setFormData} errors={errors} showErrors={showErrors}
              status={status} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
              selectedState={selectedState} setSelectedState={setSelectedState} selectedCity={selectedCity}
              setSelectedCity={setSelectedCity} selectedPhoneCountry={selectedPhoneCountry}
              setSelectedPhoneCountry={setSelectedPhoneCountry} countries={countries} states={states}
              cities={cities} countryName={countryName} stateName={stateName} useDifferentShipping={useDifferentShipping}
              setUseDifferentShipping={setUseDifferentShipping} handleInputChange={handleInputChange}
              formatPhone={formatPhone} onSubmit={handleSubmit}
            />
          </div>

          <div className="lg:col-span-1 order-2">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shippingQuote={shippingQuote}
              total={total}
              processing={processing}
              onPay={handlePayClick}
              onGetShipping={handleGetShipping}
              shippingLoading={shippingLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}