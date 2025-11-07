import Navbar from "../components/Navbar";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/aboutSection";
import ProgramSection from "../sections/programSection";
import Footer from "../components/footer";

export default function Home() {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProgramSection />
      <Footer />
    </div>
  );
}
