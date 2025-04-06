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
import { useFavorites } from "../context/FavoritesContext";

const FavPage = () => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const { storedValue: favorites, removeFromLocalStorage } =
    useLocalStorage<TPlaceData>("favorites");
  const { updateFavoritesCount } = useFavorites();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("user-theme") ?? "light";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const favoritesList = Array.isArray(favorites) ? favorites : favorites ? [favorites] : [];
    updateFavoritesCount(favoritesList.length);
  }, [favorites, updateFavoritesCount, mounted]);

  if (!mounted) {
    return null;
  }

  const removeFavorite = (placeId: number) => {
    if (!favorites) return;
    const placeToRemove = Array.isArray(favorites)
      ? favorites.find((place) => place.placeId === placeId)
      : favorites.placeId === placeId
        ? favorites
        : null;

    if (placeToRemove) {
      removeFromLocalStorage(placeToRemove);
      const favoritesList = Array.isArray(favorites) ? favorites : favorites ? [favorites] : [];
      updateFavoritesCount(favoritesList.length - 1);
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
        className={`${theme === "dark" ? "dark" : "light"} min-h-screen bg-bg-primary dark:bg-bg-dark flex flex-col`}
      >
        <div className="mx-[16px] flex flex-col gap-3 fixed top-0 right-0 left-0 z-10 bg-bg-primary dark:bg-bg-dark">
          <h1 className="pt-[68px] text-[20px] dark:text-dark-text font-bold h-[39px] leading-[135%] tracking-[0%] text-center align-middle text-green-dark">
            {t("favorites")}
          </h1>
          <div className="w-[91%] border-[1px] bg-[#15593A80] mt-[16px] ml-[16px]"></div>
        </div>

        <div className="flex-1 overflow-y-auto pt-[90px] ">
          <div className="pt-6 flex flex-col items-center">
            {favoritesList.length === 0 ? (
              <div className="h-[50vh] flex flex-col items-center mt-10">
                <Image
                  src="/favBg.png"
                  alt="favorites background icon"
                  width={237}
                  height={226}
                  priority
                />
                <h2 className="text-[16px] font-bold text-green-dark dark:text-dark-text mt-6">
                  {t("favoritesEmpty")}
                </h2>
                <p className="text-[14px] font-medium text-green-dark dark:text-dark-text text-center mt-2">
                  {t("noSavedLocations")} <br /> {t("addPreferredLocation")}
                </p>
                <button
                  onClick={() => router.push("/map")}
                  className="w-[91%] h-[48px] bg-green-light text-white text-[16px] font-bold py-3 rounded-[6px] mt-[28px]"
                >
                  {t("goToMap")}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {favoritesList.map((place) => (
                  <div
                    key={place.placeId}
                    className="w-[343px] h-[222px] rounded-[12px] border-[1px] p-[16px] bg-bg-primary shadow-md dark:bg-bg-dark mb-6 last:mb-[85px]"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[20px] text-green-dark dark:text-white">
                        {place.address}
                      </span>
                      <button
                        onClick={() => removeFavorite(place.placeId)}
                        className="rounded text-green-dark dark:text-white"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                    <ul className="flex flex-col items-start gap-1 text-[14px] dark:text-white">
                      <li className="flex items-center gap-2">
                        <PlacesIcon /> {`${place.freeSpace}/${place.totalSpace} ${t("place")}`}
                      </li>
                      <li className="flex items-center gap-2">
                        <RateIcon /> {`${place.rate}/1 ${t("hour")}`}
                      </li>
                      <li className="flex items-center gap-2">
                        <CashIcon /> {getPaymentTypeText(place.paymentType)}
                      </li>
                      <li className="flex items-center gap-2">
                        <ClockIcon /> {`${place.opens} - ${place.closes}`}
                      </li>
                    </ul>
                    <Button
                      label={t("goToPlace")}
                      className="w-full h-[32px] bg-green-light text-white text-[16px] rounded-[6px] mt-2"
                      onClick={() => handleGoToPlace(place)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation (Fixed) */}
        <NavBar />
      </div>
    </I18nextProvider>
  );
};

export default FavPage;
