// "use client";

// import { motion as Motion } from 'framer-motion';
// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowLeft,
//   faLock,
//   faChevronDown,
//   faSpinner,
//   faMapMarkerAlt
// } from "@fortawesome/free-solid-svg-icons";
// import { Country, State, City } from 'country-state-city';
// import { Listbox, Transition } from '@headlessui/react';
// import { getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js';
// import type { CountryCode } from "libphonenumber-js";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;

//   address: string;
//   address2: string;
//   city: string;
//   postalCode: string;

//   orderNote: string;

//   shipping_firstName: string;
//   shipping_lastName: string;
//   shipping_phone: string;
//   shipping_address: string;
//   shipping_address2: string;
//   shipping_city: string;
//   shipping_state: string;
//   shipping_country: string;
//   shipping_postalCode: string;
// };

// type Errors = Partial<Record<keyof FormData, string>> & {
//   country?: string;
//   state?: string;
// };

// export default function CheckoutPage() {
//   const router = useRouter();

//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [processing, setProcessing] = useState(false);
//   const [showErrors, setShowErrors] = useState(false);
//   const [loading, setLoading] = useState(true);
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [PaystackPop, setPaystackPop] = useState<any>(null);

//   const [useDifferentShipping, setUseDifferentShipping] = useState(false);

//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",

//     address: "",
//     address2: "",
//     city: "",
//     postalCode: "",

//     orderNote: "",

//     shipping_firstName: "",
//     shipping_lastName: "",
//     shipping_phone: "",
//     shipping_address: "",
//     shipping_address2: "",
//     shipping_city: "",
//     shipping_state: "",
//     shipping_country: "",
//     shipping_postalCode: "",
//   });

//   const [errors, setErrors] = useState<Errors>({});
//   const [status, setStatus] = useState<{ type: 'error' | null; message?: string }>({ type: null });

//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");

//   const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<CountryCode>("AS");
//   const countries = Country.getAllCountries().filter((c) => {
//     try {
//       getCountryCallingCode(c.isoCode as CountryCode);
//       return true;
//     } catch {
//       return false;
//     }
//   });

//   const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
//   const cities = selectedCountry && selectedState
//     ? City.getCitiesOfState(selectedCountry, selectedState)
//     : [];

//   const countryName = Country.getCountryByCode(selectedCountry)?.name || "";
//   const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || "";

//   useEffect(() => {
//     import('@paystack/inline-js').then((mod) => setPaystackPop(() => mod.default));
//   }, []);

//   useEffect(() => {
//     fetch('https://ipapi.co/json/')
//       .then(res => res.json())
//       .then(data => {
//         if (data.country_code) {
//         setSelectedCountry(data.country_code);
//         setSelectedPhoneCountry(data.country_code as CountryCode);
//       }
//       })
//       .catch(() => {});
//   }, []);

//   useEffect(() => {
//     const saved = localStorage.getItem("cart");
//     if (saved) setCartItems(JSON.parse(saved));
//     else router.push("/merch");
//     setLoading(false);
//   }, [router]);

//   const formatPhone = (value: string, country?: CountryCode) => {
//     const parsed = parsePhoneNumberFromString(value, country);
//     return parsed?.isValid() ? parsed.formatInternational() : value;
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const shippingCost = subtotal > 50 ? 0 : 5;
//   const total = subtotal + shippingCost;

//   useEffect(() => {
//     if (!useDifferentShipping) return;

//     setFormData(prev => {
//       // only copy once when toggled ON
//       const isFirstTime =
//         !prev.shipping_firstName &&
//         !prev.shipping_lastName &&
//         !prev.shipping_address;

//       if (!isFirstTime) return prev;

//       return {
//         ...prev,
//         shipping_firstName: prev.firstName,
//         shipping_lastName: prev.lastName,
//         shipping_phone: prev.phone,
//         shipping_address: prev.address,
//         shipping_address2: prev.address2,
//         shipping_city: prev.city,
//         shipping_state: stateName,
//         shipping_country: countryName,
//         shipping_postalCode: prev.postalCode,
//       };
//     });
//   }, [useDifferentShipping, countryName, stateName]);

//   // SHIPPING DERIVED STATE
//   const getShipping = () => {
//     if (!useDifferentShipping) {
//       return {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         phone: formData.phone,
//         address: formData.address,
//         address2: formData.address2,
//         city: formData.city,
//         state: stateName,
//         country: countryName,
//         postal_code: formData.postalCode,
//       };
//     }

//     return {
//       first_name: formData.shipping_firstName,
//       last_name: formData.shipping_lastName,
//       phone: formData.shipping_phone,
//       address: formData.shipping_address,
//       address2: formData.shipping_address2,
//       city: formData.shipping_city,
//       state: formData.shipping_state,
//       country: formData.shipping_country,
//       postal_code: formData.shipping_postalCode,
//     };
//   };

//   const validate = useCallback(() => {
//     const newErrors: Errors = {};

//     const req = (v: string) => !v?.trim();

//     if (req(formData.firstName)) newErrors.firstName = "Required";
//     if (req(formData.lastName)) newErrors.lastName = "Required";
//     if (req(formData.email)) newErrors.email = "Required";
//     if (req(formData.phone)) newErrors.phone = "Required";
//     if (req(formData.address)) newErrors.address = "Required";
//     if (!selectedCountry) newErrors.country = "Required";
//     if (!selectedState) newErrors.state = "Required";
//     if (req(formData.city)) newErrors.city = "Required";

//     if (useDifferentShipping) {
//       if (!formData.shipping_firstName) newErrors.shipping_firstName = "Required";
//       if (!formData.shipping_lastName) newErrors.shipping_lastName = "Required";
//       if (!formData.shipping_address) newErrors.shipping_address = "Required";
//       if (!formData.shipping_city) newErrors.shipping_city = "Required";
//       if (!formData.shipping_country) newErrors.shipping_country = "Required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData, selectedCountry, selectedState, useDifferentShipping]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (showErrors) {
//       setErrors(prev => ({ ...prev, [name as keyof FormData]: undefined }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowErrors(true);

//     if (!validate()) return;
//     if (!PaystackPop) return;

//     setProcessing(true);

//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL;
      
//       const orderResponse = await fetch(`${API_URL}/store/create-order/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           first_name: formData.firstName,
//           last_name: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           address: formData.address,
//           address2: formData.address2,
//           city: formData.city,
//           state: stateName,
//           country: countryName,
//           postal_code: formData.postalCode,
//           notes: formData.orderNote,
//           cart_items: cartItems,
//           // subtotal,
//           // shipping_cost: shippingCost,
//           // total,
//           // currency: "NGN",
//           reference: `VC-${Date.now()}`,

//           shipping_address: useDifferentShipping ? getShipping() : null,
//         }),
//       });

//       const orderData = await orderResponse.json();
//       if (!orderResponse.ok) throw new Error(orderData.error);

//       const paystack = new PaystackPop();

//       paystack.newTransaction({
//         key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
//         email: formData.email,
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         phone: formData.phone,
//         amount: orderData.amount * 100,
//         currency: "NGN",
//         ref: orderData.paystack_reference,

//         onSuccess: () => {
//           localStorage.removeItem("cart");
//           router.push(`/checkout/success?ref=${orderData.order_id}`);
//         },

//         onCancel: () => {
//           setProcessing(false);
//         },

//         onError: () => {
//           setProcessing(false);
//         },
//       });

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       setStatus({ type: 'error', message: err.message });
//       setProcessing(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50 flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
//       </section>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-400 mb-4">Your cart is empty.</p>
//           <Link href="/merch" className="text-lime-400 hover:text-white transition-colors">
//             Continue shopping →
//           </Link>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50">
//       <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-60 pointer-events-none"></div>

//       {/* Back button */}
//       <Motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-6xl mx-auto mb-6 relative z-10"
//       >
//         <Link
//           href="/merch"
//           className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:text-white active:scale-60 transition-all duration-300 group"
//         >
//           <FontAwesomeIcon icon={faArrowLeft} size="lg" className="" />
//         </Link>
//       </Motion.div>

//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          
//           {/* Checkout Form - Left Side */}
//           <div className="lg:col-span-2 order-1">
//             <Motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="group rounded-2xl p-6 sm:p-8 space-y-6 border-2 border-gray-700/60 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               {/* Header with green bar */}
//               <div className="flex items-center gap-3">
//                 <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400 transition-colors" />
//                 <Motion.h2
//                   className="text-xl sm:text-2xl font-black text-white"
//                   whileHover={{ scale: 1.02 }}
//                   transition={{ type: "spring", stiffness: 400 }}
//                 >
//                   Shipping Details
//                 </Motion.h2>
//               </div>

//               {status.type && (
//                 <Motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="p-3 rounded-lg text-sm bg-rose-500/10 text-rose-400 border border-rose-500/30"
//                 >
//                   {status.message}
//                 </Motion.div>
//               )}

//               <form className="space-y-6 ext-sm tracking-tighter" onSubmit={handleSubmit} noValidate>
//                 {/* Name Row */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div className="relative">
//                     <label className="block text-xs text-gray-500 mb-1">First Name</label>
//                     <input
//                       name="firstName"
//                       type="text"
//                       placeholder="Dev"
//                       maxLength={25}
//                       autoComplete="given-name"
//                       value={formData.firstName}
//                       onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
//                       className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                         ${showErrors && errors.firstName ? 'border-rose-500' : 'border-gray-700/60'}`}
//                     />
//                     {showErrors && errors.firstName && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.firstName}
//                       </Motion.span>
//                     )}
//                   </div>

//                   <div className="relative">
//                     <label className="block text-xs text-gray-500 mb-1">Last Name</label>
//                     <input
//                       name="lastName"
//                       type="text"
//                       placeholder="Null"
//                       maxLength={25}
//                       value={formData.lastName}
//                       onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
//                       className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                         ${showErrors && errors.lastName ? 'border-rose-500' : 'border-gray-700/60'}`}
//                     />
//                     {showErrors && errors.lastName && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.lastName}
//                       </Motion.span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email & Phone */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div className="relative">
//                     <label className="block text-xs text-gray-500 mb-1">Email Address</label>
//                     <input
//                       name="email"
//                       type="email"
//                       placeholder="dev.null@example.com"
//                       maxLength={80}
//                       autoComplete="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
//                       className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                         ${showErrors && errors.email ? 'border-rose-500' : 'border-gray-700/60'}`}
//                     />
//                     {showErrors && errors.email && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.email}
//                       </Motion.span>
//                     )}
//                   </div>
                

//                   {/* Phone Number */}
//                 <div className="relative z-20">
//                     <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
//                     <div
//                         className={`w-full px-3 py-2 rounded-xl bg-white/5 border flex items-center gap-2
//                         focus-within:ring-2 focus-within:ring-lime-400/50 focus-within:border-lime-400/50 transition-all duration-300
//                         ${showErrors && errors.phone ? 'border-rose-500' : 'border-gray-700/60'}`}
//                     >
//                         {/* Country Code Listbox */}
//                         <Listbox value={selectedPhoneCountry} onChange={(val) => setSelectedPhoneCountry(val)}>
//                         <div className="relative">
                            
//                             <Listbox.Button className="flex items-center gap-2 pr-3 border-r border-gray-700/60 text-white">
//                             <span>
//                                 {selectedPhoneCountry
//                                 ? `+${getCountryCallingCode(selectedPhoneCountry)}`
//                                 : "+Code"}
//                             </span>

//                             <FontAwesomeIcon
//                                 icon={faChevronDown}
//                                 className="text-gray-400 text-xs"
//                             />
//                             </Listbox.Button>

//                             <Transition
//                             as="div"
//                             leave="transition ease-in duration-100"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                             >
//                             <Listbox.Options
//                                 className="absolute mt-4 max-h-60 min-w-[270px] overflow-y-auto custom-scrollbar 
//                                 bg-black border border-zinc-700 rounded-xl py-1 shadow-2xl z-50"
//                             >
//                                 {countries.map((country) => (
//                                 <Listbox.Option
//                                     key={country.isoCode}
//                                     value={country.isoCode as CountryCode}
//                                     className={({ active }) =>
//                                     `cursor-pointer select-none p-3 flex justify-between text-sm
//                                     ${active ? "bg-zinc-800 text-white" : "text-white/80"}`
//                                     }
//                                 >
//                                     <span>{country.name}</span>
//                                     <span className="text-gray-500">
//                                     +{getCountryCallingCode(country.isoCode as CountryCode)}
//                                     </span>
//                                 </Listbox.Option>
//                                 ))}
//                             </Listbox.Options>
//                             </Transition>
//                         </div>
//                         </Listbox>

//                         {/* Phone Input */}
//                         <input
//                         type="tel"
//                         inputMode="tel"
//                         placeholder={
//                             selectedPhoneCountry
//                             ? `+${getCountryCallingCode(selectedPhoneCountry)} 123 456 7890`
//                             : "+123 456 7890"
//                         }
//                         maxLength={20}
//                         value={formData.phone ?? ""}
//                         autoComplete="tel"
//                         onChange={(e) =>
//                             setFormData((p) => ({
//                             ...p,
//                             phone: formatPhone(e.target.value, selectedPhoneCountry),
//                             }))
//                         }
//                         className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
//                         />
//                     </div>

//                     {showErrors && errors.phone && (
//                         <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                         >
//                         {errors.phone}
//                         </Motion.span>
//                     )}
//                     </div>
//                 </div>

//                 {/* Country & State */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div className="relative z-20">
//                     <label className="block text-xs text-gray-500 mb-1">Country</label>
//                     <Listbox
//                         value={selectedCountry}
//                         onChange={(value) => {
//                             setSelectedCountry(value);
//                             setSelectedPhoneCountry(value as CountryCode);
//                             setSelectedState("");
//                             setSelectedCity("");
//                         }}
//                         >
//                         <div className="relative">
//                             <Listbox.Button
//                             className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white text-left flex justify-between items-center
//                             focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                             ${showErrors && errors.country ? 'border-rose-500' : 'border-gray-700/60'}`}
//                             >
//                             {selectedCountry
//                                 ? Country.getCountryByCode(selectedCountry)?.name
//                                 : "Select Country"}
//                             <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
//                             </Listbox.Button>

//                             <Transition
//                             as="div"
//                             leave="transition ease-in duration-100"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                             >
//                             <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-auto custom-scrollbar bg-black border border-zinc-700 rounded-xl py-1 shadow-2xl z-50">
//                                 {countries.map((country) => (
//                                 <Listbox.Option
//                                     key={country.isoCode}
//                                     value={country.isoCode}
//                                     className={({ active }) =>
//                                     `px-4 py-2 cursor-pointer text-sm transition-colors ${
//                                         active ? 'bg-zinc-800 text-white' : 'text-white/80'
//                                     }`
//                                     }
//                                 >
//                                     {country.name}
//                                 </Listbox.Option>
//                                 ))}
//                             </Listbox.Options>
//                             </Transition>
//                         </div>
//                     </Listbox>
//                     {showErrors && errors.country && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.country}
//                       </Motion.span>
//                     )}
//                   </div>

//             <div className="relative z-10">
//                 <label className="block text-xs text-gray-500 mb-1">State / Province</label>
//                 <Listbox
//                 value={selectedState}
//                 onChange={(value) => {
//                     setSelectedState(value);
//                     setSelectedCity("");
//                 }}
//                 disabled={!selectedCountry}
//                 >
//                 <div className="relative">
//                     <Listbox.Button
//                     className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white text-left flex justify-between items-center
//                     focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                     ${showErrors && errors.state ? 'border-rose-500' : 'border-gray-700/60'}
//                     ${!selectedCountry && 'opacity-50 cursor-not-allowed'}`}
//                     >
//                     {selectedState
//                         ? State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name
//                         : selectedCountry
//                         ? "Select State"
//                         : "Select country first"}
//                     <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
//                     </Listbox.Button>

//                     <Transition as="div">
//                     <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-auto custom-scrollbar bg-black border border-zinc-700 rounded-xl py-1 shadow-2xl z-40">
//                         {states.map((state) => (
//                         <Listbox.Option
//                             key={state.isoCode}
//                             value={state.isoCode}
//                             className={({ active }) =>
//                             `px-4 py-2 cursor-pointer text-sm transition-colors ${
//                                 active ? 'bg-zinc-800 text-white' : 'text-white/80'
//                             }`
//                             }
//                         >
//                             {state.name}
//                         </Listbox.Option>
//                         ))}
//                     </Listbox.Options>
//                     </Transition>
//                 </div>
//                 </Listbox>
//                 {showErrors && errors.state && (
//                 <Motion.span
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                 >
//                     {errors.state}
//                 </Motion.span>
//                 )}
//             </div>
//             </div>

//             {/* City & Postal Code */}
//             <div className="grid sm:grid-cols-2 gap-5">
//             <div className="relative z-10">
//                 <label className="block text-xs text-gray-500 mb-1">City</label>
//                 <Listbox
//                 value={selectedCity}
//                 onChange={(value) => {
//                     setSelectedCity(value);
//                     setFormData(prev => ({ ...prev, city: value }));
//                 }}
//                 disabled={!selectedState}
//                 >
//                 <div className="relative">
//                     <Listbox.Button
//                     className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white text-left flex justify-between items-center
//                     focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                     ${showErrors && errors.city ? 'border-rose-500' : 'border-gray-700/60'}
//                     ${!selectedState && 'opacity-50 cursor-not-allowed'}`}
//                     >
//                     {selectedCity || (selectedState ? "Select City" : "Select state first")}
//                     <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
//                     </Listbox.Button>

//                     <Transition as="div">
//                     <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-auto custom-scrollbar bg-black border border-zinc-700 rounded-xl py-1 shadow-2xl z-40">
//                         {cities.length > 0 ? (
//                         cities.map((city) => (
//                             <Listbox.Option
//                             key={city.name}
//                             value={city.name}
//                             className={({ active }) =>
//                                 `px-4 py-2 cursor-pointer text-sm transition-colors ${
//                                 active ? 'bg-zinc-800 text-white' : 'text-white/80'
//                                 }`
//                             }
//                             >
//                             {city.name}
//                             </Listbox.Option>
//                         ))
//                         ) : (
//                         <div className="px-4 py-2 text-gray-500 text-sm">
//                             No cities found
//                         </div>
//                         )}
//                     </Listbox.Options>
//                     </Transition>
//                 </div>
//                 </Listbox>
//                 {showErrors && errors.city && (
//                     <Motion.span
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                     >
//                     {errors.city}
//                     </Motion.span>
//                 )}
//                 </div>

//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">Postal Code</label>
//                     <input
//                       name="postalCode"
//                       type="text"
//                       placeholder="100001"
//                       maxLength={10}
//                       value={formData.postalCode}
//                       onChange={(e) => setFormData(p => ({ ...p, postalCode: e.target.value }))}
//                       className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
//                     />
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div className="relative">
//                   <label className="block text-xs text-gray-500 mb-1">Street Address</label>
//                   <input
//                     name="address"
//                     type="text"
//                     placeholder="123 Main Street"
//                     value={formData.address}
//                     maxLength={120}
//                     autoComplete="address-line1"
//                     onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
//                     className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
//                       focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                       ${showErrors && errors.address ? 'border-rose-500' : 'border-gray-700/60'}`}
//                   />
//                   {showErrors && errors.address && (
//                     <Motion.span
//                       initial={{ opacity: 0, y: -8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                     >
//                       {errors.address}
//                     </Motion.span>
//                   )}
//                 </div>

//                 {/* Apartment */}
//                 <input
//                   name="address2"
//                   type="text"
//                   placeholder="Apartment, suite, unit (optional)"
//                   maxLength={120}
//                   value={formData.address2}
//                   onChange={(e) => setFormData(p => ({ ...p, address2: e.target.value }))}
//                   className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
//                     focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
//                 />

//                 {/* Different Shipping Address Toggle */}
//                 <div className="pt-2">
//                     <label className="flex items-center gap-3 cursor-pointer group">
//                         <input
//                             type="checkbox"
//                             checked={useDifferentShipping}
//                             onChange={(e) => setUseDifferentShipping(e.target.checked)}
//                             className="w-4 h-4 rounded border-gray-700 bg-white/5 text-lime-400 focus:ring-lime-400 focus:ring-offset-0"
//                         />
//                         <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
//                             Ship to a different address
//                         </span>
//                     </label>
//                 </div>

//             {/* Different Shipping Address Fields */}
//             {useDifferentShipping && (
//             <Motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="space-y-4 pt-2 pl-6 rounded-md border-l-2 border-lime-400/30"
//             >
//                 <div className="flex items-center gap-2">
//                 <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lime-400 text-xs" />
//                 <h3 className="text-sm font-semibold text-white">Different Shipping Address</h3>
//                 </div>

//                 {/* Recipient Name */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div className="relative">
//                     <label className="block text-xs text-gray-500 mb-1">First Name</label>
//                     <input
//                       name="firstName"
//                       type="text"
//                       placeholder="Dev"
//                       maxLength={25}
//                         value={formData.shipping_firstName}
//                         onChange={(e) =>
//                         setFormData(prev => ({
//                             ...prev,
//                             shipping_firstName: e.target.value
//                         }))
//                         }
//                       className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                         ${showErrors && errors.shipping_firstName ? 'border-rose-500' : 'border-gray-700/60'}`}
//                     />
//                     {showErrors && errors.shipping_firstName && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.shipping_firstName}
//                       </Motion.span>
//                     )}
//                   </div>

//                   <div className="relative">
//                     <label className="block text-xs text-gray-500 mb-1">Last Name</label>
//                     <input
//                       name="lastName"
//                       type="text"
//                       placeholder="Null"
//                       maxLength={25}
//                       value={formData.shipping_lastName}
//                       onChange={(e) =>
//                         setFormData(prev => ({
//                           ...prev,
//                           shipping_lastName: e.target.value
//                         }))
//                       }
//                       className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                         ${showErrors && errors.shipping_lastName ? 'border-rose-500' : 'border-gray-700/60'}`}
//                     />
//                     {showErrors && errors.shipping_lastName && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.lastName}
//                       </Motion.span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Email & Phone */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div className="relative">
//                     <label className="block text-xs text-gray-500 mb-1">Email Address</label>
//                     <input
//                       name="email"
//                       type="email"
//                       placeholder="dev.null@example.com"
//                       maxLength={80}
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                         ${showErrors && errors.email ? 'border-rose-500' : 'border-gray-700/60'}`}
//                     />
//                     {showErrors && errors.email && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.email}
//                       </Motion.span>
//                     )}
//                   </div>

//                   <div className="relative">
//                     <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
//                     <input
//                       name="phone"
//                       type="tel"
//                       placeholder="+1 234 567 8900"
//                       maxLength={20}
//                       value={formData.shipping_phone ?? ""}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         setFormData(prev => ({
//                             ...prev,
//                             shipping_phone: formatPhone(value, selectedPhoneCountry)
//                         }));
//                         }}
//                       className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
//                         ${showErrors && errors.shipping_phone ? 'border-rose-500' : 'border-gray-700/60'}`}
//                     />
//                     {showErrors && errors.shipping_phone && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.shipping_phone}
//                       </Motion.span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Country & State */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div className="relative z-20">
//                     <label className="block text-xs text-gray-500 mb-1">Country</label>
//                     <input
//                         type="text"
//                         placeholder="Estonia"
//                         maxLength={30}
//                         value={formData.shipping_country}
//                         onChange={(e) =>
//                         setFormData(prev => ({
//                             ...prev,
//                             shipping_country: e.target.value
//                         }))
//                         }
//                         className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
//                     />
//                     {showErrors && errors.shipping_country && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.shipping_country}
//                       </Motion.span>
//                     )}
//                   </div>

//                   <div className="relative z-10">
//                     <label className="block text-xs text-gray-500 mb-1">State / Province</label>
//                     <input
//                         type="text"
//                         placeholder="Tokyo"
//                         maxLength={30}
//                         value={formData.shipping_state}
//                         onChange={(e) =>
//                         setFormData(prev => ({
//                             ...prev,
//                             shipping_state: e.target.value
//                         }))
//                         }
//                         className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
//                     />
//                     {showErrors && errors.shipping_state && (
//                       <Motion.span
//                         initial={{ opacity: 0, y: -8 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                       >
//                         {errors.shipping_state}
//                       </Motion.span>
//                     )}
//                   </div>
//                 </div>

//                 {/* City & Postal Code */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <div className="relative z-10">
//                 <label className="block text-xs text-gray-500 mb-1">City</label>
//                     <input
//                         type="text"
//                         placeholder="Lagos"
//                         maxLength={30}
//                         value={formData.shipping_city}
//                         onChange={(e) =>
//                         setFormData(prev => ({
//                             ...prev,
//                             shipping_city: e.target.value
//                         }))
//                         }
//                         className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
//                     />
//                 {showErrors && errors.shipping_city && (
//                     <Motion.span
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="absolute -bottom-5 left-0 text-xs text-rose-400"
//                     >
//                     {errors.shipping_city}
//                     </Motion.span>
//                 )}
//                   </div>
//                   <div>
//                     <label className="block text-xs text-gray-500 mb-1">Postal Code</label>
//                     <input
//                       name="postalCode"
//                       type="text"
//                       placeholder="100001"
//                       maxLength={10}
//                       value={formData.shipping_postalCode}
//                         onChange={(e) =>
//                         setFormData(prev => ({
//                             ...prev,
//                             shipping_postalCode: e.target.value
//                         }))
//                         }
//                       className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
//                     />
//                   </div>
//                 </div>

//                 {/* Street Address */}
//                 <div>
//                     <label className="block text-xs text-gray-500 mb-1">Street Address</label>
//                     <input
//                         type="text"
//                         placeholder="123 Main Street"
//                         maxLength={120}
//                         value={formData.shipping_address}
//                         onChange={(e) =>
//                         setFormData(prev => ({
//                             ...prev,
//                             shipping_address: e.target.value
//                         }))
//                         }
//                         className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
//                     />
//                     </div>

//                     {/* Apartment (optional) */}
//                     <input
//                     type="text"
//                     placeholder="Apartment, suite, unit (optional)"
//                     maxLength={120}
//                     value={formData.shipping_address2}
//                     onChange={(e) =>
//                         setFormData(prev => ({
//                             ...prev,
//                             shipping_address2: e.target.value
//                         }))
//                         }
//                     className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
//                         focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
//                     />
//                 </Motion.div>
//                 )}

//                 {/* Order Notes */}
//                 <div>
//                   <label className="block text-xs text-gray-500 mb-1">Order Notes (Optional)</label>
//                   <textarea
//                     name="orderNote"
//                     rows={3}
//                     placeholder="Special instructions, delivery notes, etc."
//                     maxLength={300}
//                     value={formData.orderNote}
//                     onChange={(e) => setFormData(p => ({ ...p, orderNote: e.target.value }))}
//                     className="w-full px-4 py-3 rounded-xl bg-white/5 border-b border-gray-700/60 text-white placeholder-gray-500 
//                       focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300 resize-none"
//                   />
//                 </div>
//               </form>
//             </Motion.div>
//           </div>

//           {/* Order Summary - Right Side */}
//           <div className="lg:col-span-1 order-2">
//             <div className="group sticky top-24 bg-white/3 backdrop-blur-lg border-2 border-gray-700/60 rounded-2xl p-6 shadow-[0_5px_10px_rgba(0,0,0,0.6)]">
//               <div className="flex items-center gap-2 mb-5">
//                 <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400 transition-colors" />
//                 <h2 className="text-lg font-bold text-white">Your Order</h2>
//               </div>
              
//               <div className="space-y-3 max-h-80 overflow-y-auto mb-4 custom-scrollbar">
//                  {cartItems.map((item) => (
//                   <div key={item.id} className="flex justify-between text-sm">
//                     <span className="text-gray-300">
//                       {item.name} <span className="text-gray-500">x{item.quantity}</span>
//                     </span>
//                     <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="border-t border-gray-700/60 pt-4 space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-400">Subtotal</span>
//                   <span className="text-white">${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm pb-2">
//                   <span className="text-gray-400">Shipping</span>
//                   <span className="text-white">{shippingCost === 0 ? "Included" : `$${shippingCost.toFixed(2)}`}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-700/60">
//                   <span className="text-white">Total</span>
//                   <span className="text-lime-400">${total.toFixed(2)}</span>
//                 </div>
//               </div>
              
//               <button
//                 onClick={handleSubmit}
//                 disabled={processing}
//                 className="w-full mt-6 font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 py-1.5 rounded-full text-black hover:bg-white 
//                   active:bg-white active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] 
//                   active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200
//                   disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {processing ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
//                     Processing...
//                   </span>
//                 ) : (
//                   `Pay $${total.toFixed(2)}`
//                 )}
//               </button>
              
//               <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 tracking-tighter">
//                 <FontAwesomeIcon icon={faLock} className="text-lime-400" />
//                 <span>Secure checkout with Paystack</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }