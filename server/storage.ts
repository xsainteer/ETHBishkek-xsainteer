import { type IpAsset, type InsertIpAsset } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getIpAsset(id: string): Promise<IpAsset | undefined>;
  getAllIpAssets(): Promise<IpAsset[]>;
  createIpAsset(asset: InsertIpAsset): Promise<IpAsset>;
  updateIpAssetStatus(id: string, status: string, txHash?: string, tokenId?: string): Promise<IpAsset | undefined>;
}

export class MemStorage implements IStorage {
  private ipAssets: Map<string, IpAsset>;

  constructor() {
    this.ipAssets = new Map();
  }

  async getIpAsset(id: string): Promise<IpAsset | undefined> {
    return this.ipAssets.get(id);
  }

  async getAllIpAssets(): Promise<IpAsset[]> {
    return Array.from(this.ipAssets.values());
  }

  async createIpAsset(insertAsset: InsertIpAsset): Promise<IpAsset> {
    const id = randomUUID();
    const asset: IpAsset = { 
      ...insertAsset, 
      id,
      status: insertAsset.status || "pending",
      tokenId: null,
      txHash: null,
      createdAt: new Date(),
    };
    this.ipAssets.set(id, asset);
    return asset;
  }

  async updateIpAssetStatus(
    id: string, 
    status: string, 
    txHash?: string,
    tokenId?: string
  ): Promise<IpAsset | undefined> {
    const asset = this.ipAssets.get(id);
    if (!asset) return undefined;
    
    const updatedAsset = { 
      ...asset, 
      status, 
      txHash: txHash || asset.txHash,
      tokenId: tokenId || asset.tokenId,
    };
    this.ipAssets.set(id, updatedAsset);
    return updatedAsset;
  }
}

export const storage = new MemStorage();
