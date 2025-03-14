"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { PlacesIcon } from "../icons/PlacesIcon";
import { RateIcon } from "../icons/RateIcon";
import { CashIcon } from "../icons/CashIcon";
import { ClockIcon } from "../icons/ClockIcon";
import { TrashIcon } from "../icons/TrashIcon"; // Burada TrashIcon'u içeri aktarıyoruz

import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const FavPage = () => {
  const [theme, setTheme] = useState("light");
  const { storedValue: favorites, removeFromLocalStorage } = useLocalStorage<any>("favorites");
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem("user-theme") ?? "light";
    setTheme(storedTheme);
  }, []);

  const removeFavorite = (address: string) => {
    const placeToRemove = favorites?.find((place: any) => place.address === address);
    if (placeToRemove) {
      removeFromLocalStorage(placeToRemove);
    }
  };

  return (
    <div
      className={`${theme === "dark" ? "dark" : "light"} relative min-h-screen flex flex-col items-center p-5`}
    >
      <NavBar />

      {/* Üst Başlık */}
      <h1 className="text-[20px] dark:text-[#FFFFFF] font-bold mt-5 h-[39px] leading-[135%] tracking-[0%] text-center align-middle text-[#15593A]">
        Saved
      </h1>
      <div className="w-[343px] border-[1px]  bg-[#15593A80] top-[68px] left-[16px] gap-[12px] "></div>

      {/* Ortadaki Yazılar (Yalnızca Favori Mekan Yoksa Gösterilecek) */}
      {favorites && favorites.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-10">
          <p className="font-bold text-[20px] w-[278px] dark:text-[#FFFFFF] text-[#15593A] text-center">
            Your favorite places
          </p>
          <p className="text-[12px] w-[343px] text-[#15593A] dark:text-[#FFFFFF] text-center">
            Find them here anytime
          </p>
        </div>
      )}

      {/* Favori Mekan Listesi */}
      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 mx-auto">
          {favorites.map((place: any) => (
            <div
              key={place.address}
              className="relative w-[343px] h-[222px] rounded-[12px] border-[1px] p-[16px] gap-[20px] bg-[#F3F6FF]"
            >
              {/* Silme Butonu - TrashIcon ile değiştirildi */}
              <button
                onClick={() => removeFavorite(place.address)}
                className="absolute top-2 right-2 px-2 py-1 rounded text-[#15593A]"
              >
                <TrashIcon /> {/* TrashIcon'u buraya yerleştirdik */}
              </button>

              {/* Mekan Bilgileri */}
              <ul className="flex flex-col w-full items-start gap-1 text-[14px] mb-5">
                <li className="flex items-center gap-2 justify-center">
                  <PlacesIcon /> {`${place.freeSpace}/${place.totalSpace} places`}
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <RateIcon /> {`${place.rate}/1 hour`}
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CashIcon /> {place.paymentType}
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <ClockIcon /> {`${place.opens} - ${place.closes}`}
                </li>
              </ul>

              {/* Git Butonu */}
              <button className="w-[311px] h-[32px] bg-[#218658] text-white text-[12px] py-2 rounded-[6px] mt-2">
                Go to Place
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {/* Go to Map Butonu (Favori Mekan Yoksa Görünsün) */}
      {favorites && favorites.length === 0 && (
        <button
          onClick={() => router.push("/map")}
          className="w-[343px] h-[48px] rounded-[6px] gap-[10px] absolute top-[530px] left-[16px] bg-[#218658] text-white text-[16px] flex items-center justify-center"
        >
          Go to Map
        </button>
      )}
    </div>
  );
};

export default FavPage;
