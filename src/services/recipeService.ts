// Recipe service for Edamam API integration
// The Edamam API requires an APP_ID and APP_KEY
// For now we use mock data as fallback when keys aren't configured

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  ingredientLines: string[];
  calories: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string[];
  totalNutrients: Record<string, { label: string; quantity: number; unit: string }>;
}

export interface SearchResult {
  from: number;
  to: number;
  count: number;
  _links: { next?: { href: string } };
  hits: Array<{ recipe: Recipe }>;
}

const APP_ID = import.meta.env.VITE_APP_ID || "";
const APP_KEY = import.meta.env.VITE_APP_KEY || "";
const BASE_URL = "https://api.edamam.com/api/recipes/v2";

// Extract a unique ID from the recipe URI
export function getRecipeId(uri: string): string {
  return encodeURIComponent(uri);
}

export function decodeRecipeId(id: string): string {
  return decodeURIComponent(id);
}

export async function searchRecipes(
  query: string,
  filters?: { diet?: string; cuisineType?: string; calories?: string },
  nextPageUrl?: string
): Promise<SearchResult> {
  if (!APP_ID || !APP_KEY) {
    return getMockResults(query);
  }

  const url = nextPageUrl || buildSearchUrl(query, filters);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  if (!APP_ID || !APP_KEY) {
    const mock = mockRecipes.find((r) => getRecipeId(r.uri) === id);
    return mock || null;
  }

  const uri = decodeRecipeId(id);
  const url = `${BASE_URL}/by-uri?type=public&uri=${encodeURIComponent(uri)}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  const data = await response.json();
  return data.hits?.[0]?.recipe || null;
}

function buildSearchUrl(query: string, filters?: { diet?: string; cuisineType?: string; calories?: string }): string {
  const params = new URLSearchParams({
    type: "public",
    q: query,
    app_id: APP_ID,
    app_key: APP_KEY,
  });

  if (filters?.diet) params.set("diet", filters.diet);
  if (filters?.cuisineType) params.set("cuisineType", filters.cuisineType);
  if (filters?.calories) params.set("calories", filters.calories);

  return `${BASE_URL}?${params.toString()}`;
}

// --- Mock Data for when API keys aren't configured ---
const mockRecipes: Recipe[] = [
  {
    uri: "mock_1_chicken_tikka",
    label: "Chicken Tikka Masala",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    source: "BBC Good Food",
    url: "https://example.com",
    yield: 4,
    dietLabels: ["High-Protein"],
    healthLabels: ["Peanut-Free"],
    ingredientLines: ["500g chicken breast", "200ml yogurt", "2 tbsp tikka paste", "400g chopped tomatoes", "200ml cream", "1 onion", "3 garlic cloves", "Fresh coriander"],
    calories: 1680,
    totalTime: 45,
    cuisineType: ["Indian"],
    mealType: ["lunch/dinner"],
    totalNutrients: { ENERC_KCAL: { label: "Energy", quantity: 1680, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 120, unit: "g" }, FAT: { label: "Fat", quantity: 80, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 60, unit: "g" } },
  },
  {
    uri: "mock_2_pasta_pesto",
    label: "Creamy Pesto Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    source: "Jamie Oliver",
    url: "https://example.com",
    yield: 2,
    dietLabels: ["Balanced"],
    healthLabels: ["Vegetarian"],
    ingredientLines: ["250g pasta", "100g pesto", "50g parmesan", "100ml cream", "Cherry tomatoes", "Fresh basil"],
    calories: 1120,
    totalTime: 20,
    cuisineType: ["Italian"],
    mealType: ["lunch/dinner"],
    totalNutrients: { ENERC_KCAL: { label: "Energy", quantity: 1120, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 35, unit: "g" }, FAT: { label: "Fat", quantity: 55, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 110, unit: "g" } },
  },
  {
    uri: "mock_3_salmon_bowl",
    label: "Teriyaki Salmon Rice Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    source: "Bon Appétit",
    url: "https://example.com",
    yield: 2,
    dietLabels: ["High-Protein"],
    healthLabels: ["Gluten-Free"],
    ingredientLines: ["2 salmon fillets", "200g rice", "Teriyaki sauce", "Avocado", "Edamame", "Sesame seeds", "Spring onions"],
    calories: 1340,
    totalTime: 30,
    cuisineType: ["Japanese"],
    mealType: ["lunch/dinner"],
    totalNutrients: { ENERC_KCAL: { label: "Energy", quantity: 1340, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 70, unit: "g" }, FAT: { label: "Fat", quantity: 50, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 120, unit: "g" } },
  },
  {
    uri: "mock_4_tacos",
    label: "Spicy Beef Tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    source: "Serious Eats",
    url: "https://example.com",
    yield: 4,
    dietLabels: ["Balanced"],
    healthLabels: ["Peanut-Free"],
    ingredientLines: ["500g ground beef", "8 taco shells", "1 onion", "Jalapeños", "Sour cream", "Cheddar cheese", "Lettuce", "Tomato salsa"],
    calories: 2100,
    totalTime: 25,
    cuisineType: ["Mexican"],
    mealType: ["lunch/dinner"],
    totalNutrients: { ENERC_KCAL: { label: "Energy", quantity: 2100, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 110, unit: "g" }, FAT: { label: "Fat", quantity: 100, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 140, unit: "g" } },
  },
  {
    uri: "mock_5_salad",
    label: "Mediterranean Quinoa Salad",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    source: "Minimalist Baker",
    url: "https://example.com",
    yield: 3,
    dietLabels: ["Low-Fat"],
    healthLabels: ["Vegan", "Gluten-Free"],
    ingredientLines: ["200g quinoa", "Cucumber", "Cherry tomatoes", "Kalamata olives", "Red onion", "Fresh herbs", "Lemon vinaigrette", "Feta cheese"],
    calories: 780,
    totalTime: 15,
    cuisineType: ["Mediterranean"],
    mealType: ["lunch/dinner"],
    totalNutrients: { ENERC_KCAL: { label: "Energy", quantity: 780, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 28, unit: "g" }, FAT: { label: "Fat", quantity: 25, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 100, unit: "g" } },
  },
  {
    uri: "mock_6_smoothie",
    label: "Tropical Mango Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
    source: "Love & Lemons",
    url: "https://example.com",
    yield: 1,
    dietLabels: ["Low-Fat"],
    healthLabels: ["Vegan", "Gluten-Free"],
    ingredientLines: ["1 frozen mango", "1 banana", "100ml coconut milk", "Granola", "Chia seeds", "Fresh berries", "Honey drizzle"],
    calories: 380,
    totalTime: 5,
    cuisineType: ["World"],
    mealType: ["breakfast"],
    totalNutrients: { ENERC_KCAL: { label: "Energy", quantity: 380, unit: "kcal" }, PROCNT: { label: "Protein", quantity: 8, unit: "g" }, FAT: { label: "Fat", quantity: 10, unit: "g" }, CHOCDF: { label: "Carbs", quantity: 65, unit: "g" } },
  },
];

function getMockResults(query: string): SearchResult {
  const filtered = query
    ? mockRecipes.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.ingredientLines.some((i) => i.toLowerCase().includes(query.toLowerCase())) ||
          r.cuisineType.some((c) => c.toLowerCase().includes(query.toLowerCase()))
      )
    : mockRecipes;

  const results = filtered.length > 0 ? filtered : mockRecipes;

  return {
    from: 0,
    to: results.length,
    count: results.length,
    _links: {},
    hits: results.map((recipe) => ({ recipe })),
  };
}
