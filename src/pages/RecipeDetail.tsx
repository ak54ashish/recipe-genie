import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, Flame, Users, Heart, ExternalLink } from "lucide-react";
import { getRecipeById, type Recipe } from "@/services/recipeService";
import { useFavorites } from "@/hooks/useFavorites";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getRecipeById(id)
      .then((data) => {
        setRecipe(data);
        if (!data) setError("Recipe not found");
      })
      .catch(() => setError("Failed to load recipe"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-shimmer bg-gradient-to-r from-muted via-secondary to-muted bg-[length:200%_100%] h-80 rounded-xl mb-6" />
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-2/3 animate-shimmer bg-gradient-to-r from-muted via-secondary to-muted bg-[length:200%_100%]" />
          <div className="h-4 bg-muted rounded w-1/3 animate-shimmer bg-gradient-to-r from-muted via-secondary to-muted bg-[length:200%_100%]" />
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h2 className="font-display text-2xl font-semibold mb-2">{error || "Recipe not found"}</h2>
        <button onClick={() => navigate(-1)} className="text-primary font-body hover:underline mt-4 inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Go back
        </button>
      </div>
    );
  }

  const caloriesPerServing = Math.round(recipe.calories / recipe.yield);
  const nutrients = recipe.totalNutrients;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to results
      </button>

      {/* Hero image */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <img src={recipe.image} alt={recipe.label} className="w-full h-64 sm:h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-2 drop-shadow-lg">
            {recipe.label}
          </h1>
          <p className="text-primary-foreground/80 font-body text-sm">
            Source: {recipe.source}
          </p>
        </div>
      </div>

      {/* Actions & Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button
          onClick={() => toggleFavorite(recipe)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold transition-all ${
            isFavorite(recipe.uri)
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite(recipe.uri) ? "fill-current" : ""}`} />
          {isFavorite(recipe.uri) ? "Saved" : "Save"}
        </button>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-accent" />{caloriesPerServing} cal/serving</span>
          {recipe.totalTime > 0 && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{recipe.totalTime} min</span>}
          <span className="flex items-center gap-1"><Users className="w-4 h-4" />{recipe.yield} servings</span>
        </div>
      </div>

      {/* Labels */}
      {(recipe.dietLabels.length > 0 || recipe.healthLabels.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-8">
          {recipe.dietLabels.map((l) => (
            <span key={l} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-body font-medium">{l}</span>
          ))}
          {recipe.healthLabels.slice(0, 5).map((l) => (
            <span key={l} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-body">{l}</span>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredientLines.map((line, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-card-foreground">
                <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition */}
        <div>
          <h2 className="font-display text-2xl font-semibold mb-4">Nutrition</h2>
          <div className="bg-card rounded-lg p-5 shadow-card space-y-3">
            {nutrients.ENERC_KCAL && (
              <NutrientRow label="Calories" value={`${Math.round(nutrients.ENERC_KCAL.quantity / recipe.yield)} kcal`} />
            )}
            {nutrients.PROCNT && (
              <NutrientRow label="Protein" value={`${Math.round(nutrients.PROCNT.quantity / recipe.yield)}g`} />
            )}
            {nutrients.FAT && (
              <NutrientRow label="Fat" value={`${Math.round(nutrients.FAT.quantity / recipe.yield)}g`} />
            )}
            {nutrients.CHOCDF && (
              <NutrientRow label="Carbs" value={`${Math.round(nutrients.CHOCDF.quantity / recipe.yield)}g`} />
            )}
            <p className="text-xs text-muted-foreground pt-2">* Per serving</p>
          </div>
        </div>
      </div>

      {/* Source link */}
      <div className="mt-10 text-center">
        <a
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold hover:opacity-90 transition-opacity"
        >
          View Full Recipe <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const NutrientRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center text-sm font-body">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold text-card-foreground">{value}</span>
  </div>
);

export default RecipeDetail;
