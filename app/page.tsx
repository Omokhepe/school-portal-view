"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/aboutSection";
import ProgramSection from "../sections/programSection";
import Footer from "../components/footer";
import Preloader from "../sections/homeLoader";

export default function Home() {
  return (
    <div>
      <Preloader />
      <Navbar />
      <HeroSection />
      <ProgramSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
