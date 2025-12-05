import React from "react";
import { sideNavLinks } from "../constant/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@store/authStore";
import { LogOut, ShieldUser } from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidenav = ({ isOpen, setIsOpen }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
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
