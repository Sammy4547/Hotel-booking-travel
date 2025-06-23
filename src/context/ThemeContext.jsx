// src/context/ThemeContext.jsx
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  // On mount: load saved theme or match system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement; // 
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Prevent flashing of unthemed content
  if (!theme) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
