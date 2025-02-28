"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // next/router yerine next/navigation kullanıyoruz
import { LocationIcon } from "../icons/LocationIcon";
import { FavIcon } from "../icons/FavIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { useTranslation } from "react-i18next";

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const isActive = (path: string) => pathname === path;

  const activeColor = "text-[#15593A] dark:text-[#43F4A3]";
  const inactiveColor = "text-[#7E706D] dark:text-[#FFFFFF]";

  return (
    <nav className="fixed bottom-0 w-full bg-[#F3F6FF] dark:bg-[#1F2124]  shadow-[0_0_5px_0_rgba(0,0,0,0.35)] h-[8.5dvh] z-20 flex items-center justify-center">
      <div className="flex flex-1 justify-around items-center">
        <Link scroll={false} href="/" passHref>
          <div className="flex flex-col items-center">
            <HomeIcon className={`${isActive("/") ? activeColor : inactiveColor} w-5 h-5`} />
            <span className={`text-xs mt-1 ${isActive("/") ? activeColor : inactiveColor}`}>
              {t("main")}
            </span>
          </div>
        </Link>
        <Link scroll={false} href="/map" passHref>
          <div className="flex flex-col items-center">
            <LocationIcon className={`${isActive("/map") ? activeColor : inactiveColor} w-5 h-5`} />
            <span className={`text-xs mt-1 ${isActive("/map") ? activeColor : inactiveColor}`}>
              {t("map")}
            </span>
          </div>
        </Link>
        <Link scroll={false} href="/favpage" passHref>
          <div className="flex flex-col items-center">
            <FavIcon className={`${isActive("/favpage") ? activeColor : inactiveColor} w-5 h-5`} />
            <span className={`text-xs mt-1 ${isActive("/favpage") ? activeColor : inactiveColor}`}>
              {t("favorites")}
            </span>
          </div>
        </Link>
        <Link scroll={false} href="/settingspage" passHref>
          <div className="flex flex-col items-center">
            <SettingsIcon
              className={`${isActive("/settingspage") ? activeColor : inactiveColor} w-5 h-5`}
            />
            <span
              className={`text-xs mt-1 ${isActive("/settingspage") ? activeColor : inactiveColor}`}
            >
              {t("settings")}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
