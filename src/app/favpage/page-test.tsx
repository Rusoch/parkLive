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
        className={`${theme === "dark" ? "dark" : "light"} relative min-h-screen flex flex-col items-center p-5`}
      >
        <NavBar />

        <h1 className="mt-17 text-[20px] dark:text-[#FFFFFF] font-bold h-[39px] leading-[135%] tracking-[0%] text-center align-middle text-[#15593A]">
          {t("favorites")}
        </h1>
        <div className="w-[343px] border-[1px] bg-[#15593A80] top-[68px] left-[16px] gap-[12px]"></div>

        {favoritesList.length === 0 && (
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="font-bold text-[20px] w-[278px] dark:text-[#FFFFFF] text-[#15593A] text-center">
              {t("yourFavoritePlaces")}
            </p>
            <p className="text-[12px] w-[343px] text-[#15593A] dark:text-[#FFFFFF] text-center">
              {t("findThemHereAnytime")}
            </p>
          </div>
        )}

        {favoritesList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 mx-auto">
            {favoritesList.map((place) => (
              <div
                key={place.placeId}
                className="relative w-[343px] h-[222px] rounded-[12px] border-[1px] p-[16px] gap-[20px] bg-[#F3F6FF] dark:bg-[#1F2124]"
              >
                <button
                  onClick={() => removeFavorite(place.placeId)}
                  className="absolute top-2 right-2 px-2 py-1 rounded text-[#15593A]"
                >
                  <TrashIcon />
                </button>

                <ul className="flex flex-col w-full items-start gap-1 text-[14px] mb-5">
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

                <button
                  onClick={() => handleGoToPlace(place)}
                  className="w-[311px] h-[32px] bg-[#218658] text-white text-[12px] py-2 rounded-[6px] mt-2"
                >
                  {t("goToPlace")}
                </button>
              </div>
            ))}
          </div>
        )}

        {favoritesList.length === 0 && (
          <button
            onClick={() => router.push("/map")}
            className="w-[343px] h-[48px] rounded-[6px] gap-[10px] absolute top-[530px] left-[16px] bg-[#218658] text-white text-[16px] flex items-center justify-center"
          >
            {t("goToMap")}
          </button>
        )}
      </div>
    </I18nextProvider>
  );
};

export default FavPage;
