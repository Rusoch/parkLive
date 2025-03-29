type Props = {
  onClick: () => void;
  className?: string;
};
export const PopupHandle: React.FC<Props> = ({ onClick, className }) => {
  return (
    <div onClick={onClick} className={`flex items-center justify-center w-full ${className ?? ""}`}>
      <span className="w-[20%] self-center h-full rounded-lg bg-bg-gray dark:bg-bg-input-dark m-auto"></span>
    </div>
  );
};
