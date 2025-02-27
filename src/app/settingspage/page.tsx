"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const SettingsPage = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("user-theme") ?? "light";
    setTheme(storedTheme);
  }, []);

  return (
    <div className={`${theme === "dark" ? "dark" : "light"} relative`}>
      <NavBar />
    </div>
  );
};

export default SettingsPage;
