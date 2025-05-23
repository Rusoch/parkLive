"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useEffect, useState } from "react";
import InstallPopup from "./components/InstallPopup";
import { Loader } from "./components/Loader";
import { LandingPageHeader } from "./components/LandingPageHeader";
import { WelcomeSection } from "./components/WelcomeSection";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedTheme = localStorage.getItem("user-theme") ?? "light";
    setTheme(storedTheme);
    setIsLoading(false);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${theme === "dark" ? "dark" : "light"} relative`}>
          <InstallPopup />
          <div className="w-[100dvw] h-[100dvh] flex flex-col items-center bg-gradient-to-b from-bg-light-from to-bg-light-to dark:bg-none dark:bg-[#1C2129] overflow-hidden">
            <LandingPageHeader setTheme={setTheme} />
            <img
              src="background-image.svg"
              alt="the background"
              className="w-[min(100dvw,46dvh)]"
            />
            <WelcomeSection />
          </div>
        </div>
      )}
    </I18nextProvider>
  );
}
