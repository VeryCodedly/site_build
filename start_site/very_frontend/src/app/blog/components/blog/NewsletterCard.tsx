export default function NewsletterCard() {
  return (
    <div className="p-4 m-4 rounded-xl bg-lime-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md">
      <h3 className="text-sm font-bold">Stay in the Loop</h3>
      <p className="text-xs mt-1">One email a week. Tech, dev, gadgets — without the noise.</p>
      <input
        type="email"
        placeholder="Your email"
        className="w-full mt-2 px-2 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
      />
      <button className="mt-2 w-full bg-lime-400 hover:bg-lime-500 text-black text-sm font-semibold py-1 rounded-md">
        Subscribe
      </button>
    </div>
  );
}
