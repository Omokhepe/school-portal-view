"use client";
import React, { useEffect, useState } from "react";
import logo from "@assets/images/ovaLogo.png";
import Image from "next/image";

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          document.body.style.overflow = "auto";
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (progress >= 100) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
      <Image src={logo} alt="audiophile logo" height={70} width={150} />

      {/* Percentage */}
      <p className="py-5">Excellence Through Knowledge</p>
      {/*<p className="text-sm font-medium text-gray-700 mb-2">{progress}%</p>*/}

      {/* Progress Bar */}
      <div className="w-48 h-[7px] bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-yellow-900 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
