import React from "react";
import { useState } from "react";
import { ParkingSignIcon } from "../icons/ParkingSignIcon";
type TProps = {
  onClick: () => void;
  className?: string;
  isPlaceSelected?: boolean;
  isClickable?: boolean;
};

export const ParkingPlaceIcon: React.FC<TProps> = ({
  className,
  onClick,
  isPlaceSelected = false,
}) => {
  const [isActive, setIsActive] = useState(isPlaceSelected);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <>
      {" "}
      {isActive ? (
        <div className={`relative ${className ?? ""}`} onClick={handleClick}>
          <ParkingSignIcon className="text-green-light -translate-x-[50%] -translate-y-[50%]" />
        </div>
      ) : (
        <div className={`relative ${className ?? ""}`} onClick={handleClick}>
          <ParkingSignIcon className="text-blue-light -translate-x-[50%] -translate-y-[50%]" />
        </div>
      )}
    </>
  );
};
