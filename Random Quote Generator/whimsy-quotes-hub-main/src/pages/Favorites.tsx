import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { quotes } from "@/lib/quotes";
import { QuoteCard } from "@/components/QuoteCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const favoriteQuotes = quotes.filter((quote) => favorites.includes(quote.id));

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
        <h1 className="text-4xl font-bold text-center mb-2">
          Your Favorite Quotes
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your personally curated collection of inspiring quotes
        </p>

        {favoriteQuotes.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">No quotes found.</p>
        ) : (
          <div className="space-y-8">
            {favoriteQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onToggleFavorite={toggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Favorites;