// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import TopButton from './TopButton';

export default function Layout() {
  return (
    <div className="scroll-smooth flex-grow min-h-screen bg-black text-white font-noto relative">
      <Header />
      <main className="bg-black">
        <Outlet />
      </main>
      <Footer />
      <TopButton />
    </div>
  );
}
