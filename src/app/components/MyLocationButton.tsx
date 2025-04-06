import { TargetIcon } from "../icons/TargetIcon";

type TProps = {
  onClick: () => void;
  className?: string;
  isLocationEnabled: boolean;
};
export const MyLocationButton: React.FC<TProps> = ({ onClick, className, isLocationEnabled }) => {
  return (
    <div
      className={`${className ?? ""} dark:bg-dark-bg rounded-full w-[52px] h-[52px] bg-green-dark flex items-center justify-center ${
        isLocationEnabled ? "opacity-100" : "opacity-50"
      }`}
      onClick={onClick}
    >
      <TargetIcon />
    </div>
  );
};
