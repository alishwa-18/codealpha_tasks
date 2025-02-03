import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { categories, quotes } from "@/lib/quotes";
import { Button } from "@/components/ui/button";
import { QuoteCard } from "@/components/QuoteCard";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const filteredQuotes = quotes.filter(
    (quote) =>
      selectedCategory === "All" || quote.categories.includes(selectedCategory)
  );

  const toggleFavorite = (quote: typeof quotes[0]) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(quote.id)
        ? prev.filter((id) => id !== quote.id)
        : [...prev, quote.id];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="w-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredQuotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(quote.id)}
            />
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Categories;