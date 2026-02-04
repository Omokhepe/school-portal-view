"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/aboutSection";
import ProgramSection from "../sections/programSection";
import Footer from "../components/footer";
import Preloader from "../sections/homeLoader";
import ImageGallery from "../sections/imageGallery";
import WelcomeSection from "../sections/welcomeSection";
import JourneyAndImpact from "@components/impactDisplay";

export default function Home() {
  return (
    <div>
      <Preloader />
      <Navbar />
      <HeroSection />
      <WelcomeSection />
      <ProgramSection />
      <JourneyAndImpact />
      <ImageGallery />
      <AboutSection />
      <Footer />
    </div>
  );
}
