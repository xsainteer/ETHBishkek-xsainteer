import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Share2, Send } from "lucide-react";
import { format } from "date-fns";

interface IPAssetCardProps {
  name: string;
  type: "patent" | "copyright" | "trademark" | "trade-secret";
  tokenId: string;
  createdAt: Date;
  description?: string;
}

export default function IPAssetCard({ 
  name, 
  type, 
  tokenId, 
  createdAt,
  description 
}: IPAssetCardProps) {
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
    <Card className="p-6 hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer group">
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
          <h3 className="font-semibold text-lg mb-1 line-clamp-1" data-testid="text-asset-name">
            {name}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Token ID</p>
            <p className="font-mono text-xs" data-testid="text-token-id">#{tokenId}</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-xs mb-1">Created</p>
            <p className="text-xs">{format(createdAt, "MMM d, yyyy")}</p>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 gap-2"
            data-testid="button-view-details"
            onClick={() => console.log('View details:', tokenId)}
          >
            <ExternalLink className="w-3 h-3" />
            View
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            data-testid="button-share"
            onClick={() => console.log('Share:', tokenId)}
          >
            <Share2 className="w-3 h-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            data-testid="button-transfer"
            onClick={() => console.log('Transfer:', tokenId)}
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
