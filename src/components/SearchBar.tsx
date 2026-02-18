import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  size?: "lg" | "md";
}

const SearchBar = ({ onSearch, initialQuery = "", size = "md" }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const isLarge = size === "lg";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div
        className={`flex items-center gap-2 bg-card border border-border rounded-full shadow-card transition-shadow focus-within:shadow-card-hover ${
          isLarge ? "px-6 py-4" : "px-4 py-2.5"
        }`}
      >
        <Search className={`text-muted-foreground shrink-0 ${isLarge ? "w-6 h-6" : "w-5 h-5"}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ingredient... e.g. chicken, rice, tomato"
          className={`flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-body ${
            isLarge ? "text-lg" : "text-base"
          }`}
        />
        <button
          type="submit"
          className={`bg-primary text-primary-foreground font-body font-semibold rounded-full transition-all hover:opacity-90 active:scale-95 ${
            isLarge ? "px-7 py-2.5 text-base" : "px-5 py-2 text-sm"
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
