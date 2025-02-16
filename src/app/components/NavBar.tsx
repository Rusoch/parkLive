"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // next/router yerine next/navigation kullanıyoruz
import { LocationIcon } from "../icons/LocationIcon";
import { FavIcon } from "../icons/FavIcon";
import { SettingsIcon } from "../icons/SettingsIcon";

const NavBar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const activeColor = "text-[#15593A] dark:text-[#1A6E48]";
  const inactiveColor = "text-[#7E706D] dark:text-[#EAEAEA]";

  return (
    <nav className="fixed bottom-0 w-full bg-[#E8ECF3] shadow-[0_0_5px_0_rgba(0,0,0,0.35)] py-2 h-[8.5dvh] z-20">
      <div className="flex justify-around items-center">
        <Link scroll={false} href="" passHref>
          <div className="flex flex-col items-center">
            <LocationIcon color={isActive("/") ? activeColor : inactiveColor} />
            <span className={`text-xs mt-1 ${isActive("/") ? activeColor : inactiveColor}`}>
              მთავარი
            </span>
          </div>
        </Link>
        <Link scroll={false} href="/map" passHref>
          <div className="flex flex-col items-center">
            <LocationIcon color={isActive("/map") ? activeColor : inactiveColor} />
            <span className={`text-xs mt-1 ${isActive("/map") ? activeColor : inactiveColor}`}>
              რუკა
            </span>
          </div>
        </Link>
        <Link scroll={false} href="/favpage" passHref>
          <div className="flex flex-col items-center">
            <FavIcon color={isActive("/favpage") ? activeColor : inactiveColor} />
            <span className={`text-xs mt-1 ${isActive("/favpage") ? activeColor : inactiveColor}`}>
              შენახულები
            </span>
          </div>
        </Link>
        <Link scroll={false} href="/settingspage" passHref>
          <div className="flex flex-col items-center">
            <SettingsIcon color={isActive("/settingspage") ? activeColor : inactiveColor} />
            <span
              className={`text-xs mt-1 ${isActive("/settingspage") ? activeColor : inactiveColor}`}
            >
              პარამეტრები
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
