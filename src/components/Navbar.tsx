import { Link, useLocation } from "react-router-dom";
import { Heart, ChefHat } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <ChefHat className="w-7 h-7 text-accent transition-transform group-hover:rotate-12" />
          <span className="font-display text-xl font-bold text-foreground">
            Recipe<span className="text-accent">Finder</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-colors ${
              isActive("/")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-colors flex items-center gap-1.5 ${
              isActive("/favorites")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Heart className="w-4 h-4" />
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
