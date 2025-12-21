import React from "react";
import logoImg from "@assets/images/logo.svg";
import Image from "next/image";

const Footer = () => {
  const currentYear: number = new Date().getFullYear();
  const email: string = "fimobu@gmail.com";

  return (
    <footer className=" bottom-0 w-full mx-auto">
      <div className="bg-greyGreen px-25 py-12 mx-auto flex justify-between">
        <div className="flex gap-x-15">
          <div>
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-x-5">
              <Image src={logoImg} alt="School Logo" width="45" height="45" />
              <span className="text-off-white">Your Company</span>
            </a>

            <div>
              <p>&copy; {currentYear} Olive Vine Academy</p>
              <h6>All rights reserved.</h6>
              {/*Add other footer content like links, social media icons, etc. */}
            </div>
          </div>
          <div className="flex flex-col">
            <span>
              16, Gabriel Onifade, Off Oyero Rd., Ogba-Iyo, Ijoko, Ogun State
            </span>
            <span>+2348037278872</span>
            <span>{email}</span>
            <i className="fa-solid fa-graduation-cap text-3xl text-blue-600"></i>
          </div>
        </div>
        <div>
          {/*    <a href="#" class="text-sm/6 font-semibold text-gray-900" [routerLink]="['/home']" >Home</a>*/}
          {/*  <a href="#" class="text-sm/6 font-semibold text-gray-900" [routerLink]="['/about-us']">About Us</a>*/}
          {/*<a href="#" class="text-sm/6 font-semibold text-gray-900">Admission</a>*/}
          {/*<a href="#" class="text-sm/6 font-semibold text-gray-900">E-Portal</a>*/}
          {/*<a href="#" class="text-sm/6 font-semibold text-gray-900">Contact Us</a>*/}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
