import React from "react";
type TProps = { onClick?: () => void; className?: string };

export const CloseIcon: React.FC<TProps> = (props) => {
  return (
    <div className={`relative ${props.className ?? ""}`} onClick={props.onClick}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="33"
          height="33"
          rx="16.5"
          className="fill-white dark:fill-dark-bg-transparent "
        />
        <rect x="0.5" y="0.5" width="33" height="33" rx="16.5" stroke="currentColor" />
        <path
          d="M23.7071 11.7071C24.0976 11.3166 24.0976 10.6834 23.7071 10.2929C23.3166 9.90237 22.6834 9.90237 22.2929 10.2929L17 15.5858L11.7071 10.2929C11.3166 9.90237 10.6834 9.90237 10.2929 10.2929C9.90237 10.6834 9.90237 11.3166 10.2929 11.7071L15.5858 17L10.2929 22.2929C9.90237 22.6834 9.90237 23.3166 10.2929 23.7071C10.6834 24.0976 11.3166 24.0976 11.7071 23.7071L17 18.4142L22.2929 23.7071C22.6834 24.0976 23.3166 24.0976 23.7071 23.7071C24.0976 23.3166 24.0976 22.6834 23.7071 22.2929L18.4142 17L23.7071 11.7071Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
