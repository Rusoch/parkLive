"use client";
// hooks/useLocalStorage.ts
import { useState } from "react";

function useLocalStorage<T>(key: string) {
  const [storedValue, setStoredValue] = useState<T[] | T | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T[]) : null;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return null;
    }
  });

  const setLocalStorage = (value: T | T[]) => {
    try {
      let newValue: T[] = [];

      if (Array.isArray(value)) {
        newValue = value;
      } else {
        const item = localStorage.getItem(key);
        if (item) {
          const parsedItem = JSON.parse(item);
          if (Array.isArray(parsedItem)) {
            // Favori eklerken, daha önce eklenmişse tekrar eklememek için kontrol ediyoruz
            if (!parsedItem.includes(value)) {
              parsedItem.push(value);
            }
            newValue = parsedItem;
          } else {
            newValue = [value];
          }
        } else {
          newValue = [value];
        }
      }

      // state ve localStorage'ı güncelliyoruz
      setStoredValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  // Favori silme fonksiyonu
  const removeFromLocalStorage = (value: T) => {
    try {
      if (storedValue && Array.isArray(storedValue)) {
        // Diziden çıkarma işlemi
        const updatedValue = storedValue.filter((item) => item !== value);

        setStoredValue(updatedValue);
        localStorage.setItem(key, JSON.stringify(updatedValue));
      }
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  };

  return { storedValue, setLocalStorage, removeFromLocalStorage } as const;
}

export default useLocalStorage;
