import { ShareIcon } from "../icons/ShareIcon";
import { CancelIcon } from "../icons/CancelIcon";
import { PlacesIcon } from "../icons/PlacesIcon";
import { useTranslation } from "react-i18next";
import { RateIcon } from "../icons/RateIcon";
import { CashIcon } from "../icons/CashIcon";
import { ClockIcon } from "../icons/ClockIcon";
import { Button } from "./Button";

type TPlaceData = {
    address: string;
    totalSpace: number;
    freeSpace: number;
    rate: number;
    entryFee?: null | number;
    paymentType: string[];
    opens: string;
    closes: string;
};
type TProps = {
    isOpen?: boolean;
    onClose?: () => void;
    placeData: TPlaceData;
};
const InfoPopup: React.FC<TProps> = ({ isOpen, onClose, placeData }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;
    const { address, totalSpace, freeSpace, rate, paymentType, opens, closes } = placeData;
    const paymentKeyword = paymentType[0] === "მხოლოდ ქეში" ? "cashOnly" : "";
    return (
        <div className="bg-white dark:bg-[#0D0D0D] rounded-t-lg shadow-lg flex items-center flex-col px-[14px] text-[#15593A] dark:text-[#15593A] text-[20px] fixed bottom-0 left-0 w-full">
            <span className="w-[20%] self-center h-1 rounded-lg bg-[#D9D9D9] dark:bg-[#333333] m-auto mt-[10px] mb-3"></span>
            <div className="w-full flex justify-between">
                <span>{t(address)}</span>
                <div className="flex gap-3">
                    <ShareIcon />
                    <CancelIcon onClick={onClose} />
                </div>
            </div>
            <ul className="flex flex-col w-full mt-4 items-start gap-1 text-[14px]">
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
            <div className="flex w-full justify-around mt-8 mb-9">
                <Button
                    onClick={() => console.log("მისვლა")}
                    label={t("directions")}
                    className="rounded-[14px] w-[44%] py-2 border bg-[#15593A] border-[#15593A] dark:border-[#1A6E48] text-white dark:text-[#0D0D0D] dark:bg-[#1A6E48] text-[14px]"
                />
                <Button
                    onClick={() => console.log("შენახვა")}
                    label={t("save")}
                    className="rounded-[14px] w-[44%] py-2 border border-[#15593A] text-[#15593A] dark:text-[#1A6E48] dark:border-[#1A6E48] text-[14px]"
                />
            </div>
        </div>
    );
};

export default InfoPopup;
