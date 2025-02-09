"use client";
import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import ParkingMap from "../components/ParkingMap";
import { MapSearch } from "../components/MapSearch";
import NavBar from "../components/NavBar";

function MapPage() {
  const handleSearch = (queryString: string) => {
    console.log("we got the VALID string in Map Page", queryString);
  };
  return (
    <I18nextProvider i18n={i18n}>
      <MapSearch handleQueryString={handleSearch} />
      <ParkingMap />
      <NavBar />
    </I18nextProvider>
  );
}

export default MapPage;
