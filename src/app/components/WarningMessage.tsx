import Image from "next/image";
interface WarningMessageProps {
  message: string;
  type: "success" | "error";
}

export const WarningMessage: React.FC<WarningMessageProps> = ({ message, type }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div
        className={`w-[91%] h-[11%] bg-bg-primary text-green-dark text-[14px] font-semibold flex items-center justify-center gap-2 rounded-lg border-2 text-center 
        ${type === "success" ? "border-green-light" : "border-border-error"}`}
      >
        {message}
        {type === "success" && (
          <Image src="/stick-icon.png" alt="stick icon" width={20} height={20} priority />
        )}
      </div>
    </div>
  );
};
