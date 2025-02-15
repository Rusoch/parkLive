import { useEffect, useState } from "react";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

type TProps = { onClick: () => void };

export const ThemeSwitcher: React.FC<TProps> = ({ onClick }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("user-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no saved theme, set it to 'light' by default
      setTheme("light");
    }
  }, []);

  const handler = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("user-theme", newTheme);
    setTheme(newTheme);
    onClick();
  };

  return (
    <div onClick={handler} className="cursor-pointer">
      {theme === "light" ? (
        <SunIcon className="text-black dark:text-white transition-colors" />
      ) : (
        <MoonIcon className="text-black dark:text-white transition-colors" />
      )}
    </div>
  );
};
