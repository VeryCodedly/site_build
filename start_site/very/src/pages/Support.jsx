export default function Support() {
  return (
    <div className="bg-white text-graphite min-h-screen px-6 py-16 font-inter">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Need a hand?</h1>
        <p className="mb-4">We're here to help with tech bugs, site confusion, or if you're just stuck and need a friend.</p>
        <form className="space-y-4">
          <input className="w-full border px-4 py-2 rounded" placeholder="Your email" />
          <textarea className="w-full border px-4 py-2 rounded" rows="5" placeholder="How can we help?" />
          <button className="bg-neon text-white px-6 py-2 rounded hover:brightness-110">Submit</button>
        </form>
      </div>
    </div>
  );
}
