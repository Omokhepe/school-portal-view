import React, { useEffect, useState } from "react";
import bgImage from "@assets/images/heroBg.png";
import { Button } from "@/components/ui/button";
import EnrollTextCarousel from "@components/enrollTextMarquee";
import { coreValues, heroImagesFile, programsList } from "../constant/data";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImagesFile.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-amber-50">
      {/*<div className="max-w-screen-xl mx-auto px-6 text-center">*/}
      {/*<div className="w-full max-w-xl mx-auto text-center">*/}
      <AnimatePresence mode="wait">
        <div
          className="relative border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition h-[80vh] md:h-[90vh] bg-fixed  md:w-full w-screen
             bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${heroImagesFile[index].src.src})`,
          }}
          // programsList[index].title
        ></div>
        {/*</motion.div>*/}
      </AnimatePresence>

      {/* Indicator */}
      <div className="flex justify-center gap-2 mt-5">
        {heroImagesFile.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition
              ${i === index ? "bg-yellow-900" : "bg-gray-300"}
            `}
            aria-label={`Show ${heroImagesFile[i].alt}`}
          />
        ))}
      </div>
      <EnrollTextCarousel />
    </section>
  );
};

export default HeroSection;
