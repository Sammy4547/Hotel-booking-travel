// src/components/ThemeToggle.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="px-3 py-1 rounded-md border text-sm font-medium 
                 hover:bg-gray-100 dark:hover:bg-gray-700 
                 transition-colors"
    >
      {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
