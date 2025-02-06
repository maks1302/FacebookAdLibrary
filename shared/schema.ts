import { pgTable, text, serial, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  searchTerms: text("search_terms").notNull(),
  adType: text("ad_type").notNull(),
  countries: text("countries").array().notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull()
});

export const insertSearchHistorySchema = createInsertSchema(searchHistory).omit({ 
  id: true,
  timestamp: true 
});

export type InsertSearchHistory = z.infer<typeof insertSearchHistorySchema>;
export type SearchHistory = typeof searchHistory.$inferSelect;
