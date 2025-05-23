"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocationIcon } from "../icons/LocationIcon";
import { FavIcon } from "../icons/FavIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { useTranslation } from "react-i18next";
import { useFavorites } from "../context/FavoritesContext";
import { MoreMenu } from "./MoreMenu";
import { MenuIcon } from "../icons/MenuIcon";

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { favoritesCount } = useFavorites();
  const [showMenu, setShowMenu] = useState(false);

  const isActive = (path: string) => pathname === path;

  const activeColor = "text-green-dark dark:text-[#43F4A3]";
  const inactiveColor = "text-text-gray dark:text-dark-text";

  const hasFavorites = favoritesCount > 0;

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-bg-primary dark:bg-bg-dark shadow-[0_0_5px_0_rgba(0,0,0,0.35)] h-[8.5dvh] z-20 flex items-center justify-center">
        <div className="flex justify-between w-full px-5">
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
              <LocationIcon
                className={`${isActive("/map") ? activeColor : inactiveColor} w-5 h-5`}
              />
              <span className={`text-xs mt-1 ${isActive("/map") ? activeColor : inactiveColor}`}>
                {t("map")}
              </span>
            </div>
          </Link>
          <Link scroll={false} href="/favpage" passHref>
            <div className="flex flex-col items-center">
              <div className="relative">
                <FavIcon
                  className={`${isActive("/favpage") ? activeColor : inactiveColor} w-5 h-5`}
                />
                {hasFavorites && (
                  <div className="absolute top-0 right-0 w-2 h-2 border border-border-success bg-green-dark rounded-full" />
                )}
              </div>
              <span
                className={`text-xs mt-1 ${isActive("/favpage") ? activeColor : inactiveColor}`}
              >
                {t("favorites")}
              </span>
            </div>
          </Link>
          <button
            onClick={() => setShowMenu(true)}
            className="flex flex-col items-center focus:outline-none"
          >
            <MenuIcon
              className={`${showMenu ? activeColor : inactiveColor} w-5 h-5 flex justify-center items-center`}
            />
            <span className={`text-xs mt-1 ${showMenu ? activeColor : inactiveColor}`}>
              {t("more")}
            </span>
          </button>
        </div>
      </nav>

      <MoreMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
};

export default NavBar;
