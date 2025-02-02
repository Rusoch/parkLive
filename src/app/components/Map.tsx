"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import { CarIcon } from "../icons/CarIcon";

interface Location {
    lat: number;
    lng: number;
}

interface MapProps {
    locations?: Location[] | null;
}

const Map: React.FC<MapProps> = ({ locations }) => {
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });

    const mapRef = useRef(null);

    const mapOptions = {
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    };

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => console.error("Error getting location", error),
            { enableHighAccuracy: true },
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <I18nextProvider i18n={i18n}>
            <LoadScript googleMapsApiKey="AIzaSyBslCn_7XxhEmDuE-FyGgLuvfUxH3_mBes">
                <GoogleMap
                    mapContainerClassName="h-[100vh]"
                    center={userLocation}
                    zoom={18}
                    ref={mapRef}
                    options={mapOptions}
                >
                    {locations?.map((location, index) => (
                        <Marker key={index} position={location} />
                    ))}
                    <OverlayView
                        position={userLocation}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <CarIcon className="-translate-x-[50%] -translate-y-[50%] dark:text-[#314C9C] text-[#567DF4]" />
                    </OverlayView>
                </GoogleMap>
            </LoadScript>
        </I18nextProvider>
    );
};

export default Map;
