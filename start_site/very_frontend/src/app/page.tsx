// import Image from "next/image";
// import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TeaserCards from "@/components/TeaserCards";
import Community from "@/components/Community";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import ReadSection from "../components/ReadSection";
import LearnSection from "../components/LearnSection";


export default function Home() {
  return (
    <>

      <main>
      
        <Hero />

        <TeaserCards />

        <ReadSection />

        <LearnSection />

        <Community />

        <Testimonials />

        <CTA />

      </main>

    </>
  );  
}
