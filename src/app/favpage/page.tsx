"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { PlacesIcon } from "../icons/PlacesIcon";
import { RateIcon } from "../icons/RateIcon";
import { CashIcon } from "../icons/CashIcon";
import { ClockIcon } from "../icons/ClockIcon";
import { TrashIcon } from "../icons/TrashIcon";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { TPlaceData } from "../types/place";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import Image from "next/image";
import { Button } from "../components/Button";

const FavPage = () => {
  const [theme, setTheme] = useState("light");
  const { storedValue: favorites, removeFromLocalStorage } =
    useLocalStorage<TPlaceData>("favorites");
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    const storedTheme = localStorage.getItem("user-theme") ?? "light";
    setTheme(storedTheme);
  }, []);

  const removeFavorite = (placeId: number) => {
    if (!favorites) return;
    const placeToRemove = Array.isArray(favorites)
      ? favorites.find((place) => place.placeId === placeId)
      : favorites.placeId === placeId
        ? favorites
        : null;

    if (placeToRemove) {
      removeFromLocalStorage(placeToRemove);
    }
  };

  const handleGoToPlace = (place: TPlaceData) => {
    router.push(`/map?lat=${place.placeLocation.lat}&lng=${place.placeLocation.lng}`);
  };

  const getPaymentTypeText = (paymentType: string | string[] | undefined) => {
    if (!paymentType) return t("card");
    if (Array.isArray(paymentType)) {
      return paymentType[0] === "მხოლოდ ქეში" ? t("cashOnly") : t("card");
    }
    return paymentType === "მხოლოდ ქეში" ? t("cashOnly") : t("card");
  };

  const favoritesList = Array.isArray(favorites) ? favorites : favorites ? [favorites] : [];

  return (
    <I18nextProvider i18n={i18n}>
      <div
        className={`${theme === "dark" ? "dark" : "light"} min-h-screen bg-[#F3F6FF] dark:bg-[#1F2124]`}
      >
        <div className="mx-[16px] flex flex-col gap-3">
          <h1 className="pt-[68px] text-[20px] dark:text-[#FFFFFF] font-bold h-[39px] leading-[135%] tracking-[0%] text-center align-middle text-[#15593A]">
            {t("favorites")}
          </h1>

          <div className="w-[91%] border-[1px] bg-[#15593A80] mt-[16px] ml-[16px]"></div>

          {favoritesList.length === 0 ? (
            <div className="flex flex-col items-center mt-10">
              <div className="w-[237px] h-[227px]">
                <Image
                  src="/favBg.png"
                  alt="favorites background icon"
                  width={237}
                  height={226}
                  priority
                />
              </div>

              <h2 className="text-[20px] font-medium text-[#15593A] dark:text-[#FFFFFF] mt-6 font-['FiraGO']">
                {t("favoritesEmpty")}
              </h2>

              <p className="text-[14px] text-[#15593A] dark:text-[#FFFFFF] text-center mt-2 font-['FiraGO']">
                {t("noSavedLocations")}
                <br />
                {t("addPreferredLocation")}
              </p>

              <button
                onClick={() => router.push("/map")}
                className="w-[311px] h-[32px] bg-[#218658] text-white text-[12px] py-2 rounded-[6px] mt-8 font-['FiraGO']"
              >
                {t("goToMap")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {favoritesList.map((place) => (
                <div
                  key={place.placeId}
                  className="relative w-[343px] h-[222px] rounded-[12px] border-[1px] p-[16px] bg-[#F3F6FF] dark:bg-[#1F2124] "
                >
                  <button
                    onClick={() => removeFavorite(place.placeId)}
                    className="absolute top-2 right-2 px-2 py-1 rounded text-[#15593A] dark:text-white"
                  >
                    <TrashIcon />
                  </button>

                  <ul className="flex flex-col w-full items-start gap-1 text-[14px] dark:text-white">
                    <li className="flex items-center gap-2 justify-center">
                      <PlacesIcon /> {`${place.freeSpace}/${place.totalSpace} ${t("place")}`}
                    </li>
                    <li className="flex items-center gap-2 justify-center">
                      <RateIcon /> {`${place.rate}/1 ${t("hour")}`}
                    </li>
                    <li className="flex items-center gap-2 justify-center">
                      <CashIcon /> {getPaymentTypeText(place.paymentType)}
                    </li>
                    <li className="flex items-center gap-2 justify-center">
                      <ClockIcon /> {`${place.opens} - ${place.closes}`}
                    </li>
                  </ul>
                  <Button
                    label={t("goToPlace")}
                    className={
                      "w-[100%] h-[48px] bg-[#218658] text-white text-[16px] rounded-[6px] mt-2"
                    }
                    onClick={() => handleGoToPlace(place)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <NavBar />
      </div>
    </I18nextProvider>
  );
};

export default FavPage;
