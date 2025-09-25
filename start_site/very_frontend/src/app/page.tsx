// import Image from "next/image";
// import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TeaserCards from "@/components/TeaserCards";
import Community from "@/components/Community";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
// import Footer from "@/components/Footer";
import TopButton from "@/components/TopButton";


export default function Home() {
  return (
    <>
    <main>
      
      <Hero />

      <TeaserCards />

      <Community />

      <Testimonials />

      <CTA />

      <TopButton />

    </main>
    </>
  );  
}
