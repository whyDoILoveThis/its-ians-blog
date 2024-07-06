// components/ThemeToggle.tsx
"use client";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaSun } from "react-icons/fa6";
import { PiMoonStarsDuotone } from "react-icons/pi";
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full focus:outline-none"
    >
      {theme === "light" ? (
        <PiMoonStarsDuotone className="w-6 h-6 text-slate-400" />
      ) : (
        <FaSun className="w-6 h-6 text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
