// import Image from "next/image";
// import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TeaserCards from "@/components/TeaserCards";
import Community from "@/components/Community";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import BlogSection from "../components/BlogSection";
import LearnSection from "../components/LearnSection";


export default function Home() {
  return (
    <>

      <main>
      
        <Hero />

        <TeaserCards />

        <LearnSection />

        <BlogSection />

        <Community />

        <Testimonials />

        <CTA />

      </main>

    </>
  );  
}
