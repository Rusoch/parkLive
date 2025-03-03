"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { ParkingPlaceIcon } from "./ParkingPlaceIcon";
import InfoPopup from "./InfoPopup";
import { TPlaceData, TPlaceLocation } from "../types/place";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { MyLocationButton } from "./MyLocationButton";
import useLocalStorage from "../hooks/useLocalStorage";
import { placeData } from "../constants/places";
import { darkModeStyles } from "../constants/map-styles";

function compareLocation(
  loc1: TPlaceLocation | undefined,
  loc2: TPlaceLocation | undefined,
): boolean {
  if (!loc1 || !loc2) return false;
  if (loc1.lat === loc2.lat && loc1.lng === loc2.lng) return true;
  return false;
}

type TProps = {
  handleCloseModal: () => void;
  center: TPlaceLocation;
};

type GoogleMapsLibrary = "places" | "geometry" | "drawing" | "visualization";

const libraries: GoogleMapsLibrary[] = ["places"];
const getTheme = () => {
  return typeof window !== "undefined" && localStorage.getItem("user-theme") === "dark"
    ? "dark"
    : "light";
};

export const ParkingMap: React.FC<TProps> = React.memo(({ handleCloseModal, center }) => {
  const [theme, setTheme] = useState(getTheme());
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<null | TPlaceData>(null);
  const [destinationLocation, setDestinationLocation] = useState<google.maps.LatLng | undefined>(
    undefined,
  );
  const [currentLocation, setCurrentLocation] = useState<
    | {
        lat: number;
        lng: number;
      }
    | undefined
  >(center);

  const markersRef = useRef<google.maps.Marker[]>([]);

  const { setLocalStorage } = useLocalStorage<number>("favorites");

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(getTheme());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBslCn_7XxhEmDuE-FyGgLuvfUxH3_mBes",
    language: "ka",
    libraries,
  });

  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

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
  const handlePlaceSelect: (place: TPlaceData) => void = (place) => {
    setSelectedPlace(place);
    const targetGeometry = new google.maps.LatLng(place.placeLocation.lat, place.placeLocation.lng);
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
  const handlePopupClose = () => {
    setSelectedPlace(null);
  };
  const handleActiveParkSign: (place: TPlaceLocation) => boolean = (place) => {
    return compareLocation(place, selectedPlace?.placeLocation);
  };

  useEffect(() => {
    setCurrentLocation(center);
  }, [center]);
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
  const mapOptions = {
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    gestureHandling: "greedy",
    styles: theme === "dark" ? darkModeStyles : [],
  };
  return isLoaded ? (
    <I18nextProvider i18n={i18n}>
      <GoogleMap
        mapContainerClassName="h-[100vh]"
        center={currentLocation || center}
        zoom={19}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onClick={() => handleCloseModal()}
      >
        {placeData.map((place: TPlaceData) => (
          <OverlayView
            key={`${Math.random()}`}
            position={place?.placeLocation}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <ParkingPlaceIcon
              isPlaceSelected={handleActiveParkSign(place?.placeLocation)}
              onClick={() => {
                handlePlaceSelect(place);
              }}
            />
          </OverlayView>
        ))}
      </GoogleMap>
      {!selectedPlace && (
        <MyLocationButton
          className="fixed right-[4%] bottom-[13%]"
          onClick={handleCurrentLocation}
        />
      )}
      {!!selectedPlace && (
        <InfoPopup
          handleFavorites={() => setLocalStorage(selectedPlace.placeId)}
          handleNavigation={handleDirections}
          className="fixed bottom-[69px] z-50"
          placeData={selectedPlace}
          onClose={handlePopupClose}
          isOpen={!!selectedPlace}
        />
      )}
    </I18nextProvider>
  ) : (
    <></>
  );
});

ParkingMap.displayName = "ParkingMap";
