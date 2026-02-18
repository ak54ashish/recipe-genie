import { Heart, Clock, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { getRecipeId, type Recipe } from "@/services/recipeService";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  index?: number;
}

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, index = 0 }: RecipeCardProps) => {
  const caloriesPerServing = Math.round(recipe.calories / recipe.yield);

  return (
    <div
      className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      <Link to={`/recipe/${getRecipeId(recipe.uri)}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {recipe.cuisineType?.[0] && (
          <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            {recipe.cuisineType[0]}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={`/recipe/${getRecipeId(recipe.uri)}`}>
            <h3 className="font-display text-lg font-semibold text-card-foreground leading-snug hover:text-primary transition-colors line-clamp-2">
              {recipe.label}
            </h3>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite();
            }}
            className={`shrink-0 p-1.5 rounded-full transition-all ${
              isFavorite
                ? "text-accent animate-pulse_heart"
                : "text-muted-foreground hover:text-accent"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-accent" />
            {caloriesPerServing} cal
          </span>
          {recipe.totalTime > 0 && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {recipe.totalTime} min
            </span>
          )}
        </div>

        {/* Diet Labels */}
        {recipe.dietLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {recipe.dietLabels.map((label) => (
              <span key={label} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Ingredient preview */}
        <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
          {recipe.ingredientLines.slice(0, 3).join(" · ")}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
