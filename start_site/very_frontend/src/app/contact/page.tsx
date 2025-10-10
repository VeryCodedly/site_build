"use client";

import React, { useState } from "react";

type ApiResponse = { success?: string; error?: string; detail?: string; [k: string]: unknown };

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info" | null; message?: string }>({
    type: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    const payload = { name, email, message };
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/contact/"; // override in prod if needed

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const csrftoken = getCookie("csrftoken");
    if (csrftoken) headers["X-CSRFToken"] = csrftoken;

    try {
      setIsSending(true);
      setStatus({ type: "info", message: "Sending…" });

      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        credentials: "include", // include cookies (for CSRF/session); ok for same-origin
        body: JSON.stringify(payload),
      });

      // try to parse JSON (some endpoints may respond with no body)
      let data: ApiResponse | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok) {
        setStatus({ type: "success", message: data?.success || "Message sent successfully!" });
        form.reset();
      } else {
        const errMsg = data?.error || data?.detail || JSON.stringify(data) || `Server error (${res.status})`;
        setStatus({ type: "error", message: errMsg });
      }
    } catch (err: unknown) {
      setStatus({ type: "error", message: (err as Error).message || "Network error" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="group relative min-h-screen py-20 px-6">
      <div className="absolute inset-0 bg-[url('/images/bg-1.svg')] bg-center bg-cover opacity-40"></div>

      <div className="relative max-w-3xl mx-auto rounded-2xl p-10 text-center space-y-8 border border-gray-800 bg-white/5 backdrop-blur-lg shadow-[0_15px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_30px_rgba(0,0,0,0.7)] transition-all duration-400">
        <h1 className="text-4xl font-bold text-lime-400 mb-6 group-hover:scale-110 transition-transform duration-700">
          Contact Us
        </h1>

        <p className="text-gray-300 mb-6">
          Got a question, feedback, or just want to say hi? Drop us a message and we’ll get back to you whenever lol
        </p>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
              disabled={isSending}
            />
          </div>

          <div>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
              disabled={isSending}
            />
          </div>

          <div>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
              required
              disabled={isSending}
            />
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              type="submit"
              disabled={isSending}
              className={`w-1/3 md:w-1/4 font-bold cursor-pointer border-2 border-gray-500 bg-lime-400 hover:bg-white text-black px-3 py-1 rounded-full shadow-[0_3px_0_0_#0f0] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#0f0] active:translate-y-1.5 transition-all duration-200 ${isSending ? "opacity-70 cursor-wait" : ""}`}
            >
              {isSending ? (
                "Sending..."
              ) : (
                <>
                  <span className="md:hidden">Send</span>
                  <span className="hidden md:inline">Send Message</span>
                </>
              )}
            </button>

            {status.type && (
              <p
                className={`text-sm ${
                  status.type === "success" ? "text-green-400" : status.type === "error" ? "text-rose-400" : "text-gray-300"
                }`}
              >
                {status.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
