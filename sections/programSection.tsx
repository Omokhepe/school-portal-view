import React from "react";

const ProgramSection = () => {
  return (
    <section className="bg-amber-50 py-20">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Our Programs</h2>
        <p className="text-gray-600 mb-12">
          Explore our diverse academic programs designed to inspire learning,
          innovation, and leadership.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/*Program 1*/}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-center mb-4">
              <img
                src="assets/images/science-icon.svg"
                alt="Science"
                className="h-12 w-12"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Science & Technology
            </h3>
            <p className="text-gray-600 text-sm">
              Build a strong foundation in modern science, innovation, and
              research.
            </p>
          </div>

          {/*Program 2 */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-center mb-4">
              <img
                src="assets/images/business-icon.svg"
                alt="Business"
                className="h-12 w-12"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Business Studies
            </h3>
            <p className="text-gray-600 text-sm">
              Develop skills in entrepreneurship, finance, and leadership for
              the global economy.
            </p>
          </div>

          {/*Program 3 */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-center mb-4">
              <img
                src="assets/images/art-icon.svg"
                alt="Arts"
                className="h-12 w-12"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Arts & Humanities
            </h3>
            <p className="text-gray-600 text-sm">
              Inspire creativity and critical thinking through art, music, and
              literature.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
