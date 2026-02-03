import React from "react";
import ReviewCarousel from "./reviewCarousel";

const AboutSection = () => {
  return (
    <section>
      <div className="md:h-[50vh] grid md:grid-cols-2 ">
        {/* Left column */}
        <div className="bg-amber-50/40 md:bg-yellow-900/40 h-full grid place-items-center shadow-2xl">
          <div className="text-left p-4">
            {/*<p className="text-off-white">*/}
            {/*  For years, Olive Vine Academy has been known for nurturing <br />*/}
            {/*  young minds with excellence, discipline, and purpose.*/}
            {/*  <br />*/}
            {/*  As we continue to grow, we are embracing a new identity <br />*/}
            {/*  that reflects our vision for the future — Zoe Seeds Basic Schools.*/}
            {/*</p>*/}
            <h2 className="text-3xl font-bold mb-4">
              What Parents and Students Are Saying
            </h2>

            <p className="text-gray-600 max-w-2xl mb-10">
              From inspiring stories of academic achievements to heartfelt
              accounts of character development, these testimonials reflect the
              impact of Olive-Vine.
            </p>
          </div>
          <div className="md:hidden">
            <ReviewCarousel />
          </div>
        </div>

        {/* Right column */}
        <div className="hidden md:grid bg-off-white h-full  place-items-center shadow-2xl ">
          {/*<div className="pl-10 w-full">*/}
          <ReviewCarousel />
          {/*</div>*/}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
