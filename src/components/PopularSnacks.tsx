import { Cookie } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { VEG_SNACK_KEYWORDS, NON_VEG_SNACK_KEYWORDS } from "@/utils/dietFilter";

const PopularSnacks = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="py-12 sm:py-16 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-body font-medium mb-4">
            <Cookie className="w-4 h-4" />
            {t.filters.snacks}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {t.home.snacksTitle}
          </h2>
          <p className="text-muted-foreground font-body">{t.home.snacksSubtitle}</p>
        </div>

        {/* Veg Snacks */}
        <div className="mb-6">
          <h3 className="font-body text-sm font-semibold text-emerald-600 mb-3 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            {t.badges.veg}
          </h3>
          <div className="flex flex-wrap gap-2">
            {VEG_SNACK_KEYWORDS.map((snack) => (
              <button
                key={snack}
                onClick={() => handleSearch(snack)}
                className="bg-card border border-border text-foreground px-4 py-2 rounded-full text-sm font-body font-medium hover:bg-emerald-50 hover:border-emerald-300 dark:hover:bg-emerald-900/20 transition-all duration-200"
              >
                {snack}
              </button>
            ))}
          </div>
        </div>

        {/* Non-Veg Snacks */}
        <div>
          <h3 className="font-body text-sm font-semibold text-red-600 mb-3 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            {t.badges.nonVeg}
          </h3>
          <div className="flex flex-wrap gap-2">
            {NON_VEG_SNACK_KEYWORDS.map((snack) => (
              <button
                key={snack}
                onClick={() => handleSearch(snack)}
                className="bg-card border border-border text-foreground px-4 py-2 rounded-full text-sm font-body font-medium hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                {snack}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularSnacks;
