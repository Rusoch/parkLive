"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Location {
    lat: number;
    lng: number;
}

interface MapProps {
    locations?: Location[] | null;
}

const Map: React.FC<MapProps> = ({ locations }) => {
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
    const [theme, setTheme] = useState("light");

    const mapRef = useRef(null);

    const mapOptions = {
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("user-theme") ?? "light";
        setTheme(storedTheme);
    }, []);
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
            <div className={`${theme === "dark" ? "dark" : "light"} relative`}>
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
                    </GoogleMap>
                </LoadScript>
            </div>
        </I18nextProvider>
    );
};

export default Map;
