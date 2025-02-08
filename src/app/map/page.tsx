"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import RecentlySearched from "../components/RecentlySearched";
import { ParkingPlaceIcon } from "../icons/ParkingPlaceIcon";
import InfoPopup, { TPlaceData } from "../components/InfoPopup";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { MyLocationButton } from "../components/MyLocationButton";
import useLocalStorage from "../hooks/useLocalStorage";
import { SearchIcon } from "../icons/SearchIcon";
import { ArrowLeftIcon } from "../icons/Arrow-leftIcon";

const center = {
  lat: 41.7151,
  lng: 44.8271,
};

const placeLocation = {
  lat: 41.725705,
  lng: 44.745009,
};

const placeData = {
  placeId: 123,
  placeLocation: {
    lat: 41.725705,
    lng: 44.745009,
  },
  address: "Delisi",
  totalSpace: 300,
  freeSpace: 250,
  rate: 25,
  paymentType: ["მხოლოდ ქეში"],
  opens: "10:00",
  closes: "23:00",
};

const mapOptions = {
  mapTypeControl: false,
  zoomControl: false,
  fullscreenControl: false,
  streetViewControl: false,
};

function ParkingMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBslCn_7XxhEmDuE-FyGgLuvfUxH3_mBes",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const [isRecentlySearched, setIsRecentlySearched] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [changeDiv, setChangeDiv] = useState("justify-center");
  const [bgColor, setBgColor] = useState("transparent");
  const [divShadow, setDivShadow] = useState("none");
  const [selectedPlace, setSelectedPlace] = useState<null | TPlaceData>(null);

  const [currentLocation, setCurrentLocation] = useState<
    | {
        lat: number;
        lng: number;
      }
    | undefined
  >(center);
  const [destinationLocation, setDestinationLocation] = useState<google.maps.LatLng | undefined>(
    undefined,
  );
  const { setLocalStorage } = useLocalStorage<number>("favorites");

  useEffect(() => {
    if (navigator.geolocation) {
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state === "granted" || permissionStatus.state === "prompt") {
              // Permission has already been granted
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setCurrentLocation({ lat: latitude, lng: longitude });
                },
                () => {
                  alert("Error getting current location.");
                },
              );
            }
          })
          .catch((error) => {
            console.error("Error checking geolocation permission:", error);
          });
      }
    }
  }, []);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const handleSearch = useCallback(
    (query: string) => {
      if (!query) return;
      setChangeDiv("justify-between");
      setDivShadow("0 7px 15.8px 0 rgba(0,0,0,0.25)");

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: query }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const newCenter = results[0].geometry.location;
          setDestinationLocation(newCenter);
          map?.setCenter(newCenter);
          map?.setZoom(14);
        } else {
          setHasError(true);
          alert("საპარკინგე ადგილი ვერ მოიძებნა");
        }
      });
    },
    [map, setDestinationLocation, setChangeDiv, setDivShadow],
  );

  const handleSearchBarFocus = () => {
    setBgColor("rgba(243, 246, 255, 1)");
    setIsRecentlySearched(true);
    setShowArrow(true);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);
  useEffect(() => {
    handleSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, handleSearch]);

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
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          } else {
            alert("მიმართულებები ვერ მოიძებნა");
          }
        },
      );
    }
  };

  const handleArrowClick = () => {
    setSearchQuery("");
    setShowArrow(false);
    setIsRecentlySearched(false);
    setBgColor("transparent");
    setDivShadow("none");
  };
  const handlePlaceSelect = () => {
    setSelectedPlace(placeData);
    const targetGeometry = new google.maps.LatLng(
      placeData.placeLocation.lat,
      placeData.placeLocation.lng,
    );
    setDestinationLocation(targetGeometry);
  };
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state === "granted" || permissionStatus.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setCurrentLocation({ lat: latitude, lng: longitude });
                },
                () => {
                  alert("Error getting current location.");
                },
              );
            }
          })
          .catch((error) => {
            console.error("Error checking geolocation permission:", error);
          });
      }
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    if (storedFavorites.includes(placeData.placeId)) {
      console.log(`PlaceId ${placeData.placeId} is already in favorites.`);
    }
  }, []);

  useEffect(() => {
    if (currentLocation && map) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      // Clear the markers array
      markersRef.current = [];
      // Outer glow marker (larger and lower opacity)
      const glowMarker = new google.maps.Marker({
        position: currentLocation,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#4285F4", // Blue color
          fillOpacity: 0.3, // Lower opacity for glow effect
          strokeWeight: 0,
          scale: 20, // Larger circle for glow
        },
        zIndex: 1, // Drawn behind the main marker
      });
      // Main marker (smaller and fully opaque)
      const mainMarker = new google.maps.Marker({
        position: currentLocation,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#fff", // White border
          strokeWeight: 2,
          scale: 10, // Smaller circle
        },
        title: "Your Current Location",
        zIndex: 2, // Drawn on top of the glow marker
      });

      // Store markers in the ref for future cleanup
      markersRef.current.push(glowMarker, mainMarker);
    }
  }, [currentLocation, map]);

  return isLoaded ? (
    <I18nextProvider i18n={i18n}>
      <div
        style={{
          backgroundColor: bgColor,
          boxShadow: divShadow || "0 7px 15.8px 0 rgba(0, 0, 0, 0.25)",
          transition: " box-shadow 0.3s ease",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
        className="w-[100vw] absolute flex flex-col align-center pt-[8vh] z-40 pl-[40px] pr-[40px] shadow-md"
      >
        <div className={`w-[100%] flex ${changeDiv} items-center`}>
          {showArrow && (
            <ArrowLeftIcon className="text-[#192342] cursor-pointer " onClick={handleArrowClick} />
          )}
          <div className="w-[96%] relative">
            <SearchIcon className="text-[#2E18149E] text-[16.5px]  absolute left-[15px] top-[50%] transform -translate-y-[50%] " />
            <input
              type="text"
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="მოძებნე"
              onFocus={handleSearchBarFocus}
              className="shadow-[0_7px_15.8px_0_rgba(0,0,0,0.25)]text-[#2E18149E] text-[16px] w-[100%] font-[350] bg-[#E8ECF3] focus:outline-none focus:border-none h-[43px] rounded-[14px] pl-[45px]"
            />
          </div>
        </div>
        {isRecentlySearched && (
          <RecentlySearched searchQuery={debouncedSearchQuery} hasError={hasError} />
        )}
      </div>

      <GoogleMap
        mapContainerClassName="h-[100vh]"
        center={currentLocation || center}
        zoom={19}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onClick={handleArrowClick}
      >
        <OverlayView position={placeLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <ParkingPlaceIcon onClick={() => handlePlaceSelect()} />
        </OverlayView>
      </GoogleMap>
      <MyLocationButton className="fixed right-[4%] bottom-[13%]" onClick={handleCurrentLocation} />
      {!!selectedPlace && (
        <InfoPopup
          handleFavorites={() => setLocalStorage(placeData.placeId)}
          handleNavigation={handleDirections}
          className="fixed bottom-0"
          placeData={placeData}
          onClose={() => setSelectedPlace(null)}
          isOpen={!!selectedPlace}
        />
      )}
    </I18nextProvider>
  ) : (
    <></>
  );
}

export default React.memo(ParkingMap);
