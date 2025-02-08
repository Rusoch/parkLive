// hooks/useLocalStorage.ts
import { useState } from "react";

function useLocalStorage<T>(key: string) {
    const [storedValue, setStoredValue] = useState<T[] | null>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T[]) : null;
        } catch (error) {
            console.error("Error reading localStorage", error);
            return null;
        }
    });

    const setLocalStorage = (value: T) => {
        try {
            const item = localStorage.getItem(key);
            if (item) {
                const parsedItem = JSON.parse(item);
                if (Array.isArray(parsedItem)) {
                    parsedItem.indexOf(value);
                    if (parsedItem.indexOf(value) === -1) parsedItem.push(value);
                }
                setStoredValue(parsedItem as T[]);
                localStorage.setItem(key, JSON.stringify(parsedItem));
            } else {
                const newItem = [value];
                setStoredValue(newItem);
                localStorage.setItem(key, JSON.stringify(newItem));
            }
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    };

    return { storedValue, setLocalStorage } as const;
}

export default useLocalStorage;
