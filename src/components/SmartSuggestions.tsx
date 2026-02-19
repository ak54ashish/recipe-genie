import { Sparkles, Zap, Dumbbell, Scale, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const combos = [
  { ingredients: "Tomato + Onion", suggestion: "Curries & Stews", query: "tomato onion curry" },
  { ingredients: "Bread + Potato", suggestion: "Sandwiches", query: "potato sandwich" },
  { ingredients: "Chicken + Rice", suggestion: "Biryani", query: "chicken rice biryani" },
  { ingredients: "Pasta + Cheese", suggestion: "Mac & Cheese", query: "pasta cheese" },
];

const SmartSuggestions = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const quickButtons = [
    { label: t.suggestions.lowBudget, icon: Wallet, query: "budget meal", color: "from-emerald-500 to-teal-600" },
    { label: t.suggestions.highProtein, icon: Dumbbell, query: "high protein", color: "from-blue-500 to-indigo-600" },
    { label: t.suggestions.weightLoss, icon: Scale, query: "low calorie salad", color: "from-purple-500 to-pink-600" },
    { label: t.suggestions.muscleGain, icon: Zap, query: "protein muscle meal", color: "from-orange-500 to-red-600" },
  ];

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-body font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {t.home.smartTitle}
          </h2>
          <p className="text-muted-foreground font-body">{t.home.smartSubtitle}</p>
        </div>

        {/* Combo suggestions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {combos.map((combo) => (
            <button
              key={combo.query}
              onClick={() => handleSearch(combo.query)}
              className="group bg-card border border-border rounded-xl p-4 text-left hover:shadow-card-hover hover:border-accent/30 transition-all duration-300"
            >
              <p className="text-xs text-muted-foreground font-body mb-1">{combo.ingredients}</p>
              <p className="font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                {combo.suggestion}
              </p>
            </button>
          ))}
        </div>

        {/* Quick goal buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickButtons.map((btn) => (
            <button
              key={btn.query}
              onClick={() => handleSearch(btn.query)}
              className={`group relative overflow-hidden rounded-xl p-4 sm:p-5 text-white font-body font-semibold text-sm bg-gradient-to-br ${btn.color} hover:shadow-elevated transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              <btn.icon className="w-5 h-5 mb-2" />
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartSuggestions;
