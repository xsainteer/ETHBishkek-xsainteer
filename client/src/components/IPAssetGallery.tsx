import IPAssetCard from "./IPAssetCard";

// todo: remove mock functionality
const mockAssets = [
  {
    id: "1",
    name: "Revolutionary AI Algorithm",
    type: "patent" as const,
    tokenId: "1001",
    createdAt: new Date('2025-01-15'),
    description: "A novel machine learning algorithm for real-time data processing",
  },
  {
    id: "2",
    name: "Original Music Composition",
    type: "copyright" as const,
    tokenId: "2047",
    createdAt: new Date('2025-02-10'),
    description: "Symphony No. 5 in Digital Minor",
  },
  {
    id: "3",
    name: "Brand Logo Design",
    type: "trademark" as const,
    tokenId: "3892",
    createdAt: new Date('2025-03-01'),
    description: "Distinctive brand identity and visual elements",
  },
  {
    id: "4",
    name: "Proprietary Manufacturing Process",
    type: "trade-secret" as const,
    tokenId: "4521",
    createdAt: new Date('2025-01-20'),
    description: "Unique production methodology for sustainable materials",
  },
  {
    id: "5",
    name: "Software Source Code",
    type: "copyright" as const,
    tokenId: "5103",
    createdAt: new Date('2025-02-28'),
    description: "Full-stack web application framework",
  },
  {
    id: "6",
    name: "Innovative Drug Formula",
    type: "patent" as const,
    tokenId: "6789",
    createdAt: new Date('2025-03-15'),
    description: "Novel pharmaceutical compound for pain management",
  },
];

export default function IPAssetGallery() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">My Tokenized Assets</h2>
          <p className="text-muted-foreground">
            {mockAssets.length} intellectual properties secured on the blockchain
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockAssets.map((asset) => (
            <IPAssetCard
              key={asset.id}
              name={asset.name}
              type={asset.type}
              tokenId={asset.tokenId}
              createdAt={asset.createdAt}
              description={asset.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
