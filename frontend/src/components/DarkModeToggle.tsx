// components/DarkModeToggle.tsx
import React from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="px-3 py-2 border-2 shadow-sm hover:bg-gray-100 hover:border-brand-black dark:hover:border-brand-white dark:hover:bg-gray-700/45 dark:border-gray-700 dark:bg-gray-800 text-brand-black dark:text-white rounded-lg "
    >
      {darkMode ? (
        <span className="flex items-center ">
          <Sun size={20} />
        </span>
      ) : (
        <span className="flex items-center ">
          <Moon size={20} />
        </span>
      )}
    </button>
  );
};

export default DarkModeToggle;
