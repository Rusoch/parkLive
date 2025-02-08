import { useState } from "react";
import { PopupHandle } from "./PopupHandle";
import { TPlaceData } from "../types/place";
import { ParkingPlaceIcon } from "../icons/ParkingPlaceIcon";

type TProps = {
  placeList: TPlaceData[];
};

const RecentlySearched: React.FC<TProps> = ({ placeList }) => {
  const [isListExtended, setIsListExtended] = useState(false);
  const [renderedItems, setRenderedItems] = useState<TPlaceData[]>(() => {
    if (placeList && Array.isArray(placeList)) {
      if (placeList.length >= 4) {
        return placeList.slice(0, 4);
      } else return placeList;
    } else return [];
  });
  const handleListExpand = () => {
    setIsListExtended(!isListExtended);
    setRenderedItems(placeList);
  };
  return (
    <div
      className={`${isListExtended ? "h-[100dvh]" : ""} fixed top-0 left-0 w-[100dvw] pt-[calc(43px+8dvh)] pb-[82px] bg-[#F3F6FF] flex flex-col items-center gap-[22px] z-10 rounded-b-[12px] shadow-[0_5px_15.8px_0_rgba(0,0,0,0.35),0_2px_15.8px_0_rgba(0,0,0,0.35)]`}
    >
      <h1 className="pt-[35px] w-full px-[5%]">ბოლოს მოძებნილები</h1>
      <div className="w-full px-[3%] overflow-y-auto flex-1 flex flex-col items-center gap-[22px] ">
        {renderedItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center w-full">
            <ParkingPlaceIcon isClickable={false} />
            <div>
              <span className="flex justify-start items-center w-[100%]">{item.address}</span>
              <span className="flex justify-start items-center w-[100%] text-[12px] text-[#677191]">
                უნივერსიტეტის ქუჩა 12, მეორე შესასვლელი
              </span>
            </div>
            <span>კმ</span>
          </div>
        ))}
      </div>
      <PopupHandle onClick={handleListExpand} className="absolute h-2 bottom-3" />
    </div>
  );
};

export default RecentlySearched;
