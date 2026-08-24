import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import type { Movie } from "../types";

const STORAGE_KEY = "diego-favorite-movies";
type FavoritesContextValue = { favorites: Movie[]; isFavorite: (id: number) => boolean; toggleFavorite: (movie: Movie) => void };
const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function loadFavorites(): Movie[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown;
    return Array.isArray(saved) ? saved.filter(movie => movie && typeof movie.id === "number") as Movie[] : [];
  } catch { return []; }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>(loadFavorites);
  const value = useMemo<FavoritesContextValue>(() => ({
    favorites,
    isFavorite: id => favorites.some(movie => movie.id === id),
    toggleFavorite: movie => setFavorites(current => {
      const updated = current.some(item => item.id === movie.id) ? current.filter(item => item.id !== movie.id) : [movie, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    }),
  }), [favorites]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  return context;
}
