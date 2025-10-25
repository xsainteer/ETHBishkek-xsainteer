export interface PatentDTOParams {
  descriptionHash: string;
  docsHash: string;
  shareName: string;
  shareSymbol: string;
  totalShares: number | bigint;
  sharePriceWei: bigint;
  royaltyBps: number;
}

export class PatentDTO {
  descriptionHash: string;
  docsHash: string;
  shareName: string;
  shareSymbol: string;
  totalShares: number | bigint;
  sharePriceWei: bigint;
  royaltyBps: number;

  constructor({
    descriptionHash,
    docsHash,
    shareName,
    shareSymbol,
    totalShares,
    sharePriceWei,
    royaltyBps,
  }: PatentDTOParams) {
    this.descriptionHash = descriptionHash;
    this.docsHash = docsHash;
    this.shareName = shareName;
    this.shareSymbol = shareSymbol;
    this.totalShares = totalShares;
    this.sharePriceWei = sharePriceWei;
    this.royaltyBps = royaltyBps;
  }
}
