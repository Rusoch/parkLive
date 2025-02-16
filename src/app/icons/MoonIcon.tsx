import React from "react";
type TProps = { onClick?: () => void; className?: string };

export const MoonIcon: React.FC<TProps> = (props) => {
  return (
    <div className={`relative ${props.className}`} onClick={props.onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_58_1245)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0812 0.509026C10.2747 0.852408 10.2485 1.27744 10.0142 1.59441C9.15997 2.75007 8.74891 4.17394 8.85579 5.60705C8.96266 7.04016 9.58035 8.38732 10.5965 9.40349C11.6127 10.4197 12.9599 11.0374 14.393 11.1442C15.8261 11.2511 17.25 10.8401 18.4056 9.98584C18.7226 9.75154 19.1476 9.7253 19.491 9.91883C19.8344 10.1124 20.0321 10.4895 19.9958 10.882C19.821 12.7734 19.1112 14.5758 17.9494 16.0785C16.7876 17.5811 15.2219 18.7218 13.4355 19.3671C11.649 20.0123 9.71576 20.1355 7.86189 19.7221C6.00802 19.3088 4.31022 18.376 2.96714 17.0329C1.62407 15.6898 0.691269 13.992 0.2779 12.1381C-0.135469 10.2843 -0.0123126 8.35101 0.632958 6.56457C1.27823 4.77814 2.41893 3.21243 3.92157 2.05064C5.42422 0.888844 7.22667 0.179028 9.118 0.00424446C9.51049 -0.0320265 9.88767 0.165643 10.0812 0.509026ZM7.31641 2.43906C6.5388 2.72041 5.80562 3.12203 5.1449 3.63287C3.94278 4.56231 3.03023 5.81488 2.51401 7.24402C1.99779 8.67317 1.89927 10.2198 2.22996 11.7029C2.56066 13.186 3.30689 14.5442 4.38136 15.6187C5.45582 16.6931 6.81406 17.4394 8.29716 17.7701C9.78025 18.1008 11.3269 18.0022 12.756 17.486C14.1851 16.9698 15.4377 16.0572 16.3672 14.8551C16.878 14.1944 17.2796 13.4612 17.561 12.6836C16.5078 13.0646 15.3782 13.2233 14.2442 13.1387C12.3334 12.9962 10.5372 12.1726 9.18232 10.8177C7.82742 9.4628 7.00382 7.6666 6.86132 5.75578C6.77676 4.62181 6.9354 3.49218 7.31641 2.43906Z"
            fill="#218658"
          />
        </g>
        <defs>
          <clipPath id="clip0_58_1245">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
