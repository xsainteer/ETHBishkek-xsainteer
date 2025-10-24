import IPAssetCard from '../IPAssetCard';

export default function IPAssetCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <IPAssetCard
        name="Revolutionary AI Algorithm"
        type="patent"
        tokenId="1001"
        createdAt={new Date('2025-01-15')}
        description="A novel machine learning algorithm for real-time data processing"
      />
      <IPAssetCard
        name="Original Music Composition"
        type="copyright"
        tokenId="2047"
        createdAt={new Date('2025-02-10')}
        description="Symphony No. 5 in Digital Minor"
      />
      <IPAssetCard
        name="Brand Logo Design"
        type="trademark"
        tokenId="3892"
        createdAt={new Date('2025-03-01')}
        description="Distinctive brand identity and visual elements"
      />
    </div>
  );
}
