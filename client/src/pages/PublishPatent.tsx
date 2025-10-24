import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PublishPatent() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    price: "",
    royaltyPercentage: "",
    tokenId: "",
  });
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);

    // todo: remove mock functionality
    console.log('Publishing patent for sale:', formData);

    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      toast({
        title: "Patent Listed Successfully",
        description: "Your patent is now available on the marketplace",
      });
    }, 2000);
  };

  if (isPublished) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-status-online/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-status-online" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Patent Published!</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your patent "{formData.name}" is now live on the marketplace and available for purchase.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/marketplace'}
                  data-testid="button-view-marketplace"
                >
                  View in Marketplace
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsPublished(false);
                    setFormData({
                      name: "",
                      description: "",
                      type: "",
                      price: "",
                      royaltyPercentage: "",
                      tokenId: "",
                    });
                  }}
                  data-testid="button-publish-another"
                >
                  Publish Another
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Publish Your Patent</h1>
            <p className="text-muted-foreground text-lg">
              List your tokenized patent on the marketplace for sale
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patent-name">Patent Name *</Label>
                <Input
                  id="patent-name"
                  placeholder="Enter the name of your patent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="input-patent-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patent-type">Patent Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="patent-type" data-testid="select-patent-type">
                    <SelectValue placeholder="Select patent type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patent">Patent</SelectItem>
                    <SelectItem value="copyright">Copyright</SelectItem>
                    <SelectItem value="trademark">Trademark</SelectItem>
                    <SelectItem value="trade-secret">Trade Secret</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="token-id">Token ID *</Label>
                <Input
                  id="token-id"
                  placeholder="Your existing token ID (e.g., #1001)"
                  value={formData.tokenId}
                  onChange={(e) => setFormData({ ...formData, tokenId: e.target.value })}
                  required
                  data-testid="input-token-id"
                />
                <p className="text-xs text-muted-foreground">
                  Only tokenized IP can be listed. Tokenize your IP first from the Dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of your patent and its applications"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  required
                  data-testid="input-description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Sale Price (ETH) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    data-testid="input-price"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="royalty">Royalty Percentage (Optional)</Label>
                  <Input
                    id="royalty"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    value={formData.royaltyPercentage}
                    onChange={(e) => setFormData({ ...formData, royaltyPercentage: e.target.value })}
                    data-testid="input-royalty"
                  />
                  <p className="text-xs text-muted-foreground">
                    Percentage of future resales you'll receive
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Supporting Documents</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate cursor-pointer transition-colors">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload patent documentation, diagrams, or specifications
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOC, or images (max 10MB each)
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    multiple
                    data-testid="input-file-upload"
                  />
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Listing Fee</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Platform Fee (2.5%)</span>
                    <span className="font-mono">
                      {formData.price ? (parseFloat(formData.price) * 0.025).toFixed(4) : '0.00'} ETH
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span className="font-semibold">You'll Receive</span>
                    <span className="font-mono font-bold">
                      {formData.price ? (parseFloat(formData.price) * 0.975).toFixed(4) : '0.00'} ETH
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPublishing || !formData.name || !formData.type || !formData.description || !formData.price || !formData.tokenId}
                  data-testid="button-publish"
                >
                  {isPublishing ? (
                    <>
                      <FileText className="w-4 h-4 mr-2 animate-pulse" />
                      Publishing to Marketplace...
                    </>
                  ) : (
                    "Publish to Marketplace"
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
