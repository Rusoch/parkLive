type TProps = { className?: string };

export const SearchIcon: React.FC<TProps> = ({ className }) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 0.25C3.27208 0.25 0.25 3.27208 0.25 7C0.25 10.7279 3.27208 13.75 7 13.75C8.59376 13.75 10.0585 13.1976 11.2133 12.2739L15.4697 16.5303C15.7626 16.8232 16.2374 16.8232 16.5303 16.5303C16.8232 16.2374 16.8232 15.7626 16.5303 15.4697L12.2739 11.2133C13.1976 10.0585 13.75 8.59376 13.75 7C13.75 3.27208 10.7279 0.25 7 0.25ZM1.75 7C1.75 4.10051 4.10051 1.75 7 1.75C9.8995 1.75 12.25 4.10051 12.25 7C12.25 9.8995 9.8995 12.25 7 12.25C4.10051 12.25 1.75 9.8995 1.75 7Z"
          fill="currentColor"
          fillOpacity="0.62"
        />
      </g>
    </svg>
  );
};
