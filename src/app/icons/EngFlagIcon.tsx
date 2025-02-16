import React from "react";
type TProps = { onClick?: () => void; className?: string };

export const EngFlagIcon: React.FC<TProps> = (props) => {
  return (
    <div className={`relative ${props.className}`} onClick={props.onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_229_1693)">
          <path d="M0 0H24V24H0V0Z" fill="#012169" />
          <path
            d="M24 0V3L15.0938 12L24 20.7656V24H20.8594L11.9062 15.1875L3.1875 24H0V20.8125L8.71875 12.0469L0 3.46875V0H2.90625L11.9062 8.8125L20.625 0H24Z"
            fill="white"
          />
          <path
            d="M8.625 15.1875L9.14062 16.7812L1.96875 24H0V23.8594L8.625 15.1875ZM14.4375 14.625L16.9688 15L24 21.8906V24L14.4375 14.625ZM24 0L15 9.1875L14.8125 7.125L21.8438 0H24ZM0 0.046875L9.04688 8.90625L6.28125 8.53125L0 2.29688V0.046875Z"
            fill="#C8102E"
          />
          <path d="M8.25 0V24H15.75V0H8.25ZM0 8.25V15.75H24V8.25H0Z" fill="white" />
          <path d="M0 9.75V14.25H24V9.75H0ZM9.75 0V24H14.25V0H9.75Z" fill="#C8102E" />
        </g>
        <defs>
          <clipPath id="clip0_229_1693">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
