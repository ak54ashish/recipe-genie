import { isVeg } from "@/utils/dietFilter";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Recipe } from "@/services/recipeService";

interface VegBadgeProps {
  recipe: Recipe;
}

const VegBadge = ({ recipe }: VegBadgeProps) => {
  const { t } = useLanguage();
  const veg = isVeg(recipe);

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
        veg
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${veg ? "bg-emerald-500" : "bg-red-500"}`} />
      {veg ? t.badges.veg : t.badges.nonVeg}
    </span>
  );
};

export default VegBadge;
