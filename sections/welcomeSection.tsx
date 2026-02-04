"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Cpu,
  UserCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function WelcomeSection() {
  return (
    <section className="py-10 px-5 bg-white">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Intro */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome to Zoe Seeds School
          </h1>

          <p className="text-lg text-gray-700">
            Welcome to a place where learning begins with purpose.
          </p>

          <p className="text-gray-700 max-w-5xl">
            Zoe Seeds School is a nurturing academic community committed to
            raising well-rounded learners from early years through advanced
            levels.
          </p>
        </motion.div>

        {/* Focus Areas with Icons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            What We Focus On
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <FocusItem icon={<UserCheck />} title="Strong Moral Values" />
            <FocusItem icon={<BookOpen />} title="Academic Excellence" />
            <FocusItem icon={<Cpu />} title="Innovation & Technology" />
            <FocusItem icon={<Brain />} title="Individual Growth" />
          </div>
        </motion.div>

        {/* Learning Environment */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-gray-700"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <p>Our classrooms encourage questions.</p>
            <p>Our teachers inspire confidence.</p>
            <p>Our environment supports discovery.</p>
          </div>

          <div className="pt-4 font-medium text-gray-900">
            <p>Every child matters here.</p>
            <p>Every talent is nurtured.</p>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Why Choose Zoe Seeds School
          </h2>

          <p className="text-gray-700 max-w-3xl">
            You want more than good grades for your child. You want growth,
            confidence, and preparation for life.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <WhyItem icon={<Users />} text="Qualified and caring educators" />
            <WhyItem
              icon={<Cpu />}
              text="Technology-enhanced learning with AI support"
            />
            <WhyItem
              icon={<BookOpen />}
              text="Structured curriculum with global relevance"
            />
            <WhyItem
              icon={<ShieldCheck />}
              text="Safe and disciplined learning environment"
            />
            <WhyItem
              icon={<Brain />}
              text="Focus on character, leadership, and creativity"
            />
            <WhyItem icon={<Users />} text="Strong partnership with parents" />
          </div>
        </motion.div>

        {/* Closing */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3 font-medium text-gray-900"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <p>We don’t just teach content.</p>
            <p>We develop thinkers.</p>
            <p>We raise future leaders.</p>
          </div>

          <p className="pt-6 text-lg font-semibold">
            Isn’t that the kind of school your child deserves?
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Small Components ---------- */

function FocusItem({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <div className="text-amber-600">{icon}</div>
      <p className="font-medium text-gray-900">{title}</p>
    </div>
  );
}

function WhyItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-amber-600">{icon}</div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
