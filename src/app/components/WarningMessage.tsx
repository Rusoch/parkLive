import Image from "next/image";
interface WarningMessageProps {
  message: string;
  type: "success" | "error" | "warning";
}

export const WarningMessage: React.FC<WarningMessageProps> = ({ message, type }) => {
  let color;
  switch (type) {
    case "success":
      color = "border-green-light";
      break;
    case "warning":
      color = "border-border-warning";
      break;
    case "error":
      color = "border-border-error";
      break;
    default:
      color = "border-border-error";
      break;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[60]">
      <div
        className={`w-[91%] h-[11%] bg-bg-primary text-green-dark text-[14px] font-semibold flex items-center justify-center gap-2 rounded-lg border-2 text-center 
        ${color}`}
      >
        {message}
        {type === "success" && (
          <Image src="/stick-icon.png" alt="stick icon" width={20} height={20} priority />
        )}
      </div>
    </div>
  );
};
