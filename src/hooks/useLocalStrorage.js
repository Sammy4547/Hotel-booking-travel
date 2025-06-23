import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : initialValue;
    } catch (err) {
      console.error("Error reading localStorage", err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error("Error writing to localStorage", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
