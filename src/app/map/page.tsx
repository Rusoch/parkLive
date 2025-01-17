'use client'
import { useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import SearchButton from "../components/SearchButton";

interface Location {
    lat: number;
    lng: number;
}

interface MapProps {
    locations?: Location[] | null;
}

const Map: React.FC<MapProps> = ({ locations }) => {
    const mapRef = useRef(null);

    const center =
        locations && locations.length > 0 ? locations[0] : { lat: 41.7151, lng: 44.8271 };

    const mapOptions = {
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBslCn_7XxhEmDuE-FyGgLuvfUxH3_mBes">
            <GoogleMap
                mapContainerClassName="h-[100vh]"
                center={center}
                zoom={14}
                ref={mapRef}
                options={mapOptions}
            >
                {locations?.map((location, index) => <Marker key={index} position={location} />)}
                <div className="w-[361px] h-[70px]">
                    <SearchButton onSearch={()=> " "}/>
                </div>
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
