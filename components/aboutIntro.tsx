"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    <section className="py-10 px-5 bg-off-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/about-school.jpg"
            alt="Zoe Seeds School environment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-amber-900/20" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to Zoe Seeds School
          </h2>

          <p className="text-gray-700">
            Zoe Seeds School has been nurturing young minds since 2012. Over the
            years, we have trained over one hundred students and guided them
            through external examinations, competitions, and award-winning
            academic experiences.
          </p>

          <p className="text-gray-700">
            We believe education is holistic. We prioritize the all-round
            development of every child — intellectually, socially, emotionally,
            and spiritually.
          </p>

          <p className="text-gray-700">
            God remains at the forefront of our learning, shaping our values,
            discipline, and sense of purpose.
          </p>

          <p className="font-medium text-gray-900 pt-2">
            This is more than a school. It is a place where children grow with
            purpose.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
