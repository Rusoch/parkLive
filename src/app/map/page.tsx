"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SearchButton from "../components/SearchButton";
import InfoPopup from "../components/InfoPopup";
import { Loader } from "../components/Loader";

interface Location {
    lat: number;
    lng: number;
}

interface MapProps {
    locations?: Location[] | null;
}

const placeData = {
    address: "ვაჟა-ფშაველას 24",
    totalSpace: 150,
    freeSpace: 23,
    rate: 3,
    entryFee: null,
    paymentType: ["მხოლოდ ქეში"],
    opens: "10:00",
    closes: "18:00",
};

const Map: React.FC<MapProps> = ({ locations }) => {
    const mapRef = useRef(null);
    const [theme, setTheme] = useState("light");
    const [isLoading, setIsLoading] = useState(true);

    const center =
        locations && locations.length > 0 ? locations[0] : { lat: 41.7151, lng: 44.8271 };

    const mapOptions = {
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    };
    useEffect(() => {
        const storedTheme = localStorage.getItem("user-theme") ?? "light";
        setTheme(storedTheme);
        setIsLoading(false);
    }, []);

    if (isLoading) return <Loader />;
    return (
        <I18nextProvider i18n={i18n}>
            <div className={`${theme === "dark" ? "dark" : "light"} relative`}>
                <LoadScript googleMapsApiKey="AIzaSyBslCn_7XxhEmDuE-FyGgLuvfUxH3_mBes">
                    <GoogleMap
                        mapContainerClassName="h-[100vh]"
                        center={center}
                        zoom={14}
                        ref={mapRef}
                        options={mapOptions}
                    >
                        {locations?.map((location, index) => (
                            <Marker key={index} position={location} />
                        ))}
                        <div className="w-[361px] h-[70px]">
                            <SearchButton onSearch={() => " "} />
                        </div>
                    </GoogleMap>
                </LoadScript>
                <InfoPopup isOpen={true} placeData={placeData} />
            </div>
        </I18nextProvider>
    );
};

export default Map;
