import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-background-light dark:hover:bg-dark-200 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-text-secondary dark:text-gray-300" />
      ) : (
        <Sun className="h-5 w-5 text-text-secondary dark:text-gray-300" />
      )}
    </button>
  );
};

export default ThemeToggle;