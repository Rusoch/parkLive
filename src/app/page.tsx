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
          {theme === "dark" && (
            <div
              className="absolute w-[100dvw] h-[100dvh] pointer-events-none"
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                background: `linear-gradient(33.01deg, rgba(0, 0, 0, 0) 81.39%, rgba(0, 0, 0, 0.2) 95.31%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`,
              }}
            ></div>
          )}
          <div
            className="w-[100dvw] h-[100dvh] flex flex-col justify-between bg-[#9DCDB7] dark:bg-[#A8A8A8] bg-no-repeat bg-cover overflow-hidden transition-colors"
            style={{ backgroundImage: "url('background-light.png')" }}
          >
            <LandingPageHeader setTheme={setTheme} />
            <WelcomeSection />
          </div>
        </div>
      )}
    </I18nextProvider>
  );
}
