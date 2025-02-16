import { useEffect, useState } from "react";
import { PopupHandle } from "./PopupHandle";
import { TPlaceLocation, TQueryResult } from "../types/place";
import { ParkingSignIcon } from "../icons/ParkingSignIcon";

type TProps = {
  placeList: TQueryResult[];
  handlePlaceSelect: (place: TPlaceLocation) => void;
};

const RecentlySearched: React.FC<TProps> = ({ placeList, handlePlaceSelect }) => {
  const [isListExtended, setIsListExtended] = useState(false);
  const [renderedItems, setRenderedItems] = useState<TQueryResult[]>(() => {
    if (placeList && Array.isArray(placeList)) {
      if (placeList.length >= 4) {
        return placeList.slice(0, 4);
      } else return placeList;
    } else return [];
  });
  const handleListExpand = () => {
    // Compute the new value of isListExtended
    const newIsListExtended = !isListExtended;

    // Update the state with the new value
    setIsListExtended(newIsListExtended);

    // Use the new value immediately to update renderedItems
    setRenderedItems(newIsListExtended ? placeList : placeList.slice(0, 4));
  };
  useEffect(() => {
    if (placeList && Array.isArray(placeList) && placeList.length >= 4) {
      setRenderedItems(placeList.slice(0, 4));
    } else setRenderedItems(placeList);
  }, [placeList]);
  return (
    <div
      className={`${isListExtended ? "h-[100dvh]" : ""} fixed top-0 left-0 w-[100dvw] pt-[calc(43px+8dvh)] pb-[82px] bg-[#F3F6FF] flex flex-col items-center gap-[22px] z-10 rounded-b-[12px] shadow-[0_5px_15.8px_0_rgba(0,0,0,0.35),0_2px_15.8px_0_rgba(0,0,0,0.35)]`}
    >
      <h1 className="pt-[35px] w-full px-[5%]">ბოლოს მოძებნილები</h1>
      <div className="w-full px-[3%] overflow-y-auto flex-1 flex flex-col items-center gap-[22px] ">
        {renderedItems.map((item, index) => {
          const { shortAddress, longAddress } = item;
          return (
            <div
              key={index}
              className="flex justify-between items-center gap-10 w-full"
              onClick={() => handlePlaceSelect(item.placeLocation)}
            >
              <ParkingSignIcon className="text-green-light" />
              <div className="flex flex-col justify-start items-center w-[100%]">
                <span className="flex justify-start items-center w-[100%]">{shortAddress}</span>
                <span className="flex justify-start items-center w-[100%] text-[12px] text-[#677191]">
                  {longAddress}
                </span>
              </div>
              <span>კმ</span>
            </div>
          );
        })}
      </div>
      <PopupHandle onClick={handleListExpand} className="absolute h-2 bottom-3" />
    </div>
  );
};

export default RecentlySearched;
