"use client";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import RecentlySearched from "../components/RecentlySearched";
import { ParkingPlaceIcon } from "../icons/ParkingPlaceIcon";
import InfoPopup, { TPlaceData } from "../components/InfoPopup";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { MyLocationButton } from "../components/MyLocationButton";

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

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyBslCn_7XxhEmDuE-FyGgLuvfUxH3_mBes",
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef(null);
    const [showDiv, setShowDiv] = useState(false);
    const [showArrow, setShowArrow] = useState(false);
    const [changeDiv, setChangeDiv] = useState("justify-center");
    const [bgColor, setBgColor] = useState("transparent");

    const [selectedPlace, setSelectedPlace] = useState<null | TPlaceData>(null);

    const [currentLocation, setCurrentLocation] = useState<
        { lat: number; lng: number } | undefined
    >(center);
    const [destinationLocation, setDestinationLocation] = useState<google.maps.LatLng | undefined>(
        undefined,
    );

    useEffect(() => {
        if (navigator.geolocation) {
            if (navigator.permissions) {
                navigator.permissions
                    .query({ name: "geolocation" })
                    .then((permissionStatus) => {
                        if (
                            permissionStatus.state === "granted" ||
                            permissionStatus.state === "prompt"
                        ) {
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
                        } else if (permissionStatus.state === "denied") {
                            // Permission has been denied
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking geolocation permission:", error);
                    });
            } else {
                console.warn("Permissions API is not supported in this browser.");
            }
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
                if (status === "OK" && results && results[0]) {
                    const newCenter = results[0].geometry.location;
                    setDestinationLocation(newCenter);
                    map?.setCenter(newCenter);
                    map?.setZoom(14);
                } else {
                    alert("საპარკინგე ადგილი ვერ მოიძებნა");
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
                    if (status === "OK") {
                        directionsRenderer.setDirections(result);
                    } else {
                        alert("მიმართულებები ვერ მოიძებნა");
                    }
                },
            );
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
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
                        if (
                            permissionStatus.state === "granted" ||
                            permissionStatus.state === "prompt"
                        ) {
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
                        } else if (permissionStatus.state === "denied") {
                            // Permission has been denied
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking geolocation permission:", error);
                    });
            } else {
                console.warn("Permissions API is not supported in this browser.");
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
    return isLoaded ? (
        <>
            <I18nextProvider i18n={i18n}>
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
                    zoom={19}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={mapOptions}
                    onClick={handleArrowClick}
                >
                    <OverlayView
                        position={placeLocation}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        {/* TODO: create and pass PlaceId to handler */}
                        <ParkingPlaceIcon onClick={() => handlePlaceSelect()} />
                    </OverlayView>
                </GoogleMap>
                <MyLocationButton
                    className="fixed right-[4%] bottom-[13%]"
                    onClick={handleCurrentLocation}
                />
                {!!selectedPlace && (
                    <InfoPopup
                        handleFavorites={() => console.log("რჩეულებში დამატების ლოგიკა")}
                        handleNavigation={handleDirections}
                        className="fixed bottom-0"
                        placeData={placeData}
                        onClose={() => setSelectedPlace(null)}
                        isOpen={!!selectedPlace}
                    />
                )}
            </I18nextProvider>
        </>
    ) : (
        <></>
    );
}

export default React.memo(Map);
