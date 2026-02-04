"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import img4 from "@assets/images/4.jpg";

export default function PrincipalsNote() {
  return (
    <section className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Image */}
        {/*<motion.div*/}
        {/*  initial={{ opacity: 0, scale: 0.96 }}*/}
        {/*  whileInView={{ opacity: 1, scale: 1 }}*/}
        {/*  viewport={{ once: true }}*/}
        {/*  transition={{ duration: 0.9 }}*/}
        {/*  className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-xl"*/}
        {/*>*/}
        {/*  <Image*/}
        {/*    src="/images/principal.jpg"*/}
        {/*    alt="Principal of Zoe Seeds School"*/}
        {/*    fill*/}
        {/*    className="object-cover"*/}
        {/*    priority*/}
        {/*  />*/}
        {/*  <div className="absolute inset-0 bg-amber-900/20" />*/}
        {/*</motion.div>*/}

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            A Message from the Principal
          </h2>

          <p className="text-gray-700">
            Welcome to Zoe Seeds School. At Zoe Seeds, we believe education
            shapes character, purpose, and excellence.
          </p>

          <p className="text-gray-700">
            Our commitment is simple. We provide a safe learning environment,
            nurture curiosity, build strong academic foundations, and develop
            confident, disciplined, and innovative learners.
          </p>

          <p className="text-gray-700">
            Our teachers lead with passion and professionalism, and our
            curriculum balances academics, creativity, and essential life
            skills.
          </p>

          <p className="text-gray-700">
            Education here goes beyond examinations. Your child is not just
            taught — your child is prepared for the future.
          </p>

          <p className="font-medium text-gray-900 pt-4">
            Thank you for trusting us with what matters most.
          </p>

          <div className="pt-4">
            <Image
              src={img4}
              alt="Principal signature"
              width={160}
              height={60}
              className="object-contain"
            />
            <p className="text-sm text-gray-600 mt-2">The Principal</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
