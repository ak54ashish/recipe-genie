import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, ChefHat, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
          <ChefHat className="w-7 h-7 text-accent transition-transform group-hover:rotate-12" />
          <span className="font-display text-xl font-bold text-foreground">
            Recipe<span className="text-accent">Finder</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
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

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border bg-card/95 backdrop-blur-md ${
          menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          <Link
            to="/"
            onClick={closeMenu}
            className={`px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${
              isActive("/")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            onClick={closeMenu}
            className={`px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-colors flex items-center gap-1.5 ${
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
