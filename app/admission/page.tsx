import React from "react";
import Navbar from "@components/Navbar";

const Page = () => {
  return (
    <div>
      <Navbar />
      <section
        className={`
          relative h-[25vh] bg-fixed bg-center bg-cover w-full
        `}
      >
        <div className="h-full flex items-center justify-center bg-greyGreen">
          <div className="max-w-screen-xl px-20 mt-10">
            <h1 className="text-5xl font-extrabold text-off-white">
              Enroll With Us
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
