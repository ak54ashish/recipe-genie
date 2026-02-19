import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import RecipeCard from "@/components/RecipeCard";
import LoadingGrid from "@/components/LoadingGrid";
import FilterButtons from "@/components/FilterButtons";
import { useRecipes } from "@/hooks/useRecipes";
import { useFavorites } from "@/hooks/useFavorites";
import { useLanguage } from "@/contexts/LanguageContext";
import { filterByDiet, type DietFilter, ALL_SNACK_KEYWORDS } from "@/utils/dietFilter";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const { t } = useLanguage();
  const [dietFilter, setDietFilter] = useState<DietFilter>("all");

  const { recipes, loading, error, totalCount, hasSearched, hasMore, search, loadMore } = useRecipes();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (query) search(query);
  }, [query, search]);

  const handleSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const handleFilterChange = (filter: DietFilter) => {
    setDietFilter(filter);
    if (filter === "snacks" && query) {
      // Trigger a snack-related search
      const snackQuery = ALL_SNACK_KEYWORDS[Math.floor(Math.random() * ALL_SNACK_KEYWORDS.length)];
      navigate(`/search?q=${encodeURIComponent(snackQuery)}`);
    }
  };

  const filteredRecipes = filterByDiet(recipes, dietFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Search bar */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} initialQuery={query} />
      </div>

      {/* Filter buttons */}
      <div className="mb-6">
        <FilterButtons active={dietFilter} onChange={handleFilterChange} />
      </div>

      {/* Results header */}
      {hasSearched && !loading && !error && (
        <p className="text-muted-foreground font-body mb-6">
          {filteredRecipes.length > 0
            ? t.search.found.replace("{count}", filteredRecipes.length.toLocaleString()).replace("{query}", query)
            : t.search.noResults.replace("{query}", query)}
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="font-body">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && recipes.length === 0 && <LoadingGrid />}

      {/* Results grid */}
      {filteredRecipes.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, i) => (
              <RecipeCard
                key={recipe.uri}
                recipe={recipe}
                isFavorite={isFavorite(recipe.uri)}
                onToggleFavorite={() => toggleFavorite(recipe)}
                index={i}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? t.search.loading : t.search.loadMore}
              </button>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading && hasSearched && filteredRecipes.length === 0 && !error && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🍳</p>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">{t.search.noRecipesTitle}</h2>
          <p className="text-muted-foreground font-body">{t.search.noRecipesMsg}</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
