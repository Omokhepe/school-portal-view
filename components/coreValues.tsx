"use client";

import { AnimatePresence, motion } from "framer-motion";
import { coreValues } from "../constant/data";
import { useEffect, useState } from "react";

export default function CoreValuesGrid() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % coreValues.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className=" py-2">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 md:mb-12">
          Our Core Values
        </h2>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group relative bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg cursor-pointer"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>

              {/* Accent */}
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-900 transition-all duration-300 group-hover:w-full rounded-b-xl" />
            </motion.div>
          ))}
        </div>
        <div className="w-full max-w-xl mx-auto text-center md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={coreValues[index].title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-4xl font-bold text-yellow-900 mb-4">
                {coreValues[index].title}
              </h3>

              <p className="text-gray-600 text-lg">
                {coreValues[index].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {coreValues.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition
              ${i === index ? "bg-yellow-900" : "bg-gray-300"}
            `}
                aria-label={`Show ${coreValues[i].title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
