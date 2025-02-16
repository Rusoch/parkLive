"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { ParkingPlaceIcon } from "./ParkingPlaceIcon";
import InfoPopup, { TPlaceData } from "./InfoPopup";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { MyLocationButton } from "./MyLocationButton";
import useLocalStorage from "../hooks/useLocalStorage";

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

type TProps = {
  handleCloseModal: () => void;
};

type GoogleMapsLibrary = "places" | "geometry" | "drawing" | "visualization";

const libraries: GoogleMapsLibrary[] = ["places"];

export const ParkingMap: React.FC<TProps> = React.memo(({ handleCloseModal }) => {
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
                  console.log(latitude, longitude);
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
        <OverlayView position={placeLocation} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <ParkingPlaceIcon onClick={() => handlePlaceSelect()} />
        </OverlayView>
      </GoogleMap>
      <MyLocationButton className="fixed right-[4%] bottom-[13%]" onClick={handleCurrentLocation} />
      {!!selectedPlace && (
        <InfoPopup
          handleFavorites={() => setLocalStorage(placeData.placeId)}
          handleNavigation={handleDirections}
          className="fixed bottom-0 z-50"
          placeData={placeData}
          onClose={() => setSelectedPlace(null)}
          isOpen={!!selectedPlace}
        />
      )}
    </I18nextProvider>
  ) : (
    <></>
  );
});

ParkingMap.displayName = "ParkingMap";
