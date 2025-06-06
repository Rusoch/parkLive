import React from "react";
type TProps = { className?: string };

export const CarIcon: React.FC<TProps> = ({ className }) => {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="absolute top-0 left-0 -translate-x-[50%] -translate-y-[50%] w-[300px] h-[300px] flex items-center justify-center bg-[#567df431] dark:bg-[#1e8fff3e] rounded-full">
        <div className="w-[100px] h-[100px] flex items-center justify-center bg-[#567df431] dark:bg-[#1e8fff3e] rounded-full">
          <svg
            width="43"
            height="55"
            viewBox="0 0 43 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="dark:text-dark-text-secondary text-text-primary"
              d="M19.8355 3.23105L8.63235 6.80363C5.66269 7.75062 4.30942 11.8212 5.25642 14.7908L15.8304 47.9497C16.7771 50.9184 19.9518 52.5595 22.9214 51.6125L34.1246 48.0399C37.0933 47.0932 38.7341 43.9176 37.7871 40.9479L27.2131 7.78909C26.2641 4.82003 22.8042 2.28436 19.8355 3.23105Z"
              fill="currentColor"
            />
            <path
              d="M19.8355 3.23105L8.63236 6.80363C5.6627 7.75063 4.30944 11.8212 5.25643 14.7908L15.8305 47.9497C16.7772 50.9184 19.9518 52.5595 22.9215 51.6125L34.1246 48.0399C37.0933 47.0932 38.7341 43.9176 37.7871 40.9479L27.2131 7.78909C26.2642 4.82004 22.8042 2.28436 19.8355 3.23105ZM28.581 15.3341L32.1251 26.4477L29.6317 27.6113L28.1715 23.0324L28.581 15.3341ZM26.1792 12.5156C26.3961 16.5399 26.6506 21.2975 26.6506 21.2975L13.5334 25.4805L8.83092 18.0478C8.83187 18.0475 16.3781 12.4734 26.1792 12.5156ZM13.4237 28.066L14.7884 32.3457L12.0815 32.8426L8.63193 22.0253L13.4237 28.066ZM15.7522 44.3535L12.6049 34.4841L15.3101 33.9815L17.8002 41.7901L15.7522 44.3535ZM18.13 46.6853L19.2296 42.8331L32.3497 38.6492L35.4773 41.1534L18.13 46.6853ZM32.5486 36.7584L30.157 29.2585L32.6491 28.0912L35.7019 37.6642L32.5486 36.7584Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
