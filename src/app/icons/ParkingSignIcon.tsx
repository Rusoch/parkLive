import React from "react";
type TProps = { className?: string };

export const ParkingSignIcon: React.FC<TProps> = ({ className }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? ""}
    >
      <rect x="5" y="5" width="20" height="20" rx="10" fill="currentColor" />
      <rect
        x="2.5"
        y="2.5"
        width="25"
        height="25"
        rx="12.5"
        stroke="#567DF4"
        strokeOpacity="0.1"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M14.348 10.744C16.316 10.744 17.516 11.548 17.516 13.276C17.516 15.16 16.16 15.928 14.348 15.928H13.268V19H12.236V10.744H14.348ZM14.312 15.1C15.572 15.1 16.412 14.716 16.412 13.288C16.412 12.016 15.608 11.56 14.336 11.56H13.268V15.1H14.312Z"
        fill="white"
      />
    </svg>
  );
};
