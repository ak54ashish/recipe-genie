import { useState, useCallback } from "react";
import { searchRecipes, type Recipe, type SearchResult } from "@/services/recipeService";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>();
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(
    async (query: string, filters?: { diet?: string; cuisineType?: string; calories?: string }) => {
      if (!query.trim()) return;
      setLoading(true);
      setError(null);
      setHasSearched(true);
      try {
        const data: SearchResult = await searchRecipes(query, filters);
        setRecipes(data.hits.map((h) => h.recipe));
        setTotalCount(data.count);
        setNextPageUrl(data._links.next?.href);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadMore = useCallback(async () => {
    if (!nextPageUrl) return;
    setLoading(true);
    try {
      const response = await fetch(nextPageUrl);
      const data: SearchResult = await response.json();
      setRecipes((prev) => [...prev, ...data.hits.map((h) => h.recipe)]);
      setNextPageUrl(data._links.next?.href);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load more");
    } finally {
      setLoading(false);
    }
  }, [nextPageUrl]);

  return { recipes, loading, error, totalCount, hasSearched, hasMore: !!nextPageUrl, search, loadMore };
}
