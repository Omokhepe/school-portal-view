"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Trophy,
  Flag,
  TrendingUp,
  Compass,
} from "lucide-react";

const stats = [
  { icon: <Calendar />, value: "2012", label: "Established" },
  { icon: <Users />, value: "100+", label: "Students Trained" },
  { icon: <Trophy />, value: "Multiple", label: "Awards & Competitions" },
];

const timeline = [
  {
    icon: <Flag />,
    period: "2012",
    title: "Foundation",
    description:
      "Zoe Seeds School was founded with a clear mission rooted in quality education, strong values, and faith.",
  },
  {
    icon: <TrendingUp />,
    period: "Growth Years",
    title: "Achievements",
    description:
      "Students participated in external examinations and competitions, earning recognition for excellence and character.",
  },
  {
    icon: <Compass />,
    period: "Today",
    title: "Vision Forward",
    description:
      "We continue to grow, blending approved Nigerian curriculum with modern teaching and all-round development.",
  },
];

export default function JourneyAndImpact() {
  return (
    <section className="py-12 px-5 bg-white">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10s text-center">
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="space-y-3"
            >
              <div className="flex justify-center text-amber-700">
                {item.icon}
              </div>
              <p className="text-4xl font-bold text-gray-900">{item.value}</p>
              <p className="text-gray-700 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Our Journey
          </h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-5 top-0 h-full w-px bg-amber-200 hidden sm:block" />

            <div className="space-y-12">
              {timeline.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-start gap-6"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-amber-700">
                      {step.period}
                    </p>
                    <p className="font-semibold text-gray-900">{step.title}</p>
                    <p className="text-gray-700 max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
