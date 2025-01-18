import { TargetIcon } from "../icons/TargetIcon";

export const MyLocationButton: React.FC = () => {
    return (
        <div
            className="dark:bg-[#1A6E48] rounded-full w-[52px] h-[52px] bg-[#15593A] flex items-center justify-center"
            onClick={() => "my current location logic"}
        >
            <TargetIcon />
        </div>
    );
};
