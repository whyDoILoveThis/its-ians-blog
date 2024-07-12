// components/ThemeToggle.tsx
"use client";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { PiMoonStarsDuotone, PiSunDuotone } from "react-icons/pi";
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full focus:outline-none"
    >
      {theme === "light" ? (
        <PiMoonStarsDuotone className="w-6 h-6 text-slate-700" />
      ) : (
        <PiSunDuotone className="w-6 h-6 text-slate-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
