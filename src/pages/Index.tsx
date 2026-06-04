import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChefHat, Utensils, Salad, Soup } from "lucide-react";
import SearchBar from "@/components/SearchBar";

const popularSearches: { name: string; image: string }[] = [
  { name: "Chicken", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop" },
  { name: "Pasta", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop" },
  { name: "Salmon", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=400&fit=crop" },
  { name: "Vegan", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop" },
  { name: "Salad", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop" },
  { name: "Tacos", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop" },
];

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-accent/10">
            <Utensils className="w-32 h-32 rotate-12" />
          </div>
          <div className="absolute bottom-20 right-10 text-primary/10">
            <Salad className="w-40 h-40 -rotate-12" />
          </div>
          <div className="absolute top-40 right-1/4 text-accent/5">
            <Soup className="w-24 h-24 rotate-45" />
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-body font-medium mb-6">
            <ChefHat className="w-4 h-4" />
            Discover delicious recipes
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
            What's in your
            <br />
            <span className="text-accent">kitchen?</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto font-body">
            Search thousands of recipes by ingredient. Find your next favorite meal in seconds.
          </p>

          <SearchBar onSearch={handleSearch} size="lg" />

          {/* Popular searches */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground font-body">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handleSearch(term)}
                className="text-sm bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full font-body font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
