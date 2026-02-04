import React from "react";
import BehavioralValues from "@components/behaviorValue";
import CoreValuesGrid from "@components/coreValues";

const VisionSection = () => {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* ABOUT INTRO */}
        {/*<div className="text-center max-w-3xl mx-auto">*/}
        {/*  /!*<h1 className="text-4xl font-bold mb-6">About Our School</h1>*!/*/}
        {/*  <p className="text-gray-600 text-lg leading-relaxed">*/}
        {/*    Zoe Seeds School is committed to nurturing well-rounded learners*/}
        {/*    through quality education, strong values, and purposeful character*/}
        {/*    development. We believe every child has the potential to lead,*/}
        {/*    create impact, and thrive.*/}
        {/*  </p>*/}
        {/*</div>*/}

        {/* VISION & MISSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-xl p-5 px-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To Raise Learners with the FEAR of God in a Friendly Environment,
              Equip with Skills and Value Necessary for Success in an Ever
              Changing world, with Commitments to{" "}
              <span className="font-bold">EXCELLENCE</span> through Knowledge
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl py-5 px-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To provide a well-rounded education that prepares students for
              success in Life, Academic, careers, and as Responsible Global
              Citizen
            </p>
          </div>
        </div>

        {/* CORE VALUES */}
        {/*<div>*/}
        {/*  <h2 className="text-3xl font-bold text-center mb-12">*/}
        {/*    Our Core Values*/}
        {/*  </h2>*/}
        <CoreValuesGrid />
        {/*</div>*/}

        {/* BEHAVIORAL CODES */}
        <div>
          <h2 className="text-3xl font-bold text-center">
            Our Behavioral Codes
          </h2>
          {/*<p className="text-center text-gray-600 max-w-2xl mx-auto">*/}
          {/*  These behaviors guide how our students learn, interact, and grow*/}
          {/*  every day — in school and beyond.*/}
          {/*</p>*/}

          <BehavioralValues />
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
