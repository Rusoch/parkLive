import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { GeoFlagIcon } from "../icons/GeoFlagIcon";
import { EngFlagIcon } from "../icons/EngFlagIcon";

type TProps = { className?: string; isVisible: boolean; onClick: () => void };

export const LanguageSelector: React.FC<TProps> = ({ onClick, className }) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };
  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        className="cursor-pointer rounded-[2px] overflow-hidden"
        onClick={() => {
          const newLanguage = selectedLanguage === "ka" ? "en" : "ka";
          changeLanguage(newLanguage);
          onClick();
        }}
      >
        {selectedLanguage === "ka" ? <GeoFlagIcon /> : <EngFlagIcon />}
      </div>
    </div>
  );
};
