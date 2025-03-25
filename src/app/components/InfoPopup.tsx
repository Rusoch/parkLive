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
import { WarningMessage } from "./WarningMessage";
import useLocalStorage from "../hooks/useLocalStorage";

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
  const [showWarning, setShowWarning] = useState(false);
  const [warningType, setWarningType] = useState<"success" | "error">("success");
  const { storedValue: favorites } = useLocalStorage<TPlaceData>("favorites");

  if (!isPopupOpen) return null;

  const handlePopupMinify = () => {
    setIsPopupMinified(!isPopupMinified);
  };

  const handleSave = () => {
    const favoritesList = Array.isArray(favorites) ? favorites : favorites ? [favorites] : [];
    const isAlreadySaved = favoritesList.some((fav) => fav.placeId === placeData.placeId);

    if (isAlreadySaved) {
      setWarningType("error");
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
        onClose();
      }, 1000);
      return;
    }

    handleFavorites();
    setWarningType("success");
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
      onClose();
    }, 1000);
  };

  const { totalSpace, freeSpace, rate, paymentType, opens, closes } = placeData;
  const paymentKeyword = paymentType[0] === "მხოლოდ ქეში" ? "cashOnly" : "card";

  return (
    <>
      <div
        className={`${className ?? ""} bg-[#F3F6FF] dark:bg-[#1F2124] rounded-t-lg border-b border-b-[#EAEAEA] shadow-[rgba(0,0,15,0.3)_0_-5px_10px_0] flex items-center flex-col px-[14px] text-[#15593A] dark:text-[#FFFFFF] text-[20px] w-full`}
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
            className="rounded-[6px] w-[47.5%] h-8 border bg-green-light border-green-light text-white text-[14px] font-[700]"
          />
          <Button
            onClick={handleSave}
            label={t("save")}
            className="rounded-[6px] w-[47.5%] h-8 border border-green-light text-green-light text-[14px] font-[700] bg-white"
          />
        </div>
      </div>
      {showWarning && (
        <WarningMessage
          message={warningType === "error" ? t("locationAlreadyInFavorites") : t("locationSaved")}
          type={warningType}
        />
      )}
    </>
  );
};

export default InfoPopup;
