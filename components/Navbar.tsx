"use client";
import React from "react";
import { navLinks } from "../constant/data";
import Link from "next/link";
// import { useParams } from "next/navigation";
import Image from "next/image";
import logo from "@assets/images/sampleLogo.png";

const Navbar = () => {
  // const { page } = useParams<{ page: string }>();
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent rounded-0">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-x-5">
              <Image src={logo} alt="audiophile logo" height={45} width={45} />
              <span className="">Zoe Seed Schools</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navLinks.map((link, index) => {
              // const isActive = page === link.label.toLowerCase();

              return (
                <Link
                  key={index}
                  href={link.href}
                  // className={`transition-colors ${isActive ? 'text-primary font-semibold' : 'hover:text-primary-hover text-white'}`}
                  className={`transition-colors 'hover:text-primary-hover text-white'}`}
                >
                  {link.label.toUpperCase()}
                </Link>
              );
            })}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
