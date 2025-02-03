import { useState } from "react";
import { quotes } from "@/lib/quotes";
import { QuoteCard } from "@/components/QuoteCard";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Shuffle, Quote } from "lucide-react";

const Index = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const currentQuote = quotes[currentQuoteIndex];

  const shuffleQuote = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex);
    setCurrentQuoteIndex(newIndex);
  };

  const handlePrevious = () => {
    setCurrentQuoteIndex((prev) => (prev > 0 ? prev - 1 : quotes.length - 1));
  };

  const handleNext = () => {
    setCurrentQuoteIndex((prev) => (prev < quotes.length - 1 ? prev + 1 : 0));
  };

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
      <div className="flex items-center p-4 border-b border-gray-700">
        <Quote className="h-6 w-6 text-primary mr-2" />
        <span className="text-lg font-semibold text-white">Quote Generator</span>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          Discover Quotes That Inspire
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Find and share quotes that resonate with you
        </p>

        <div className="flex justify-center mb-8">
          <Button onClick={shuffleQuote} className="gap-2">
            <Shuffle className="h-4 w-4" />
            Shuffle Quotes
          </Button>
        </div>

        <QuoteCard
          quote={currentQuote}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(currentQuote.id)}
        />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;