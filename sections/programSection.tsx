"use client";

import React, { useState, useEffect } from "react";
import { coreValues, programsList } from "../constant/data";
import { AnimatePresence } from "framer-motion";

const ProgramSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % coreValues.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-amber-50 md:py-15 py-8">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-6 mb-3 md:mb-10">
          Our Programs
        </h2>
        <p className="text-gray-600 mb-5 md:mb-12">
          Explore our diverse academic programs designed to inspire learning,
          innovation, and leadership.
        </p>

        <div className="hidden md:grid  gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programsList.map((program, index) => (
            <div
              className="relative p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition
             bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: `url(${program.bgImg.src})` }}
              key={index}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-yellow-900/60 z-0 rounded-xl shadow-md" />

              {/* Content */}
              <div className="relative z-10 text-center mt-14">
                <h3 className="text-xl font-semibold text-off-white mb-2">
                  {program.title}
                </h3>
                <p className="text-amber-50 text-sm">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xl mx-auto text-center md:hidden">
        <AnimatePresence mode="wait">
          <div
            className="relative p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition mx-6
             bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${programsList[index].bgImg.src})` }}
            // programsList[index].title
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-yellow-900/60 z-0 rounded-xl shadow-md" />

            {/* Content */}
            <div className="relative z-10 text-center mt-14">
              <h3 className="text-xl font-semibold text-off-white mb-2">
                {programsList[index].title}
              </h3>
              <p className="text-amber-50 text-sm">
                {programsList[index].description}
              </p>
            </div>
          </div>
          {/*</motion.div>*/}
        </AnimatePresence>

        {/* Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {programsList.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition
              ${i === index ? "bg-yellow-900" : "bg-gray-300"}
            `}
              aria-label={`Show ${programsList[i].title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
