"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return (
      <button className="rounded-md bg-gray-200 p-2 dark:bg-gray-800">
        <span className="invisible">🌙 Mode sombre</span>
      </button>
    );
  }

  return (
    <button
      className="rounded-md bg-gray-200 p-2 dark:bg-gray-800"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? "🌞 Mode clair" : "🌙 Mode sombre"}
    </button>
  );
};

export default ThemeSwitch;
