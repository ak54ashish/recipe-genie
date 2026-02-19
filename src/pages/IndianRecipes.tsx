import { useState } from "react";
import { Leaf, Drumstick, Cookie, MapPin, Coffee, ChevronDown, Clock, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { indianRecipes, filterIndianRecipes, type IndianCategory, type IndianRecipe } from "@/data/indianRecipes";

const categories: { key: IndianCategory; labelEn: string; labelHi: string; icon: typeof Leaf }[] = [
  { key: "all", labelEn: "All", labelHi: "सभी", icon: Cookie },
  { key: "veg", labelEn: "Veg", labelHi: "शाकाहारी", icon: Leaf },
  { key: "non-veg", labelEn: "Non-Veg", labelHi: "मांसाहारी", icon: Drumstick },
  { key: "snacks", labelEn: "Snacks", labelHi: "स्नैक्स", icon: Cookie },
  { key: "north-indian", labelEn: "North Indian", labelHi: "उत्तर भारतीय", icon: MapPin },
  { key: "south-indian", labelEn: "South Indian", labelHi: "दक्षिण भारतीय", icon: MapPin },
  { key: "drinks", labelEn: "Drinks", labelHi: "पेय", icon: Coffee },
];

const IndianRecipes = () => {
  const { lang, t } = useLanguage();
  const [active, setActive] = useState<IndianCategory>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<IndianRecipe | null>(null);

  const filtered = filterIndianRecipes(indianRecipes, active);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-amber-600 to-orange-500 p-8 sm:p-12 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            {lang === "hi" ? "🇮🇳 भारतीय व्यंजन" : "🇮🇳 Indian Cuisine"}
          </h1>
          <p className="text-white/90 font-body text-base sm:text-lg max-w-xl">
            {lang === "hi"
              ? "स्नैक्स, मुख्य व्यंजन और पेय — सब एक जगह, सामग्री के साथ।"
              : "Snacks, main dishes & drinks — all in one place with full ingredients."}
          </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(({ key, labelEn, labelHi, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
              active === key
                ? key === "veg"
                  ? "bg-emerald-600 text-white shadow-md"
                  : key === "non-veg"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <Icon className="w-4 h-4" />
            {lang === "hi" ? labelHi : labelEn}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-muted-foreground font-body mb-6">
        {lang === "hi"
          ? `${filtered.length} व्यंजन मिले`
          : `Showing ${filtered.length} recipes`}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((recipe, i) => (
          <div
            key={recipe.id}
            className="group bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer"
            style={{ animationDelay: `${i * 50}ms` }}
            onClick={() => setSelectedRecipe(recipe)}
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Region badge */}
              <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {recipe.region}
              </span>
              {/* Veg/Non-Veg badge */}
              <span
                className={`absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  recipe.category === "veg"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${recipe.category === "veg" ? "bg-emerald-500" : "bg-red-500"}`} />
                {recipe.category === "veg" ? (lang === "hi" ? "शाकाहारी" : "Veg") : (lang === "hi" ? "मांसाहारी" : "Non-Veg")}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-display text-lg font-semibold text-card-foreground leading-snug mb-1">
                {lang === "hi" ? recipe.nameHi : recipe.name}
              </h3>
              <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-3">
                {lang === "hi" ? recipe.descriptionHi : recipe.description}
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                {recipe.cookingTime > 0 && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.cookingTime} min
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                  {recipe.type === "snack"
                    ? lang === "hi" ? "स्नैक" : "Snack"
                    : recipe.type === "drink"
                    ? lang === "hi" ? "पेय" : "Drink"
                    : lang === "hi" ? "मुख्य" : "Main"}
                </span>
              </div>
              <button className="mt-3 text-xs text-accent font-body font-medium flex items-center gap-1 hover:underline">
                <ChevronDown className="w-3 h-3" />
                {lang === "hi" ? "सामग्री देखें" : "View Ingredients"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ingredient Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-card rounded-2xl shadow-elevated max-w-lg w-full max-h-[85vh] overflow-y-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full aspect-video object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-card transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              {/* Badges on modal image */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className="bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  {selectedRecipe.region}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    selectedRecipe.category === "veg"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${selectedRecipe.category === "veg" ? "bg-emerald-500" : "bg-red-500"}`} />
                  {selectedRecipe.category === "veg" ? "Veg" : "Non-Veg"}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                {lang === "hi" ? selectedRecipe.nameHi : selectedRecipe.name}
              </h2>
              <p className="text-muted-foreground font-body mb-4">
                {lang === "hi" ? selectedRecipe.descriptionHi : selectedRecipe.description}
              </p>

              {selectedRecipe.cookingTime > 0 && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4 text-accent" />
                  {selectedRecipe.cookingTime} {lang === "hi" ? "मिनट" : "min"}
                </div>
              )}

              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {lang === "hi" ? "सामग्री" : "Ingredients"}
              </h3>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm font-body text-card-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndianRecipes;
