/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion as Motion } from 'framer-motion';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { Country, State } from 'country-state-city';
import { getCountryCallingCode } from 'libphonenumber-js';
import type { CountryCode } from "libphonenumber-js";
import type { FormData, Errors } from "@/app/checkout/page";

interface CheckoutFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Errors;
  showErrors: boolean;
  status: { type: 'error' | null; message?: string };
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  selectedState: string;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  selectedPhoneCountry: CountryCode;
  setSelectedPhoneCountry: React.Dispatch<React.SetStateAction<CountryCode>>;
  countries: any[];
  states: any[];
  cities: any[];
  countryName: string;
  stateName: string;
  useDifferentShipping: boolean;
  setUseDifferentShipping: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formatPhone: (value: string, country?: CountryCode) => string;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CheckoutForm({
  formData,
  setFormData,
  errors,
  showErrors,
  status,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  selectedPhoneCountry,
  setSelectedPhoneCountry,
  countries,
  states,
  cities,
  // countryName,
  // stateName,
  useDifferentShipping,
  setUseDifferentShipping,
  handleInputChange,
  formatPhone,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group rounded-2xl p-6 sm:p-8 space-y-6 border border-gray-700/60 bg-white/3 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Header with green bar */}
      <div className="flex items-center gap-3 mt-2">
        <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover:bg-pink-400 group-active:bg-pink-400 transition-colors" />
        <Motion.h2
          className="text-xl sm:text-2xl font-black text-white"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Shipping Details
        </Motion.h2>
      </div>

      {status.type && (
        <Motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg text-sm bg-rose-500/10 text-rose-400 border border-rose-500/30"
        >
          {status.message}
        </Motion.div>
      )}

      <form className="space-y-6 text-sm md:text-base tracking-tighter" onSubmit={onSubmit} noValidate>
        {/* Name Row */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="Dev"
              maxLength={25}
              autoComplete="given-name"
              value={formData.firstName}
              onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
              className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                ${showErrors && errors.firstName ? 'border-rose-500' : 'border-gray-700/60'}`}
            />
            {showErrors && errors.firstName && (
              <Motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 left-0 text-xs text-rose-400"
              >
                {errors.firstName}
              </Motion.span>
            )}
          </div>

          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Null"
              maxLength={25}
              value={formData.lastName}
              onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
              className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                ${showErrors && errors.lastName ? 'border-rose-500' : 'border-gray-700/60'}`}
            />
            {showErrors && errors.lastName && (
              <Motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 left-0 text-xs text-rose-400"
              >
                {errors.lastName}
              </Motion.span>
            )}
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="dev.null@example.com"
              maxLength={80}
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
              className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                ${showErrors && errors.email ? 'border-rose-500' : 'border-gray-700/60'}`}
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
          </div>


          {/* Phone Number */}
          <div className="relative z-20">
            <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
            <div
              className={`w-full px-3 py-2 rounded-xl bg-white/5 border flex items-center gap-2
              focus-within:ring-2 focus-within:ring-lime-400/50 focus-within:border-lime-400/50 transition-all duration-300
              ${showErrors && errors.phone ? 'border-rose-500' : 'border-gray-700/60'}`}
            >
              {/* Country Code Listbox */}
              <Listbox value={selectedPhoneCountry} onChange={(val) => setSelectedPhoneCountry(val)}>
                <div className="relative">
                  <Listbox.Button className="flex items-center gap-2 pr-3 border-r border-gray-700/60 text-white">
                    <span>
                      {selectedPhoneCountry
                        ? `+${getCountryCallingCode(selectedPhoneCountry)}`
                        : "+Code"}
                    </span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="text-gray-400 text-xs"
                    />
                  </Listbox.Button>

                  <Transition
                    as="div"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="absolute mt-4 max-h-60 min-w-[270px] overflow-y-auto custom-scrollbar 
                      bg-black border border-zinc-700 rounded-xl py-1 shadow-2xl z-50"
                    >
                      {countries.map((country) => (
                        <Listbox.Option
                          key={country.isoCode}
                          value={country.isoCode as CountryCode}
                          className={({ active }) =>
                            `cursor-pointer select-none p-3 flex justify-between text-sm
                            ${active ? "bg-zinc-800 text-white" : "text-white/80"}`
                          }
                        >
                          <span>{country.name}</span>
                          <span className="text-gray-500">
                            +{getCountryCallingCode(country.isoCode as CountryCode)}
                          </span>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>

              {/* Phone Input */}
              <input
                type="tel"
                inputMode="tel"
                placeholder={
                  selectedPhoneCountry
                    ? `+${getCountryCallingCode(selectedPhoneCountry)} 123 456 7890`
                    : "+123 456 7890"
                }
                maxLength={20}
                value={formData.phone ?? ""}
                autoComplete="tel"
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    phone: formatPhone(e.target.value, selectedPhoneCountry),
                  }))
                }
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>

            {showErrors && errors.phone && (
              <Motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 left-0 text-xs text-rose-400"
              >
                {errors.phone}
              </Motion.span>
            )}
          </div>
        </div>

        {/* Country & State */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Shipping Country - Proper Selector */}
          <div className="relative z-20">
            <label className="block text-xs text-gray-500 mb-1">Country</label>
            <Listbox
              value={formData.shipping_country_code || ""}
              onChange={(value) => {
                setSelectedCountry(value);
                setSelectedPhoneCountry(value as CountryCode);
                setSelectedState("");
                setSelectedCity("");             // Reset when country changes
                setFormData(p => ({
                  ...p,
                  shipping_country_code: value,
                  shipping_country: Country.getCountryByCode(value)?.name || ""
                }));
              }}
            >
              <div className="relative">
                <Listbox.Button className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white text-left flex justify-between items-center
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                  ${showErrors && errors.shipping_country ? 'border-rose-500' : 'border-gray-700/60'}`}>
                  {formData.shipping_country || "Select Country"}
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
                </Listbox.Button>

                <Transition as="div">
                  <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-auto custom-scrollbar bg-black border border-zinc-700 rounded-xl py-1 shadow-2xl z-50">
                    {countries.map((country) => (
                      <Listbox.Option
                        key={country.isoCode}
                        value={country.isoCode}
                        className={({ active }) =>
                          `px-4 py-2 cursor-pointer text-sm transition-colors ${active ? 'bg-zinc-800 text-white' : 'text-white/80'
                          }`
                        }
                      >
                        {country.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            {showErrors && errors.shipping_country && (
              <Motion.span className="absolute -bottom-5 left-0 text-xs text-rose-400">
                {errors.shipping_country}
              </Motion.span>
            )}
          </div>

          <div className="relative z-10">
            <label className="block text-xs text-gray-500 mb-1">State / Province</label>
            <Listbox
              value={selectedState}
              onChange={(value) => {
                setSelectedState(value);
                setSelectedCity("");
              }}
              disabled={!selectedCountry}
            >
              <div className="relative">
                <Listbox.Button
                  className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white text-left flex justify-between items-center
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                  ${showErrors && errors.state ? 'border-rose-500' : 'border-gray-700/60'}
                  ${!selectedCountry && 'opacity-50 cursor-not-allowed'}`}
                >
                  {selectedState
                    ? State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name
                    : selectedCountry
                      ? "Select State"
                      : "Select country first"}
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
                </Listbox.Button>

                <Transition as="div">
                  <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-auto custom-scrollbar bg-black border border-zinc-700 rounded-xl py-1 shadow-2xl z-40">
                    {states.map((state) => (
                      <Listbox.Option
                        key={state.isoCode}
                        value={state.isoCode}
                        className={({ active }) =>
                          `px-4 py-2 cursor-pointer text-sm transition-colors ${active ? 'bg-zinc-800 text-white' : 'text-white/80'
                          }`
                        }
                      >
                        {state.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            {showErrors && errors.state && (
              <Motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 left-0 text-xs text-rose-400"
              >
                {errors.state}
              </Motion.span>
            )}
          </div>
        </div>

        {/* City & Postal Code */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative z-10">
            <label className="block text-xs text-gray-500 mb-1">City</label>
            <Listbox
              value={selectedCity}
              onChange={(value) => {
                setSelectedCity(value);
                setFormData(prev => ({ ...prev, city: value }));
              }}
              disabled={!selectedState}
            >
              <div className="relative">
                <Listbox.Button
                  className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white text-left flex justify-between items-center
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                  ${showErrors && errors.city ? 'border-rose-500' : 'border-gray-700/60'}
                  ${!selectedState && 'opacity-50 cursor-not-allowed'}`}
                >
                  {selectedCity || (selectedState ? "Select City" : "Select state first")}
                  <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
                </Listbox.Button>

                <Transition as="div">
                  <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-y-auto custom-scrollbar bg-black border border-zinc-700 rounded-xl py-1 shadow-2xl z-40">
                    {cities.length > 0 ? (
                      cities.map((city) => (
                        <Listbox.Option
                          key={city.name}
                          value={city.name}
                          className={({ active }) =>
                            `px-4 py-2 cursor-pointer text-sm transition-colors ${active ? 'bg-zinc-800 text-white' : 'text-white/80'
                            }`
                          }
                        >
                          {city.name}
                        </Listbox.Option>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        No cities found
                      </div>
                    )}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            {showErrors && errors.city && (
              <Motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 left-0 text-xs text-rose-400"
              >
                {errors.city}
              </Motion.span>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Postal Code</label>
            <input
              name="postalCode"
              type="text"
              placeholder="100001"
              maxLength={10}
              value={formData.postalCode}
              onChange={(e) => setFormData(p => ({ ...p, postalCode: e.target.value }))}
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* Address */}
        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1">Street Address</label>
          <input
            name="address"
            type="text"
            placeholder="123 Main Street"
            value={formData.address}
            maxLength={120}
            autoComplete="address-line1"
            onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
            className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
              ${showErrors && errors.address ? 'border-rose-500' : 'border-gray-700/60'}`}
          />
          {showErrors && errors.address && (
            <Motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-5 left-0 text-xs text-rose-400"
            >
              {errors.address}
            </Motion.span>
          )}
        </div>

        {/* Apartment */}
        <input
          name="address2"
          type="text"
          placeholder="Apartment, suite, unit (optional)"
          maxLength={120}
          value={formData.address2}
          onChange={(e) => setFormData(p => ({ ...p, address2: e.target.value }))}
          className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
            focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
        />

        {/* Different Shipping Address Toggle */}
        <div className="pt-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={useDifferentShipping}
              onChange={(e) => setUseDifferentShipping(e.target.checked)}
              className="w-4 h-4 rounded border-gray-700 bg-white/5 text-lime-400 focus:ring-lime-400 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Ship to a different address
            </span>
          </label>
        </div>

        {/* Different Shipping Address Fields */}
        {useDifferentShipping && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 pt-2 pl-6 rounded-md border-l-2 border-lime-400/30"
          >
            {/* ... (the entire different shipping block - exact same as original) ... */}
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-lime-400 text-xs" />
              <h3 className="text-sm font-semibold text-white">Different Shipping Address</h3>
            </div>

            {/* Recipient Name */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="Dev"
                  maxLength={25}
                  value={formData.shipping_firstName}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      shipping_firstName: e.target.value
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                    ${showErrors && errors.shipping_firstName ? 'border-rose-500' : 'border-gray-700/60'}`}
                />
                {showErrors && errors.shipping_firstName && (
                  <Motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 left-0 text-xs text-rose-400"
                  >
                    {errors.shipping_firstName}
                  </Motion.span>
                )}
              </div>

              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Null"
                  maxLength={25}
                  value={formData.shipping_lastName}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      shipping_lastName: e.target.value
                    }))
                  }
                  className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                    ${showErrors && errors.shipping_lastName ? 'border-rose-500' : 'border-gray-700/60'}`}
                />
                {showErrors && errors.shipping_lastName && (
                  <Motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 left-0 text-xs text-rose-400"
                  >
                    {errors.lastName}
                  </Motion.span>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="dev.null@example.com"
                  maxLength={80}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                    ${showErrors && errors.email ? 'border-rose-500' : 'border-gray-700/60'}`}
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
              </div>

              <div className="relative">
                <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  maxLength={20}
                  value={formData.shipping_phone ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      shipping_phone: formatPhone(value, selectedPhoneCountry)
                    }));
                  }}
                  className={`w-full px-4 py-2 rounded-xl bg-white/5 border text-white placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300
                    ${showErrors && errors.shipping_phone ? 'border-rose-500' : 'border-gray-700/60'}`}
                />
                {showErrors && errors.shipping_phone && (
                  <Motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 left-0 text-xs text-rose-400"
                  >
                    {errors.shipping_phone}
                  </Motion.span>
                )}
              </div>
            </div>

            {/* Country & State */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="relative z-20">
                <label className="block text-xs text-gray-500 mb-1">Country</label>
                <input
                  type="text"
                  placeholder="Estonia"
                  maxLength={30}
                  value={formData.shipping_country}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      shipping_country: e.target.value
                    }))
                  }
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
                />
                {showErrors && errors.shipping_country && (
                  <Motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 left-0 text-xs text-rose-400"
                  >
                    {errors.shipping_country}
                  </Motion.span>
                )}
              </div>

              <div className="relative z-10">
                <label className="block text-xs text-gray-500 mb-1">State / Province</label>
                <input
                  type="text"
                  placeholder="Tokyo"
                  maxLength={30}
                  value={formData.shipping_state}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      shipping_state: e.target.value
                    }))
                  }
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
                />
                {showErrors && errors.shipping_state && (
                  <Motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 left-0 text-xs text-rose-400"
                  >
                    {errors.shipping_state}
                  </Motion.span>
                )}
              </div>
            </div>

            {/* City & Postal Code */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="relative z-10">
                <label className="block text-xs text-gray-500 mb-1">City</label>
                <input
                  type="text"
                  placeholder="Lagos"
                  maxLength={30}
                  value={formData.shipping_city}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      shipping_city: e.target.value
                    }))
                  }
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
                />
                {showErrors && errors.shipping_city && (
                  <Motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 left-0 text-xs text-rose-400"
                  >
                    {errors.shipping_city}
                  </Motion.span>
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Postal Code</label>
                <input
                  name="postalCode"
                  type="text"
                  placeholder="100001"
                  maxLength={10}
                  value={formData.shipping_postalCode}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      shipping_postalCode: e.target.value
                    }))
                  }
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Street Address</label>
              <input
                type="text"
                placeholder="123 Main Street"
                maxLength={120}
                value={formData.shipping_address}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    shipping_address: e.target.value
                  }))
                }
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
              />
            </div>

            {/* Apartment (optional) */}
            <input
              type="text"
              placeholder="Apartment, suite, unit (optional)"
              maxLength={120}
              value={formData.shipping_address2}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  shipping_address2: e.target.value
                }))
              }
              className="w-full px-4 py-2 rounded-xl bg-white/5 border border-gray-700/60 text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
            />
          </Motion.div>
        )}

        {/* Order Notes */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Order Notes (Optional)</label>
          <textarea
            name="orderNote"
            rows={3}
            placeholder="Special instructions, delivery notes, etc."
            maxLength={300}
            value={formData.orderNote}
            onChange={(e) => setFormData(p => ({ ...p, orderNote: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border-b border-gray-700/60 text-white placeholder-gray-500 
              focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300 resize-none"
          />
        </div>
      </form>
    </Motion.div>
  );
}