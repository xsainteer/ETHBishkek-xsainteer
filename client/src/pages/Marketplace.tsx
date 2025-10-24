import { useState } from "react";
import Navigation from "@/components/Navigation";
import MarketplaceCard from "@/components/MarketplaceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

// todo: remove mock functionality
const mockListings = [
  {
    id: "1",
    name: "Advanced Neural Network Architecture",
    description: "Revolutionary deep learning architecture for real-time image processing with 99.8% accuracy",
    type: "patent" as const,
    tokenId: "7801",
    price: "2.5",
    priceUsd: "4,250",
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    listedDate: new Date('2025-03-10'),
    views: 342,
  },
  {
    id: "2",
    name: "Quantum Encryption Algorithm",
    description: "Post-quantum cryptographic method resistant to quantum computing attacks",
    type: "patent" as const,
    tokenId: "7802",
    price: "5.8",
    priceUsd: "9,860",
    seller: "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
    listedDate: new Date('2025-03-12'),
    views: 891,
  },
  {
    id: "3",
    name: "Sustainable Energy Storage System",
    description: "High-capacity battery technology using eco-friendly materials with 10x efficiency",
    type: "patent" as const,
    tokenId: "7803",
    price: "12.0",
    priceUsd: "20,400",
    seller: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    listedDate: new Date('2025-03-08'),
    views: 1247,
  },
  {
    id: "4",
    name: "Biodegradable Plastic Composite",
    description: "Novel polymer that decomposes in 90 days while maintaining structural integrity",
    type: "patent" as const,
    tokenId: "7804",
    price: "3.2",
    priceUsd: "5,440",
    seller: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
    listedDate: new Date('2025-03-15'),
    views: 567,
  },
  {
    id: "5",
    name: "Autonomous Navigation System",
    description: "Self-driving vehicle AI with enhanced obstacle detection and path optimization",
    type: "patent" as const,
    tokenId: "7805",
    price: "8.5",
    priceUsd: "14,450",
    seller: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
    listedDate: new Date('2025-03-05'),
    views: 2103,
  },
  {
    id: "6",
    name: "Medical Diagnostic AI",
    description: "Machine learning model for early disease detection with 97% precision",
    type: "patent" as const,
    tokenId: "7806",
    price: "15.0",
    priceUsd: "25,500",
    seller: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
    listedDate: new Date('2025-03-18'),
    views: 1876,
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || listing.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "recent":
      default:
        return b.listedDate.getTime() - a.listedDate.getTime();
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">IP Marketplace</h1>
            <p className="text-muted-foreground text-lg">
              Discover and purchase tokenized intellectual property
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search patents, algorithms, inventions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]" data-testid="select-type-filter">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="patent">Patents</SelectItem>
                    <SelectItem value="copyright">Copyrights</SelectItem>
                    <SelectItem value="trademark">Trademarks</SelectItem>
                    <SelectItem value="trade-secret">Trade Secrets</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]" data-testid="select-sort">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p data-testid="text-results-count">
                {sortedListings.length} {sortedListings.length === 1 ? 'result' : 'results'}
              </p>
            </div>
          </div>

          {sortedListings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No patents found matching your criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedListings.map((listing) => (
                <MarketplaceCard key={listing.id} {...listing} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
