// components/DarkModeToggle.tsx
import React from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-3  hover:bg-slate-100 hover:border-brand-black dark:hover:border-brand-white dark:hover:bg-slate-700/45 dark:border-slate-700  text-brand-black dark:text-white rounded-lg "
    >
      {darkMode ? (
        <span className="flex items-center ">
          <Sun size={16} />
        </span>
      ) : (
        <span className="flex items-center ">
          <Moon size={16} />
        </span>
      )}
    </button>
  );
};

export default DarkModeToggle;
