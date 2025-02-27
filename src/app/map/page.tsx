"use client";
import React, { useEffect, useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { ParkingMap } from "../components/ParkingMap";
import { MapSearch } from "../components/MapSearch";
import NavBar from "../components/NavBar";
import RecentlySearched from "../components/RecentlySearched";
import { TPlaceLocation, IQueryResult } from "../types/place";
import useLocalStorage from "../hooks/useLocalStorage";
import { center } from "../constants/places";

function MapPage() {
  const [theme, setTheme] = useState("light");
  const [mapCenter, setMapCenter] = useState<TPlaceLocation>(center);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { storedValue, setLocalStorage } = useLocalStorage<IQueryResult[]>("last-search-result");
  const [searchResult, setSearchResult] = useState<IQueryResult[]>(
    () => (storedValue as IQueryResult[]) ?? [],
  );
  const handleSearch = (searchQuery: string) => {
    if (searchQuery && window.google) {
      // Create a dummy div to pass to PlacesService
      const dummyDiv = document.createElement("div");
      const service = new window.google.maps.places.PlacesService(dummyDiv);

      // Build your search request. You can include location bias if needed.
      const request = {
        query: searchQuery,
      };

      service.textSearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results &&
          results.length > 0
        ) {
          const foundPlaces = results.map((result) => {
            const shortAddress = result.name ?? "";
            const longAddress = result.name ?? "";
            const placeLocation = {
              lat: result.geometry?.location?.lat() ?? 0,
              lng: result.geometry?.location?.lng() ?? 0,
            };
            return { shortAddress, longAddress, placeLocation, distance: "--" };
          });
          setSearchResult(foundPlaces);
          setLocalStorage(foundPlaces);
          // Process the array of results (e.g., display them in a list)
        } else {
          alert("საპარკინგე ადგილი ვერ მოიძებნა");
        }
      });
    }
  };
  const handlePlaceSelect = (place: TPlaceLocation) => {
    setMapCenter(place);
    setIsModalOpen(false);
  };
  useEffect(() => {
    const storedTheme = localStorage.getItem("user-theme") ?? "light";
    setTheme(storedTheme);
  }, []);
  const memoizedSearchResult = useMemo(() => searchResult, [searchResult]);
  return (
    <I18nextProvider i18n={i18n}>
      <div className={`${theme === "dark" ? "dark" : "light"} relative`}>
        <MapSearch
          handleQueryString={handleSearch}
          handleFocus={() => setIsModalOpen(true)}
          handleCloseModal={() => setIsModalOpen(false)}
          isSearchActive={isModalOpen}
        />
        <ParkingMap center={mapCenter} handleCloseModal={() => setIsModalOpen(false)} />
        <NavBar />
        {isModalOpen && (
          <RecentlySearched
            placeList={memoizedSearchResult}
            handlePlaceSelect={handlePlaceSelect}
          />
        )}
      </div>
    </I18nextProvider>
  );
}

export default MapPage;
