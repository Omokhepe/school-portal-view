"use client";

import { behavioralPillars } from "../constant/data";

export default function BehavioralValues() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-4 md:py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {behavioralPillars.map((group, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 rounded-t-xl">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {group.title}
              </h3>
            </div>

            <ul className="px-5 py-4 space-y-3">
              {group.values.map((item, idx) => (
                <li key={idx} className="text-gray-800 text-sm font-medium">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
