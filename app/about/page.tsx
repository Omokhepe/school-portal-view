import React from "react";
import Navbar from "@components/Navbar";
import VisionSection from "../../sections/visionSection";
import Footer from "@components/footer";

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
            <h1 className="text-3xl md:text-5xl font-extrabold text-off-white">
              Who We Are
            </h1>
          </div>
        </div>
      </section>
      <VisionSection />
      <Footer />
    </div>
  );
};

export default Page;
