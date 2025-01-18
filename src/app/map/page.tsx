import { NextPage } from "next";
import Map from "../components/Map";

const MapRoute: NextPage = () => {
    return (
        <div>
            <Map locations={[]} />
        </div>
    );
};

export default MapRoute;
