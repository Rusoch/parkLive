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

    const activeColor = "#15593A";
    const inactiveColor = "#2E18149E";

    return (
        <nav className="fixed bottom-0 w-full bg-white bg-opacity-25 shadow-lg py-2">
            <div className="flex justify-around items-center">
                <Link href="/mappage" passHref>
                    <div
                        className={
                            isActive("/mappage")
                                ? "active nav-item flex flex-col items-center"
                                : "nav-item flex flex-col items-center"
                        }
                    >
                        <LocationIcon color={isActive("/mappage") ? activeColor : inactiveColor} />
                        <span
                            className="text-xs mt-1"
                            style={{ color: isActive("/mappage") ? activeColor : inactiveColor }}
                        >
                            რუკა
                        </span>
                    </div>
                </Link>
                <Link href="/favpage" passHref>
                    <div
                        className={
                            isActive("/favpage")
                                ? "active nav-item flex flex-col items-center"
                                : "nav-item flex flex-col items-center"
                        }
                    >
                        <FavIcon color={isActive("/favpage") ? activeColor : inactiveColor} />
                        <span
                            className="text-xs mt-1"
                            style={{ color: isActive("/favpage") ? activeColor : inactiveColor }}
                        >
                            შენახულები
                        </span>
                    </div>
                </Link>
                <Link href="/settingspage" passHref>
                    <div
                        className={
                            isActive("/settingspage")
                                ? "active nav-item flex flex-col items-center"
                                : "nav-item flex flex-col items-center"
                        }
                    >
                        <SettingsIcon
                            color={isActive("/settingspage") ? activeColor : inactiveColor}
                        />
                        <span
                            className="text-xs mt-1"
                            style={{
                                color: isActive("/settingspage") ? activeColor : inactiveColor,
                            }}
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
