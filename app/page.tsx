"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/aboutSection";
import ProgramSection from "../sections/programSection";
import Footer from "../components/footer";
import Preloader from "../sections/homeLoader";
import ImageGallery from "../sections/imageGallery";

export default function Home() {
  return (
    <div>
      <Preloader />
      <Navbar />
      <HeroSection />
      <ProgramSection />
      <ImageGallery />
      <AboutSection />
      <Footer />
    </div>
  );
}
