export default function FAQs() {
  const faqs = [
    { q: "Is this for beginners?", a: "Absolutely. You’re exactly who we made this for." },
    { q: "Do I need to know how to code?", a: "Nope. We’ll walk you through the basics (and the not-so-basics)." },
    { q: "How often do you post?", a: "We aim for weekly, but we post when we have something worth your time." }
  ];

  return (
    <div className="bg-black min-h-screen py-16 px-6 font-inter">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">FAQs</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-semibold text-lg">{faq.q}</h2>
            <p className="text-shadow-gray">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
