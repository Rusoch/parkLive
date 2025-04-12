import React from "react";
import { Bullet } from "./Bullet";
import { CloseIcon } from "../icons/CloseIcon";

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

interface DynamicMenuProps {
  items: MenuItem[];
  onClose: () => void;
}

export const DynamicMenu: React.FC<DynamicMenuProps> = ({ items, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-[90]" onClick={onClose} />
      <div className="fixed bottom-[8.5dvh] right-5 z-[90] flex flex-col items-end gap-3 min-w-[200px]">
        <div className="flex flex-col gap-3 items-end pb-4">
          {items.map((item) => (
            <Bullet
              key={item.id}
              icon={item.icon}
              label={item.label}
              onClick={() => {
                item.action();
                onClose();
              }}
            />
          ))}
          <button onClick={onClose} className="text-[#1F5E3D] hover:opacity-80 focus:outline-none">
            <CloseIcon />
          </button>
        </div>
      </div>
    </>
  );
};
