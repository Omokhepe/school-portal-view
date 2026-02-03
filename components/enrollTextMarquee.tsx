"use client";
import { motion } from "framer-motion";

const messages = [
  "Enroll with us — where learning meets purpose.",
  "Enroll with us — building confident and curious learners.",
  "Enroll with us — strong academics, strong values.",
  "Enroll with us — nurturing excellence from the early years.",
  "Enroll with us — preparing students for today and tomorrow.",
];

export default function EnrollTextCarousel() {
  return (
    <div className="overflow-hidden w-full bg-transparent mt-4">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 55,
          repeat: Infinity,
        }}
      >
        {/* duplicate for seamless loop */}
        {[...messages, ...messages, ...messages].map((text, index) => (
          <span
            key={index}
            className="text-2xl md:text-3xl font-semibold text-yellow-900"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
