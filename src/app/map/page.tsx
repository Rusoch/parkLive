'use client'
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import RecentlySearched from "../components/RecentlySearched";

const center = {
  lat: 41.7151,
  lng: 44.8271,
};

const mapOptions = {
  mapTypeControl: false,
  zoomControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBslCn_7XxhEmDuE-FyGgLuvfUxH3_mBes',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const [showDiv, setShowDiv] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [changeDiv, setChangeDiv] = useState("justify-center");
  const [bgColor, setBgColor] = useState("transparent");

  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null); 
  const [destinationLocation, setDestinationLocation] = useState<google.maps.LatLng | null>(null); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          alert('Error getting current location.');
        }
      );
    }
  }, []);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const newCenter = results[0].geometry.location;
          setDestinationLocation(newCenter);
          map?.setCenter(newCenter);
          map?.setZoom(14); 
        } else {
          alert('საპარკინგე ადგილი ვერ მოიძებნა');
        }
      });
    }
  };

  const handleDirections = () => {
    if (currentLocation && destinationLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: currentLocation,
          destination: destinationLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(result);
          } else {
            alert('მიმართულებები ვერ მოიძებნა');
          }
        }
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowArrow(true);
      setChangeDiv("justify-between");
      setShowDiv(true);
      setBgColor("rgba(243, 246, 255, 1)");
      handleSearch();
    }
  };

  const handleArrowClick = () => {
    setSearchQuery("");
    setShowArrow(false);
    setShowDiv(false);
    setBgColor("transparent");
  };

  return isLoaded ? (
    <>
      <div
        style={{ backgroundColor: bgColor }}
        className="w-[100vw] absolute flex flex-col align-center pt-[8vh] z-40 pl-[40px] pr-[40px]"
      >
        <div className={`w-[100%] flex ${changeDiv} items-center`}>
          {showArrow && (
            <FaArrowLeft
              className="text-[#192342] w-[24px] h-[24px] cursor-pointer"
              onClick={handleArrowClick}
            />
          )}
          <div className="w-[96%] relative">
            <FaSearch className="text-[#2E18149E] text-[16.5px] absolute left-[15px] transform -translate-y-1/2 top-1/2" />
            <input
              type="text"
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="მოძებნე"
              className="shadow-[0_7px_15.8px_0_rgba(0,0,0,0.25)] text-[#2E18149E] text-[16px] w-[100%] font-[350] bg-[#E8ECF3] focus:outline-none focus:border-none h-[43px] pl-[45px] rounded-[14px]"
            />
          </div>
        </div>
        {showDiv && <RecentlySearched />}
        {destinationLocation && showDiv && (
          <button
            onClick={handleDirections}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            მიმართულებები
          </button>
        )}
      </div>

      <GoogleMap
        mapContainerClassName="h-[100vh]"
        center={currentLocation || center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onClick={handleArrowClick}
      ></GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
