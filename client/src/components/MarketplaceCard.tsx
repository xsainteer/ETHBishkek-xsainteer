import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, TrendingUp } from "lucide-react";
import { format } from "date-fns";

interface MarketplaceCardProps {
  id: string;
  name: string;
  description: string;
  type: "patent" | "copyright" | "trademark" | "trade-secret";
  tokenId: string;
  price: string;
  priceUsd: string;
  seller: string;
  listedDate: Date;
  views?: number;
}

export default function MarketplaceCard({
  id,
  name,
  description,
  type,
  tokenId,
  price,
  priceUsd,
  seller,
  listedDate,
  views = 0,
}: MarketplaceCardProps) {
  const typeColors = {
    patent: "bg-chart-1 text-white",
    copyright: "bg-chart-2 text-white",
    trademark: "bg-chart-3 text-white",
    "trade-secret": "bg-chart-4 text-white",
  };

  const typeLabels = {
    patent: "Patent",
    copyright: "Copyright",
    trademark: "Trademark",
    "trade-secret": "Trade Secret",
  };

  return (
    <Card className="p-6 hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer">
      <div className="aspect-video bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl mb-2">
            {type === "patent" && "📜"}
            {type === "copyright" && "©"}
            {type === "trademark" && "™"}
            {type === "trade-secret" && "🔒"}
          </div>
          <Badge className={typeColors[type]}>{typeLabels[type]}</Badge>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1" data-testid="text-patent-name">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm border-t pt-3">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Price</p>
            <p className="font-bold text-lg gradient-text" data-testid="text-price">
              {price} ETH
            </p>
            <p className="text-xs text-muted-foreground">${priceUsd}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs mb-1">Token ID</p>
            <p className="font-mono text-xs">#{tokenId}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{format(listedDate, "MMM d")}</span>
            </div>
          </div>
          <p className="font-mono text-xs">
            {seller.substring(0, 6)}...{seller.substring(38)}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            className="flex-1 gap-2"
            data-testid={`button-buy-${id}`}
            onClick={() => console.log('Buy patent:', id)}
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </Button>
          <Button
            variant="outline"
            data-testid={`button-view-${id}`}
            onClick={() => console.log('View details:', id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
