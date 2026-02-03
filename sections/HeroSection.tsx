import React from "react";
import bgImage from "@assets/images/heroBg.png";
import { Button } from "@/components/ui/button";
import EnrollTextCarousel from "@components/enrollTextMarquee";

const HeroSection = () => {
  return (
    <section
      className={`
          relative h-[80vh] md:h-[90vh] bg-fixed bg-center bg-cover w-full
        `}
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="h-full flex items-center justify-center bg-black/40">
        <div className="max-w-screen-xl px-7 md:px-20">
          <h1 className="md:text-5xl text-3xl font-extrabold text-off-white mb-4">
            Welcome to Zoe Seed Schools
          </h1>
          <p className="text-lg text-amber-50 mb-8">
            Empowering students with knowledge, character, and excellence.
          </p>
          <div className="hidden md:flex ">
            <button className="px-6 py-3 text-white outline-2 outline-offset-2 outline-yellow-900 hover:bg-yellow-900 hover:outline-0 rounded-lg font-medium mr-7">
              Enroll Now
            </button>
            <button className="px-6 py-3 text-white outline-2 outline-offset-2 outline-yellow-900 hover:bg-yellow-900 hover:outline-0 rounded-lg font-medium mr-7">
              Learn More
            </button>
            <button className="px-6 py-3 text-white outline-2 outline-offset-2 outline-yellow-900 hover:bg-yellow-900 hover:outline-0 rounded-lg font-medium">
              Take A virtual Tour
            </button>
          </div>
          {/*This for smaller devices*/}
          <div className="md:hidden">
            <div className="flex mb-4 ">
              <Button
                variant="outline"
                className="px-6 py-3 text-xs text-white border-2 outline-offset-2 bg-transparent border-yellow-900 hover:bg-yellow-900 hover:outline-0 rounded-lg font-medium mr-7"
              >
                Enroll Now
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 text-xs text-white border-2 outline-offset-2 bg-transparent border-yellow-900 hover:bg-yellow-900 hover:outline-0 rounded-lg font-medium "
              >
                Learn More
              </Button>
            </div>

            <Button
              variant="outline"
              className="px-6 py-3 text-xs text-white border-2 outline-offset-2 bg-transparent border-yellow-900 hover:bg-yellow-900 hover:outline-0 rounded-lg font-medium"
            >
              Take A virtual Tour
            </Button>
          </div>
        </div>
      </div>
      <EnrollTextCarousel />
    </section>
  );
};

export default HeroSection;
