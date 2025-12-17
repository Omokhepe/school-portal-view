"use client";

import React, { useState } from "react";
import { groupedLevel, sideNavLinks } from "../constant/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";
import { ChevronDown, ChevronUp, LogOut, ShieldUser } from "lucide-react";
// import { groupClassesByLevel } from "@lib/helper";
import useAppStore from "@store/appStore";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidenav = ({ isOpen, setIsOpen }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const [isLectureOpen, setIsLectureOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  // const [subMenuName, setSubMenuName] = useState("");

  const handleClick = (level: string) => {
    router.push(`/admin-dashboard/lecture-note/${level}`);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const subMenu = (link: any, isActive: boolean, index: number) => {
    const toggleSubmenu = (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent triggering navigation
      setIsLectureOpen((v) => !v);
      setShowSubMenu(!showSubMenu);
    };
    // const isActiveSub =
    //   pathname === `/admin-dashboard/lecture-note/${subMenuName}`;

    return (
      <div key={index}>
        {/* Main Lecture Note Row */}
        <div
          className={`flex items-center cursor-pointer p-2.5 pl-8 gap-4 font-mono ${
            isActive
              ? "bg-yellow-900 text-amber-50 w-4/5 rounded-r-lg"
              : "hover:text-grey500"
          }`}
        >
          {/* Clicking text navigates */}
          <Link href={link.href} className="flex items-center gap-2">
            {link.icon}
            {isOpen && link.label}
          </Link>

          {/* Clicking arrow toggles submenu */}
          {isOpen && (
            <button onClick={toggleSubmenu}>
              {isLectureOpen ? <ChevronDown /> : <ChevronUp />}
            </button>
          )}
        </div>

        {/* Submenu container */}
        {showSubMenu && (
          <div
            className="ml-12 slide"
            // style={{ height: isLectureOpen && showSubMenu ? "auto" : "0px" }}
          >
            <div className="mt-2 space-y-3">
              {groupedLevel.map((level, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleClick(level.value);
                  }}
                  // className={`flex items-center cursor-pointer p-2.5 pl-8 gap-4 font-mono ${
                  //   isActiveSub
                  //     ? "bg-yellow-900 text-amber-50 w-4/5 rounded-r-lg"
                  //     : "hover:text-grey500"
                  // }`}
                >
                  <p className="text-xs font-semibold text-gray-200 text-manrope capitalize py-1 pl-8 cursor-pointer">
                    {level.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${isOpen ? "w-72" : "w-20"} bg-greyGreen py-5 flex flex-col rounded-r-lg shadow-md transition-all fixed duration-300 h-full `}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center ${isOpen ? "pl-8 pt-3" : "pl-1"}`}
      >
        <ShieldUser className={`${!isOpen && "my-8 ml-6 justify-center"}`} />
        {isOpen && (
          <h2 className="p-3 font-manrope font-bold text-2xl ">Admin View</h2>
        )}
      </div>

      <aside>
        <nav>
          {sideNavLinks.map((link, index) => {
            const isActive = pathname === link.href;
            if (link.isLectureNote) return subMenu(link, isActive, index);
            return (
              <Link
                key={index}
                href={link.href}
                className={`flex items-center h-1/6 p-2.5 pl-8 gap-2 font-mono ${isActive ? "bg-yellow-900 text-amber-50 w-4/5 rounded-r-lg" : "hover:text-grey500"}`}
              >
                {link.icon}
                {isOpen && link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div
        className="absolute bottom-0 flex p-7 mb-15 text-off-white"
        onClick={() => handleLogout()}
      >
        <LogOut />
        {isOpen && <h3>Logout</h3>}
      </div>
    </div>
  );
};

export default Sidenav;
