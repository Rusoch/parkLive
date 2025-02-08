import React from "react";
import { useState } from "react";
type TProps = { onClick: () => void; className?: string; isPlaceSelected?: boolean };

export const ParkingPlaceIcon: React.FC<TProps> = ({
  className,
  onClick,
  isPlaceSelected = false,
}) => {
  const [isActive, setIsActive] = useState(isPlaceSelected);
  const handleActivation = () => {
    onClick();
    setIsActive(true);
  };
  return (
    <>
      {" "}
      {isActive ? (
        <div className={`relative ${className ?? ""}`} onClick={onClick}>
          <svg
            width="48"
            height="47"
            viewBox="0 0 48 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-translate-x-[50%] -translate-y-[50%]"
          >
            <rect x="8.5" y="8" width="31.0325" height="31.0325" rx="15.5162" fill="#15593A" />
            <rect
              x="4.62094"
              y="4.12094"
              width="38.7906"
              height="38.7906"
              rx="19.3953"
              stroke="#15593A"
              strokeOpacity="0.2"
              strokeWidth="7.75812"
              strokeLinecap="round"
            />
            <path
              d="M24.7447 18.8832C27.1787 18.8832 28.1914 20.7842 28.1914 23.7512C28.1914 26.6117 26.93 28.6549 24.5492 28.6549C23.4832 28.6549 22.6482 28.2818 22.0441 27.5355V32.0128L20.5517 32.1904V19.0964H21.8309L21.9553 20.3933C22.6304 19.4339 23.6254 18.8832 24.7447 18.8832ZM24.1939 27.4289C25.7396 27.4289 26.5746 26.2563 26.5746 23.7512C26.5746 21.2639 25.8462 20.0735 24.3893 20.0735C23.3411 20.0735 22.5771 20.7842 22.0441 21.5837V26.2208C22.5594 26.9848 23.2878 27.4289 24.1939 27.4289Z"
              fill="white"
            />
          </svg>
        </div>
      ) : (
        <div className={`relative ${className ?? ""}`} onClick={handleActivation}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-translate-x-[50%] -translate-y-[50%]"
          >
            <rect x="5.30798" y="5.28003" width="20.96" height="20.96" rx="10.48" fill="#567DF4" />
            <rect
              x="2.68798"
              y="2.66003"
              width="26.2"
              height="26.2"
              rx="13.1"
              stroke="#567DF4"
              strokeOpacity="0.25"
              strokeWidth="5.24"
              strokeLinecap="round"
            />
            <path
              d="M14.944 11.1681C16.912 11.1681 18.112 11.9721 18.112 13.7001C18.112 15.5841 16.756 16.3521 14.944 16.3521H13.864V19.4241H12.832V11.1681H14.944ZM14.908 15.5241C16.168 15.5241 17.008 15.1401 17.008 13.7121C17.008 12.4401 16.204 11.9841 14.932 11.9841H13.864V15.5241H14.908Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </>
  );
};
