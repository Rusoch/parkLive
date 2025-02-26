import { CancelIcon } from "../icons/CancelIcon";
import { PlacesIcon } from "../icons/PlacesIcon";
import { useTranslation } from "react-i18next";
import { RateIcon } from "../icons/RateIcon";
import { CashIcon } from "../icons/CashIcon";
import { ClockIcon } from "../icons/ClockIcon";
import { Button } from "./Button";
import { useState } from "react";
import { PopupHandle } from "./PopupHandle";
import { TPlaceData } from "../types/place";

type TProps = {
  isOpen?: boolean;
  onClose: () => void;
  handleNavigation: () => void;
  handleFavorites: () => void;
  placeData: TPlaceData;
  className?: string;
};
const InfoPopup: React.FC<TProps> = ({
  isOpen,
  onClose,
  placeData,
  className,
  handleNavigation,
  handleFavorites,
}) => {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(isOpen);
  const [isPopupMinified, setIsPopupMinified] = useState(false);

  if (!isPopupOpen) return null;
  const handlePopupMinify = () => {
    setIsPopupMinified(!isPopupMinified);
  };
  const { totalSpace, freeSpace, rate, paymentType, opens, closes } = placeData;
  const paymentKeyword = paymentType[0] === "მხოლოდ ქეში" ? "cashOnly" : "card";
  return (
    <div
      className={`${className ?? ""} bg-[#F3F6FF] dark:bg-[#1F2124] rounded-t-lg border border-[#EAEAEA] shadow-[rgba(0,0,15,0.3)_0_-5px_10px_0] flex items-center flex-col px-[14px] text-[#15593A] dark:text-[#15593A] text-[20px] w-full`}
    >
      <PopupHandle onClick={handlePopupMinify} className="h-[5px] mt-[10px]" />
      <div className="w-full flex justify-between leading-[27px] mt-4 mb-4">
        <span>{placeData.address}</span>
        <div className="flex gap-3">
          <CancelIcon
            onClick={() => {
              onClose();
              setIsPopupOpen(false);
            }}
          />
        </div>
      </div>
      {!isPopupMinified && (
        <ul className="flex flex-col w-full items-start gap-1 text-[14px] mb-5">
          <li className="flex items-center gap-2 justify-center">
            <PlacesIcon /> {`${freeSpace}/${totalSpace} ${t("place")}`}
          </li>
          <li className="flex items-center gap-2 justify-center">
            <RateIcon /> {`${rate}/1 ${t("hour")}`}
          </li>
          <li className="flex items-center gap-2 justify-center">
            <CashIcon /> {t(paymentKeyword)}
          </li>
          <li className="flex items-center gap-2 justify-center">
            <ClockIcon /> {`${opens} - ${closes}`}
          </li>
        </ul>
      )}
      <div className="flex w-full justify-between leading-[19px] pb-5">
        <Button
          onClick={handleNavigation}
          label={t("directions")}
          className="rounded-[6px] w-[47.5%] py-2 border bg-green-light border-green-light dark:border-[#1A6E48] text-white dark:text-[#0D0D0D] dark:bg-[#1A6E48] text-[14px]"
        />
        <Button
          onClick={handleFavorites}
          label={t("save")}
          className="rounded-[6px] w-[47.5%] py-2 border border-green-light text-green-light dark:text-[#1A6E48] dark:border-[#1A6E48] text-[14px]"
        />
      </div>
    </div>
  );
};

export default InfoPopup;
