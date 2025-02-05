import { Quote } from "@/lib/quotes";
import { Heart, Copy, Download, Share2, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { toast } from "sonner";

interface QuoteCardProps {
  quote: Quote;
  onPrevious?: () => void;
  onNext?: () => void;
  onToggleFavorite: (quote: Quote) => void;
  isFavorite: boolean;
}

export function QuoteCard({ quote, onPrevious, onNext, onToggleFavorite, isFavorite }: QuoteCardProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      toast.success("Quote copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy quote");
    }
  };

  const downloadQuote = () => {
    const element = document.createElement("a");
    const file = new Blob([`"${quote.text}" - ${quote.author}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `quote-${quote.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Quote downloaded successfully!");
  };

  const shareQuote = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share Quote",
          text: `"${quote.text}" - ${quote.author}`,
        });
        toast.success("Quote shared successfully!");
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error("Error sharing quote");
        }
      }
    } else {
      await copyToClipboard();
      toast.success("Quote copied to clipboard (sharing not supported)");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 relative">
      <div className="flex gap-2 mb-6 flex-wrap">
        {quote.categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
        <Badge variant="outline">{quote.language}</Badge>
      </div>

      <blockquote className="text-2xl font-serif text-center mb-6 italic">
        "{quote.text}"
      </blockquote>

      <p className="text-center text-gray-600 mb-8">- {quote.author}</p>

      <div className="flex justify-center gap-4">
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onToggleFavorite(quote)}
          className={isFavorite ? "text-red-500" : ""}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
        <Button variant="outline" size="icon" onClick={downloadQuote}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={shareQuote}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {(onPrevious || onNext) && (
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="rounded-full"
            disabled={!onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="rounded-full"
            disabled={!onNext}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
}