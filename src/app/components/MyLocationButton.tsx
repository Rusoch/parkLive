import { TargetIcon } from "../icons/TargetIcon";

type TProps = {
  onClick: () => void;
  className?: string;
};
export const MyLocationButton: React.FC<TProps> = ({ onClick, className }) => {
  return (
    <div
      className={`${className ?? ""} dark:bg-dark-bg rounded-full w-[52px] h-[52px] bg-green-dark flex items-center justify-center`}
      onClick={onClick}
    >
      <TargetIcon />
    </div>
  );
};
