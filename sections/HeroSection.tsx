import React from "react";
import bgImage from "@assets/images/heroBg.png";

const HeroSection = () => {
  return (
    <section
      className={`
          relative h-screen bg-fixed bg-center bg-cover w-full
        `}
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="h-full flex items-center justify-center bg-black/40">
        <div className="max-w-screen-xl px-20">
          <h1 className="text-5xl font-extrabold text-off-white mb-4">
            Welcome to Zoe Seed Schools
          </h1>
          <p className="text-lg text-amber-50 mb-8">
            Empowering students with knowledge, character, and excellence.
          </p>
          <div>
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
