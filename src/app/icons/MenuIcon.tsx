import React from "react";
type TProps = { onClick?: () => void; className?: string };

export const MenuIcon: React.FC<TProps> = (props) => {
  return (
    <div className={`relative ${props.className ?? ""}`} onClick={props.onClick}>
      <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0Z"
          fill="#15593A"
        />
        <path
          d="M7 2C7 0.89543 7.89543 0 9 0C10.1046 0 11 0.89543 11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2Z"
          fill="#15593A"
        />
        <path
          d="M14 2C14 0.89543 14.8954 0 16 0C17.1046 0 18 0.89543 18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2Z"
          fill="#15593A"
        />
      </svg>
    </div>
  );
};
