import React from "react";

const AboutSection = () => {
  return (
    <section>
      <div className="h-[50vh] flex items-center ">
        <div className="bg-yellow-900 opacity-25 w-1/2 h-full flex items-center text-left justify-end pr-10 shadow-2xl">
          <p className="text-off-white">
            For years, Olive Vine Academy has been known for nurturing <br />{" "}
            young minds with excellence, discipline, and purpose.
            <br />
            As we continue to grow, we are embracing a new identity <br /> that
            reflects our vision for the future — Zoe Seeds Basic Schools.
          </p>
        </div>
        <div className="bg-off-white w-1/2 h-full flex items-center text-left justify-start pl-10 shadow-2xl">
          There
        </div>
      </div>
    </section>
  );
};

export default AboutSection;