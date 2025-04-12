import React from "react";

interface BulletProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const Bullet: React.FC<BulletProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-dark text-green-dark text-[16px] font-bold bg-white hover:bg-[rgba(31,94,61,0.05)] transition-colors justify-start"
    >
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
};
