"use client";
import { useEffect, useState } from "react";
import { ContrastIcon } from "../icons/ContrastIcon";

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
    <ContrastIcon onClick={handler} className="text-white dark:text-black transition-colors" />
  );
};
