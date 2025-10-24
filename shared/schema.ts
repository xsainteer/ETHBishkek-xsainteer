import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ipAssets = pgTable("ip_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "patent", "copyright", "trademark"
  tokenId: text("token_id"),
  status: text("status").notNull().default("pending"), // "pending", "processing", "minted", "failed"
  txHash: text("tx_hash"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertIpAssetSchema = createInsertSchema(ipAssets).omit({
  id: true,
  createdAt: true,
  tokenId: true,
  txHash: true,
});

export type InsertIpAsset = z.infer<typeof insertIpAssetSchema>;
export type IpAsset = typeof ipAssets.$inferSelect;
