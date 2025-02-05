import { Home, Grid, Bookmark } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-footer border-t border-gray-700">
      <div className="max-w-md mx-auto">
        {/* Navigation links */}
        <div className="flex justify-around py-4">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 ${
              isActive("/") ? "text-primary" : "text-gray-400"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/categories"
            className={`flex flex-col items-center gap-1 ${
              isActive("/categories") ? "text-primary" : "text-gray-400"
            }`}
          >
            <Grid className="h-5 w-5" />
            <span className="text-xs">Categories</span>
          </Link>
          <Link
            to="/favorites"
            className={`flex flex-col items-center gap-1 ${
              isActive("/favorites") ? "text-primary" : "text-gray-400"
            }`}
          >
            <Bookmark className="h-5 w-5" />
            <span className="text-xs">Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}