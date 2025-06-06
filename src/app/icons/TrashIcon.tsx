import React from "react";
type TProps = { onClick?: () => void; className?: string };

export const TrashIcon: React.FC<TProps> = (props) => {
  return (
    <div className={`relative ${props.className}`} onClick={props.onClick}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M7 5.5V4.5C7 3.70435 7.31607 2.94129 7.87868 2.37868C8.44129 1.81607 9.20435 1.5 10 1.5H14C14.7956 1.5 15.5587 1.81607 16.1213 2.37868C16.6839 2.94129 17 3.70435 17 4.5V5.5H21C21.5523 5.5 22 5.94772 22 6.5C22 7.05228 21.5523 7.5 21 7.5H20V20.5C20 21.2957 19.6839 22.0587 19.1213 22.6213C18.5587 23.1839 17.7957 23.5 17 23.5H7C6.20435 23.5 5.44129 23.1839 4.87868 22.6213C4.31607 22.0587 4 21.2957 4 20.5V7.5H3C2.44772 7.5 2 7.05228 2 6.5C2 5.94772 2.44772 5.5 3 5.5H7ZM9.29289 3.79289C9.48043 3.60536 9.73478 3.5 10 3.5H14C14.2652 3.5 14.5196 3.60536 14.7071 3.79289C14.8946 3.98043 15 4.23478 15 4.5V5.5H9V4.5C9 4.23478 9.10536 3.98043 9.29289 3.79289ZM6 7.5V20.5C6 20.7652 6.10536 21.0196 6.29289 21.2071C6.48043 21.3946 6.73478 21.5 7 21.5H17C17.2652 21.5 17.5196 21.3946 17.7071 21.2071C17.8946 21.0196 18 20.7652 18 20.5V7.5H6Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </g>
      </svg>
    </div>
  );
};
