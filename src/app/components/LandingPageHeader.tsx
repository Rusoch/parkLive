import { useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import Logo from "./Logo";
import { ThemeSwitcher } from "./ThemeSwitcher";

type TProps = {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const LandingPageHeader: React.FC<TProps> = ({ setTheme }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="flex justify-between items-center w-[91%] m-auto mt-[22px]">
      <Logo />
      <div className="flex justify-between items-center gap-[14px]">
        <ThemeSwitcher onClick={() => setTheme(localStorage.getItem("user-theme") ?? "light")} />
        <div className="relative">
          <LanguageSelector isVisible={isVisible} onClick={() => setIsVisible(!isVisible)} />
        </div>
      </div>
    </div>
  );
};
