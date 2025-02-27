type TProps = { onClick?: () => void; className?: string };

export const ArrowLeftIcon: React.FC<TProps> = (props) => {
  return (
    <div
      className={`relative flex justify-center items-center ${props.className}`}
      onClick={props.onClick}
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g>
          <path
            d="M8.328 11.4997H20.5V13.4997H8.328L13.692 18.8637L12.278 20.2777L4.5 12.4997L12.278 4.72168L13.692 6.13568L8.328 11.4997Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
};
