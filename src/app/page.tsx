"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import Logo from "./components/Logo";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { useEffect, useState } from "react";
import { GlobeIcon } from "./icons/GlobeIcon";
import { LanguageSelector } from "./components/LanguageSelector";
import WelcomeMessage from "./components/WelcomeMessage";
import { Button } from "./components/Button";
import { useAddToHomescreenPrompt } from "./hooks/useBeforeInstallPrompt";
import InstallPopup from "./components/InstallPopup";

export default function Home() {
    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const [theme, setTheme] = useState("light");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const storedTheme = localStorage.getItem("user-theme") ?? "light";
        setTheme(storedTheme);
        setIsLoading(false);
    }, []);

    if (isLoading)
        return (
            <div className="w-dvw h-dvh flex items-center justify-center text-white bg-[#9DCDB7] text-lg">
                Loading ...{" "}
            </div>
        );
    return (
        <I18nextProvider i18n={i18n}>
            <div className={`${theme === "dark" ? "dark" : "light"} relative`}>
                {prompt && (
                    <InstallPopup
                        onClick={() => {
                            promptToInstall();
                        }}
                    />
                )}
                {theme === "dark" && (
                    <div
                        className="absolute w-screen h-screen pointer-events-none"
                        style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            background: `linear-gradient(33.01deg, rgba(0, 0, 0, 0) 81.39%, rgba(0, 0, 0, 0.2) 95.31%), linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`,
                        }}
                    ></div>
                )}
                <div
                    className="w-screen h-screen flex flex-col justify-between bg-[#9DCDB7] dark:bg-[#A8A8A8] bg-no-repeat bg-cover overflow-hidden transition-colors"
                    style={{ backgroundImage: "url('background-light.png')" }}
                >
                    <div className="flex justify-between items-center w-[91%] m-auto mt-[22px]">
                        <Logo />
                        <div className="flex justify-between items-center gap-[14px]">
                            <ThemeSwitcher
                                onClick={() =>
                                    setTheme(localStorage.getItem("user-theme") ?? "light")
                                }
                            />
                            <div className="relative">
                                <GlobeIcon
                                    onClick={() => setIsVisible(!isVisible)}
                                    className="text-white dark:text-black "
                                />
                                <LanguageSelector
                                    isVisible={isVisible}
                                    onClick={() => setIsVisible(!isVisible)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center flex-col gap-12 mb-[87px] w-[91%] m-auto">
                        <WelcomeMessage />
                        <Button
                            onClick={() => {
                                console.log("გაგრძელება იქნება....");
                            }}
                            label="გაგრძელება"
                            className="w-[91%] m-auto bg-[#15593A] text-[16px] text-white leading-7 font-[350] rounded-[14px] flex justify-center items-center h-[55px] "
                        />
                    </div>
                </div>
            </div>
        </I18nextProvider>
    );
}
