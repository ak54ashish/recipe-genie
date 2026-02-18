import { useState, useEffect, useCallback } from "react";
import type { Recipe } from "@/services/recipeService";

const STORAGE_KEY = "recipe-finder-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((recipe: Recipe) => {
    setFavorites((prev) => {
      if (prev.some((r) => r.uri === recipe.uri)) return prev;
      return [...prev, recipe];
    });
  }, []);

  const removeFavorite = useCallback((uri: string) => {
    setFavorites((prev) => prev.filter((r) => r.uri !== uri));
  }, []);

  const isFavorite = useCallback(
    (uri: string) => favorites.some((r) => r.uri === uri),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (recipe: Recipe) => {
      if (isFavorite(recipe.uri)) {
        removeFavorite(recipe.uri);
      } else {
        addFavorite(recipe);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
