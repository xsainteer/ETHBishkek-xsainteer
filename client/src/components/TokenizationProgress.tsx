import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type TokenizationStatus = "processing" | "minting" | "complete" | "error";

interface TokenizationProgressProps {
  ipName?: string;
}

export default function TokenizationProgress({ ipName = "My Intellectual Property" }: TokenizationProgressProps) {
  // todo: remove mock functionality
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<TokenizationStatus>("processing");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const newProgress = prev + 10;
        
        if (newProgress >= 30 && status === "processing") {
          setStatus("minting");
        }
        
        if (newProgress >= 100) {
          setStatus("complete");
          setTxHash("0x" + Math.random().toString(16).substring(2, 66));
        }
        
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [status]);

  const getStatusIcon = () => {
    switch (status) {
      case "processing":
      case "minting":
        return <Loader2 className="w-6 h-6 animate-spin text-chart-1" />;
      case "complete":
        return <CheckCircle2 className="w-6 h-6 text-status-online" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary" data-testid="badge-status">Processing</Badge>;
      case "minting":
        return <Badge className="bg-chart-1 text-white" data-testid="badge-status">Minting NFT</Badge>;
      case "complete":
        return <Badge className="bg-status-online text-white" data-testid="badge-status">Complete</Badge>;
      case "error":
        return <Badge variant="destructive" data-testid="badge-status">Error</Badge>;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-8">
      <div className="flex items-start gap-4 mb-6">
        {getStatusIcon()}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2" data-testid="text-ip-name">{ipName}</h3>
          {getStatusBadge()}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Tokenization Progress</span>
            <span className="font-medium" data-testid="text-progress">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-status-online" />
            <span>IP metadata uploaded</span>
          </div>
          <div className={`flex items-center gap-2 ${progress >= 30 ? 'text-foreground' : 'text-muted-foreground'}`}>
            {progress >= 30 ? (
              <CheckCircle2 className="w-4 h-4 text-status-online" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
            )}
            <span>Smart contract deployment</span>
          </div>
          <div className={`flex items-center gap-2 ${progress >= 100 ? 'text-foreground' : 'text-muted-foreground'}`}>
            {progress >= 100 ? (
              <CheckCircle2 className="w-4 h-4 text-status-online" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-muted"></div>
            )}
            <span>NFT minting complete</span>
          </div>
        </div>
        
        {status === "complete" && txHash && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Transaction Hash</p>
            <p className="font-mono text-sm break-all" data-testid="text-tx-hash">{txHash}</p>
          </div>
        )}
        
        {status === "complete" && (
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold text-status-online mb-2">🎉 Tokenization Complete!</p>
            <p className="text-sm text-muted-foreground">
              Your IP has been successfully tokenized and is now on the blockchain
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
