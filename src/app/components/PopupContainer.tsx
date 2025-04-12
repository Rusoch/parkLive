import React from "react";
import { PopupHandle } from "./PopupHandle";

interface PopupContainerProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export const PopupContainer: React.FC<PopupContainerProps> = ({ children, onClose, className }) => {
  return (
    <div className="fixed inset-0 z-80 flex items-end justify-center">
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10" onClick={onClose} />
      <div
        className={`relative w-full bg-bg-primary rounded-t-[16px] shadow-[0px_-4px_12px_rgba(0,0,0,0.1)] p-[20px] pb-[24px] pt-[10px] h-[500px] mb-[8.5dvh] ${
          className || ""
        }`}
      >
        <PopupHandle onClick={onClose} className="mb-4 h-[5px]" />
        {children}
      </div>
    </div>
  );
};
