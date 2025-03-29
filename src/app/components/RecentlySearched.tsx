import { useEffect, useState } from "react";
import { PopupHandle } from "./PopupHandle";
import { TPlaceLocation, IQueryResult } from "../types/place";
import { ParkingSignIcon } from "../icons/ParkingSignIcon";
import { calculateDistanceInKm } from "../utils/calculateDistance";
import { useTranslation } from "react-i18next";

type TProps = {
  placeList: IQueryResult[];
  handlePlaceSelect: (place: TPlaceLocation) => void;
};

const RecentlySearched: React.FC<TProps> = ({ placeList, handlePlaceSelect }) => {
  // Initialize items using the prop values (which already have placeholder distance)
  const [items, setItems] = useState<IQueryResult[]>(placeList);
  const { t } = useTranslation();

  useEffect(() => {
    let cancelled = false;

    async function updateDistances() {
      try {
        // Create an array of promises for each distance calculation.
        const distancePromises = placeList.map((placeItem) =>
          calculateDistanceInKm(placeItem.placeLocation).catch((error) => {
            console.error("Error calculating distance for", placeItem, error);
            return "--";
          }),
        );

        // Wait until all promises resolve.
        const distances = await Promise.all(distancePromises);

        if (!cancelled) {
          // Update each item with its calculated distance.
          const updatedItems = placeList.map((item, index) => ({
            ...item,
            distance: distances[index],
          }));
          // Update state only once with the final list.
          setItems(updatedItems);
        }
      } catch (error) {
        console.error("Error calculating distances", error);
      }
    }

    updateDistances();

    return () => {
      cancelled = true;
    };
  }, [placeList]);

  // Manage the list expansion (slicing items if not extended)
  const [isListExtended, setIsListExtended] = useState(false);
  const [renderedItems, setRenderedItems] = useState<IQueryResult[]>(() => {
    return items.length >= 4 ? items.slice(0, 4) : items;
  });

  const handleListExpand = () => {
    const newIsListExtended = !isListExtended;
    setIsListExtended(newIsListExtended);
    setRenderedItems(newIsListExtended ? items : items.slice(0, 4));
  };

  // Update the rendered items when our items state or isListExtended changes.
  useEffect(() => {
    setRenderedItems(isListExtended ? items : items.slice(0, 4));
  }, [items, isListExtended]);

  return (
    <div
      className={`${
        isListExtended ? "h-[91.5dvh]" : ""
      } fixed top-0 left-0 w-[100dvw] pt-[calc(43px+8dvh)] pb-[82px] bg-[#F3F6FF] dark:bg-[#1F2124] flex flex-col items-center gap-[22px] z-10 ${isListExtended ? "" : "rounded-b-[12px] shadow-[0_5px_15.8px_0_rgba(0,0,0,0.35),0_2px_15.8px_0_rgba(0,0,0,0.35)]"}`}
    >
      <h1 className="pt-[35px] w-full px-[5%] text-[#000000] dark:text-[#FFFFFF]">
        {t("recently searched")}
      </h1>
      <div className="w-full px-[3%] overflow-y-auto flex-1 flex flex-col items-center gap-[22px]">
        {renderedItems.map((item, index) => {
          const { shortAddress, longAddress, distance } = item;
          return (
            <div
              key={index}
              className="flex justify-between items-center gap-10 w-full"
              onClick={() => handlePlaceSelect(item.placeLocation)}
            >
              <ParkingSignIcon className="text-green-light w-8 h-8" />
              <div className="flex flex-col justify-start items-center flex-1">
                <span className="flex justify-start items-center w-[100%] text-[#192342] dark:text-[#D2DCFC]">
                  {shortAddress}
                </span>
                <span className="flex justify-start items-center w-[100%] text-[12px] text-[#677191] dark:text-[#BAC5E8]">
                  {longAddress}
                </span>
              </div>
              <span className="flex text-[#192342] dark:text-[#D2DCFC]">
                {distance !== "--" ? `${Number(distance).toFixed(1)} ${t("km")}` : "--"}
              </span>
            </div>
          );
        })}
      </div>
      <PopupHandle onClick={handleListExpand} className="absolute h-2 bottom-3" />
    </div>
  );
};

export default RecentlySearched;
