import React from "react";
import { sideNavLinks } from "../constant/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";

const Sidenav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="w-72 bg-greyGreen py-5 flex flex-col rounded-r-lg shadow-md transition-all fixed duration-300 h-full ">
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
      <h3 onClick={() => handleLogout()}>Logout</h3>
    </div>
  );
};

export default Sidenav;
