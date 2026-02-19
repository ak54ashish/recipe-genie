import type { Recipe } from "@/services/recipeService";

const NON_VEG_KEYWORDS = [
  "chicken", "mutton", "beef", "pork", "fish", "egg", "seafood",
  "prawn", "meat", "lamb", "turkey", "duck", "shrimp", "bacon",
  "sausage", "salmon", "tuna", "crab", "lobster", "ham", "steak",
  "anchovy", "sardine", "veal", "venison", "omelette", "shawarma",
  "nugget", "wing",
];

export type DietFilter = "all" | "veg" | "non-veg" | "snacks";

function containsNonVeg(recipe: Recipe): boolean {
  const text = [
    recipe.label,
    ...recipe.ingredientLines,
    ...(recipe.healthLabels || []),
  ]
    .join(" ")
    .toLowerCase();

  return NON_VEG_KEYWORDS.some((kw) => text.includes(kw));
}

export function filterByDiet(recipes: Recipe[], filter: DietFilter): Recipe[] {
  switch (filter) {
    case "veg":
      return recipes.filter((r) => !containsNonVeg(r));
    case "non-veg":
      return recipes.filter((r) => containsNonVeg(r));
    case "snacks":
    case "all":
    default:
      return recipes;
  }
}

export function isVeg(recipe: Recipe): boolean {
  return !containsNonVeg(recipe);
}

export const VEG_SNACK_KEYWORDS = [
  "Samosa", "Kachori", "Pakora", "Dhokla", "Vada Pav",
  "Veg Sandwich", "Veg Spring Roll", "French Fries",
];

export const NON_VEG_SNACK_KEYWORDS = [
  "Chicken Samosa", "Chicken Pakora", "Chicken Nuggets",
  "Chicken Wings", "Fish Fry", "Shawarma", "Omelette",
];

export const ALL_SNACK_KEYWORDS = [...VEG_SNACK_KEYWORDS, ...NON_VEG_SNACK_KEYWORDS];
