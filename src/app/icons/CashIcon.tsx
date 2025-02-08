import React from "react";
type TProps = { onClick?: () => void; className?: string };

export const CashIcon: React.FC<TProps> = (props) => {
  return (
    <div className={`relative ${props.className}`} onClick={props.onClick}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect width="16" height="16" fill="#D9D9D9" />
        </mask>
        <g>
          <path
            d="M7.33329 12V12.3334C7.33329 12.4223 7.36663 12.5 7.43329 12.5667C7.49996 12.6334 7.57774 12.6667 7.66663 12.6667H8.33329C8.42218 12.6667 8.49996 12.6334 8.56663 12.5667C8.63329 12.5 8.66663 12.4223 8.66663 12.3334V12H9.33329C9.52218 12 9.68052 11.9362 9.80829 11.8084C9.93607 11.6806 9.99996 11.5223 9.99996 11.3334V9.33337C9.99996 9.14448 9.93607 8.98615 9.80829 8.85837C9.68052 8.7306 9.52218 8.66671 9.33329 8.66671H7.33329V8.00004H9.33329C9.52218 8.00004 9.68052 7.93615 9.80829 7.80837C9.93607 7.6806 9.99996 7.52226 9.99996 7.33337C9.99996 7.14448 9.93607 6.98615 9.80829 6.85837C9.68052 6.7306 9.52218 6.66671 9.33329 6.66671H8.66663V6.33337C8.66663 6.24448 8.63329 6.16671 8.56663 6.10004C8.49996 6.03337 8.42218 6.00004 8.33329 6.00004H7.66663C7.57774 6.00004 7.49996 6.03337 7.43329 6.10004C7.36663 6.16671 7.33329 6.24448 7.33329 6.33337V6.66671H6.66663C6.47774 6.66671 6.3194 6.7306 6.19163 6.85837C6.06385 6.98615 5.99996 7.14448 5.99996 7.33337V9.33337C5.99996 9.52226 6.06385 9.6806 6.19163 9.80837C6.3194 9.93615 6.47774 10 6.66663 10H8.66663V10.6667H6.66663C6.47774 10.6667 6.3194 10.7306 6.19163 10.8584C6.06385 10.9862 5.99996 11.1445 5.99996 11.3334C5.99996 11.5223 6.06385 11.6806 6.19163 11.8084C6.3194 11.9362 6.47774 12 6.66663 12H7.33329ZM3.99996 14.6667C3.63329 14.6667 3.3194 14.5362 3.05829 14.275C2.79718 14.0139 2.66663 13.7 2.66663 13.3334V2.66671C2.66663 2.30004 2.79718 1.98615 3.05829 1.72504C3.3194 1.46393 3.63329 1.33337 3.99996 1.33337H9.99996L13.3333 4.66671V13.3334C13.3333 13.7 13.2027 14.0139 12.9416 14.275C12.6805 14.5362 12.3666 14.6667 12 14.6667H3.99996ZM3.99996 13.3334H12V5.33337H9.99996C9.81107 5.33337 9.65274 5.26948 9.52496 5.14171C9.39718 5.01393 9.33329 4.8556 9.33329 4.66671V2.66671H3.99996V13.3334Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
};
