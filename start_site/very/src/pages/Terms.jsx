// src/pages/Terms.jsx

export default function Terms() {
  return (
    <div className="prose prose-neutral max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-neon">Terms of Use</h1>

      <p>
        By using this site, you agree to a few sensible things:
      </p>

      <ol className="list-decimal ml-5 space-y-2">
        <li>
          Don’t copy content and claim it as your own. Be cool, give credit.
        </li>
        <li>
          No AI doomsday trolling. We're here to learn and have fun.
        </li>
        <li>
          I make no promises that everything here is flawless — but I do try.
        </li>
        <li>
          The tech world moves fast, so things may change or break. I’ll patch it up.
        </li>
      </ol>

      <p>
        TL;DR: Be kind, don’t be sketchy, and enjoy the ride.
      </p>

      <p className="text-sm italic">
        Questions? Just reach out — I don’t bite (unless...)
      </p>
    </div>
  );
}
