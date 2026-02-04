"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import lightLogo from "@assets/images/lightLogo.png";
import darkLogo from "@assets/images/darkLogo.png";
import lightLogoName from "@assets/images/lightLogoName.png";
import darkLogoName from "@assets/images/darkLogoName.png";
import { navLinks } from "../constant/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,1)"],
  );

  const height = useTransform(scrollY, [0, 80], ["90px", "90px"]);
  const shadow = useTransform(
    scrollY,
    [0, 80],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.08)"],
  );

  return (
    <motion.nav
      style={{ backgroundColor: bg, height, boxShadow: shadow }}
      className="fixed inset-x-0 top-0 z-50 bg-transparent rounded-0 py-6 md:pb-25"
    >
      <div className="px-4 sm:py-4 sm:px-6 lg:px-25">
        <div className="flex justify-between items-center h-16">
          {/* Logo + nav items */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-x-5">
              <Image
                src={scrolled ? darkLogo : lightLogo}
                alt="school logo"
                height={70}
                width={70}
              />
              <Image
                src={scrolled ? darkLogoName : lightLogoName}
                alt="school name logo"
                height={70}
                width={150}
              />
            </Link>
          </div>
          <div className="hidden md:flex lg:gap-x-12">
            {navLinks.map((link, index) => {
              // const isActive = page === link.label.toLowerCase();

              return (
                <div key={index} className="flex items-center gap-x-2">
                  <Link
                    key={index}
                    href={link.href}
                    className={`transition-colors ${scrolled ? "text-greyGreen" : "text-amber-50"} text-sm font-semibold hover:text-yellow-900 text-white}`}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </div>
              );
            })}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className={`${scrolled ? "bg-greyGreen" : "bg-amber-50"} w-6 h-0.5  mb-1.5 transition-all origin-center`}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`${scrolled ? "bg-greyGreen" : "bg-amber-50"} w-6 h-0.5 bg-amber-50 mb-1.5`}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`${scrolled ? "bg-greyGreen" : "bg-amber-50"} w-6 h-0.5 bg-amber-50 transition-all origin-center`}
            />
          </button>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
          {/*</div>*/}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md transition-all duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
