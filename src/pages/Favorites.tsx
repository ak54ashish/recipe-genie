import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import RecipeCard from "@/components/RecipeCard";
import { useFavorites } from "@/hooks/useFavorites";

const Favorites = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Your Favorites
        </h1>
        <p className="text-muted-foreground font-body">
          {favorites.length > 0
            ? `${favorites.length} saved recipe${favorites.length !== 1 ? "s" : ""}`
            : "No favorites yet"}
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe, i) => (
            <RecipeCard
              key={recipe.uri}
              recipe={recipe}
              isFavorite={isFavorite(recipe.uri)}
              onToggleFavorite={() => toggleFavorite(recipe)}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            No favorites yet
          </h2>
          <p className="text-muted-foreground font-body mb-6">
            Start exploring recipes and save your favorites!
          </p>
          <Link
            to="/"
            className="inline-flex bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold hover:opacity-90 transition-opacity"
          >
            Discover Recipes
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
