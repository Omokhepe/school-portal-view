"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { reviews } from "../constant/data";

export default function ReviewCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 7000, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative w-full  mx-auto md:max-w-md max-w-sm ">
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex ">
          {reviews.map((item, index) => (
            <div key={index} className="min-w-full px-4 ">
              <div className="bg-white rounded-xl shadow-md p-8 text-center min-h-55">
                <p className="text-gray-700 text-base mb-6">“{item.quote}”</p>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev button */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2
                   bg-white shadow-md rounded-full p-2
                   hover:bg-gray-100 transition"
        aria-label="Previous testimonial"
      >
        ‹
      </button>

      {/* Next button */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2
                   bg-white shadow-md rounded-full p-2
                   hover:bg-gray-100 transition"
        aria-label="Next testimonial"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 w-2 rounded-full
              ${i === selectedIndex ? "bg-yellow-900" : "bg-gray-300"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
