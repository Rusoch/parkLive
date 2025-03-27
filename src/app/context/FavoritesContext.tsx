"use client";
import React, { createContext, useContext, useState } from "react";

type FavoritesContextType = {
  favoritesCount: number;
  updateFavoritesCount: (count: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoritesCount, setFavoritesCount] = useState(0);

  return (
    <FavoritesContext.Provider value={{ favoritesCount, updateFavoritesCount: setFavoritesCount }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
