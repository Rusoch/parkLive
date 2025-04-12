import React from "react";

interface DocumentIconProps {
  className?: string;
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6667 8.33333V5.83333C16.6667 4.72827 15.7717 3.83333 14.6667 3.83333H5.33333C4.22827 3.83333 3.33333 4.72827 3.33333 5.83333V14.1667C3.33333 15.2717 4.22827 16.1667 5.33333 16.1667H14.6667C15.7717 16.1667 16.6667 15.2717 16.6667 14.1667V11.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66669 7.5H13.3334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66669 10H13.3334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66669 12.5H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
