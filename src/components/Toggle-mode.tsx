"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { getSimpleCookie, setSimpleCookie } from "@/lib/cookies";
import { cashDeleter } from "@/utils/serverActions/cashDeleter";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const themeCookie = getSimpleCookie("theme");
    if (!themeCookie) {
      setSimpleCookie("theme", theme, 7);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setSimpleCookie("theme", theme, 7);
  }, [theme, mounted]);

  const toggleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    cashDeleter("/");
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleMode}
      aria-label="Toggle theme"
      className="hidden md:block"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
