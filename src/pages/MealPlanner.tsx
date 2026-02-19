import { useState } from "react";
import { CalendarDays, Plus, X, Search, Trash2 } from "lucide-react";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { searchRecipes, type Recipe } from "@/services/recipeService";
import { getRecipeId } from "@/services/recipeService";
import { Link } from "react-router-dom";

const MealPlanner = () => {
  const { plan, addMeal, removeMeal, clearAll, days } = useMealPlanner();
  const { t } = useLanguage();
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    try {
      const data = await searchRecipes(searchQuery);
      setSearchResults(data.hits.map((h) => h.recipe));
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleAddMeal = (recipe: Recipe) => {
    if (activeDay) {
      addMeal(activeDay, recipe);
      setActiveDay(null);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const dayLabels = t.planner.days;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-1 flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-accent" />
            {t.planner.title}
          </h1>
          <p className="text-muted-foreground font-body">{t.planner.subtitle}</p>
        </div>
        <button
          onClick={clearAll}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-body font-medium hover:bg-destructive/20 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          {t.planner.clear}
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {days.map((day, i) => (
          <div
            key={day}
            className="bg-card border border-border rounded-xl p-3 min-h-[140px] flex flex-col"
          >
            <h3 className="font-display text-sm font-semibold text-foreground mb-2 pb-2 border-b border-border">
              {dayLabels[i]}
            </h3>

            {/* Meals */}
            <div className="flex-1 space-y-1.5">
              {(plan[day] || []).map((recipe) => (
                <div
                  key={recipe.uri}
                  className="group flex items-center gap-1.5 bg-secondary/50 rounded-lg px-2 py-1.5"
                >
                  <Link
                    to={`/recipe/${getRecipeId(recipe.uri)}`}
                    className="flex-1 text-xs font-body text-foreground truncate hover:text-accent transition-colors"
                  >
                    {recipe.label}
                  </Link>
                  <button
                    onClick={() => removeMeal(day, recipe.uri)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add button */}
            <button
              onClick={() => setActiveDay(activeDay === day ? null : day)}
              className={`mt-2 flex items-center justify-center gap-1 text-xs font-body py-1.5 rounded-lg transition-all ${
                activeDay === day
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Plus className="w-3 h-3" />
              {t.planner.addMeal}
            </button>
          </div>
        ))}
      </div>

      {/* Search Modal */}
      {activeDay && (
        <div className="mt-6 bg-card border border-border rounded-xl p-4 animate-fade-in">
          <h3 className="font-display text-lg font-semibold mb-3">
            Add to {dayLabels[days.indexOf(activeDay)]}
          </h3>
          <div className="flex gap-2 mb-4">
            <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={t.planner.searchPlaceholder}
                className="flex-1 bg-transparent outline-none text-sm font-body text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-body font-semibold hover:opacity-90 transition-opacity"
            >
              {t.search.button}
            </button>
          </div>

          {searching && (
            <p className="text-sm text-muted-foreground font-body">{t.search.loading}</p>
          )}

          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              {searchResults.map((recipe) => (
                <button
                  key={recipe.uri}
                  onClick={() => handleAddMeal(recipe)}
                  className="flex items-center gap-3 bg-secondary/50 rounded-lg p-2 hover:bg-secondary transition-colors text-left"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.label}
                    className="w-10 h-10 rounded-md object-cover shrink-0"
                  />
                  <span className="text-sm font-body text-foreground truncate">
                    {recipe.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
