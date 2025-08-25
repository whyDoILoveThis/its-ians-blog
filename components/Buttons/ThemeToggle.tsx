"use client";

import * as React from "react";
import { IoFlashlight } from "react-icons/io5";
import { GiNightSky } from "react-icons/gi";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // ⛔ Don’t render anything until mounted
    return (
      <button className="btn btn-ghost btn-round" aria-hidden="true">
        <IoFlashlight className="text-xl" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      className="btn btn-ghost btn-round"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <IoFlashlight className="text-xl" />
      ) : (
        <GiNightSky className="text-2xl" />
      )}
    </button>
  );
}
