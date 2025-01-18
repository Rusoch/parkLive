"use client";
import { NextPage } from "next";
import Map from "../components/Map";
import { useState, useEffect } from "react";
import { Loader } from "../components/Loader";
import SearchButton from "../components/SearchButton";
import InfoPopup from "../components/InfoPopup";
import { TargetIcon } from "../icons/TargetIcon";

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

const MapRoute: NextPage = () => {
    const [theme, setTheme] = useState("light");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const storedTheme = localStorage.getItem("user-theme") ?? "light";
        setTheme(storedTheme);
        setIsLoading(false);
    }, []);

    if (isLoading) return <Loader />;

    return (
        <div className={`${theme === "dark" ? "dark" : "light"} relative`}>
            <Map locations={[]} />
            <SearchButton onSearch={() => ""} className="fixed top-0 left-0" />
            <InfoPopup
                isOpen={true}
                onClose={() => ""}
                placeData={placeData}
                className="fixed bottom-0 left-0 z-50"
            />
            <TargetIcon className="fixed right-4 bottom-[122px] z-40" />
        </div>
    );
};

export default MapRoute;
