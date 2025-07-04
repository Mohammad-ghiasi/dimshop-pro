"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggleButtonText() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // جلوگیری از mismatch سمت کلاینت

  return (
    <div  onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex justify-between items-center bg-input px-6 py-4 rounded-lg cursor-pointer">
      <div className="flex items-center gap-x-2">
        
         {theme === "dark" ? (
      <span>تم روشن</span>
      ) : (
        <span>تم تاریک</span>
      )}
      </div>
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </div>
  
  );
}
