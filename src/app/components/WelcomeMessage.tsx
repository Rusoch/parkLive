"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const WelcomeMessage = () => {
  const [t] = useTranslation();
  return (
    <div>
      <h1 className="text-[#15593A] dark:text-white font-[700] text-[34px] mb-[3%] transition-colors">
        {`${t("welcome")}!`}
      </h1>
      <p className="w-[91%] h-[10.5%] text-[#15593A] dark:text-white font-[350] text-[17px] tracking-[0px] transition-colors">
        {`${t("easily and quickly find free parking places")}.`}
      </p>
    </div>
  );
};

export default WelcomeMessage;
