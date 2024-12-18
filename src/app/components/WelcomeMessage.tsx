"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const WelcomeMessage = () => {
    const [t] = useTranslation();
    return (
        <div className="ml-[4%]">
            <h1 className="text-[#15593A] dark:text-white font-bold text-[34px] mb-[3%] transition-colors">
                {t("welcome")}
            </h1>
            <p className="w-[91%] h-[10.5%] text-[#15593A] dark:text-white font-light text-[19px] transition-colors">
                {`${t("easily and quickly find free parking places")}.`}
            </p>
        </div>
    );
};

export default WelcomeMessage;
