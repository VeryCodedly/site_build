// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-screen bg-[url('../images/bg-404.jpg')] bg-center bg-cover text-center space-y-6 py-16">
      <h2 className="text-4xl font-bold text-lime-400">404</h2>
      <p className="text-xl">Oops! You found a void in the matrix.</p>
      <Link
        to="/"
        className="inline-block mt-10 px-6 py-2 bg-white/5 text-white rounded hover:scale-105 transition"
      >
        Beam me up, Scotty!
      </Link>
    </div>
  );
}
