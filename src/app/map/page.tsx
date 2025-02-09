"use client";
import React, { useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import ParkingMap from "../components/ParkingMap";
import { MapSearch } from "../components/MapSearch";
import NavBar from "../components/NavBar";
import RecentlySearched from "../components/RecentlySearched";
import { TQueryResult } from "../types/place";

function MapPage() {
  const [searchResult, setSearchResult] = useState<TQueryResult[] | null>(null);
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
            return { shortAddress, longAddress, placeLocation };
          });
          console.log(foundPlaces);
          setSearchResult(foundPlaces);
          // Process the array of results (e.g., display them in a list)
        } else {
          alert("საპარკინგე ადგილი ვერ მოიძებნა");
        }
      });
    }
  };
  return (
    <I18nextProvider i18n={i18n}>
      <MapSearch handleQueryString={handleSearch} />
      <ParkingMap />
      <NavBar />
      {searchResult && <RecentlySearched placeList={searchResult} />}
    </I18nextProvider>
  );
}

export default MapPage;
