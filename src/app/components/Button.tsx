type TProps = {
    label: string;
    className: string;
    onClick: () => void;
};
export const Button: React.FC<TProps> = ({ label, className, onClick }) => {
    return (
        <button
            className={`cursor-pointer rounded-[14px] flex items-center justify-center ${className}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
