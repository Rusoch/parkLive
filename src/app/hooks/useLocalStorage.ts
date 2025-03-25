"use client";
// hooks/useLocalStorage.ts
import { useState } from "react";

function useLocalStorage<T>(key: string, defaultValue: T[] | T | null = null) {
  const [storedValue, setStoredValue] = useState<T[] | T | null>(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T[]) : defaultValue;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return defaultValue;
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
            // Check if the place is already saved by comparing placeId
            const isAlreadySaved = parsedItem.some(
              (item: any) => item.placeId === (value as any).placeId,
            );
            if (!isAlreadySaved) {
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

      setStoredValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  const removeFromLocalStorage = (value: T) => {
    try {
      if (storedValue && Array.isArray(storedValue)) {
        const updatedValue = storedValue.filter(
          (item: any) => item.placeId !== (value as any).placeId,
        );
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
