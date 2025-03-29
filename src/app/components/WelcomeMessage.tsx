"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const WelcomeMessage = () => {
  const [t] = useTranslation();
  return (
    <div className="w-[91%] flex flex-col items-start justify-start">
      <h1 className="text-green-dark dark:text-dark-text font-[700] text-[34px] mb-[3%] transition-colors">
        {`${t("welcome")}!`}
      </h1>
      <p className="h-[10.5%] text-green-dark dark:text-dark-text font-[350] text-[17px] tracking-[0px] transition-colors">
        {`${t("easily and quickly find free parking places")}.`}
      </p>
    </div>
  );
};

export default WelcomeMessage;
