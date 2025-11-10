import React from "react";
import { sideNavLinks } from "../constant/data";
import Link from "next/link";
import loginImage from "@assets/images/loginImg.png";
import { usePathname } from "next/navigation";

const Sidenav = () => {
  const pathname = usePathname();

  return (
    <div className="bg-greyGreen w-72 py-5 flex flex-col rounded-r-lg shadow-md transition-all duration-300">
      <h2 className="p-3 font-manrope font-bold text-2xl">Admin View</h2>
      <aside>
        <nav>
          {sideNavLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={index}
                href={link.href}
                className={`flex items-center h-1/6 p-2.5 pl-8 gap-2 font-mono ${isActive ? "bg-yellow-900 text-amber-50 w-4/5 rounded-r-lg" : "hover:text-grey500"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default Sidenav;
