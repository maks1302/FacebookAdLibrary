
import { searchHistory, type SearchHistory, type InsertSearchHistory } from "@shared/schema";
import { sql } from 'drizzle-orm';
import { db } from './db';

export interface IStorage {
  createSearchHistory(search: InsertSearchHistory): Promise<SearchHistory>;
  getSearchHistory(): Promise<SearchHistory[]>;
}

export class MemStorage implements IStorage {
  private searches: SearchHistory[];
  private currentId: number;

  constructor() {
    this.searches = [];
    this.currentId = 1;
  }

  async createSearchHistory(search: InsertSearchHistory): Promise<SearchHistory> {
    const newSearch: SearchHistory = {
      id: this.currentId++,
      ...search,
      timestamp: new Date(),
    };
    this.searches.push(newSearch);
    return newSearch;
  }

  async getSearchHistory(): Promise<SearchHistory[]> {
    return this.searches;
  }
}

export const storage = new MemStorage();

export async function getPopularSearches() {
  const result = await db.select({
    searchTerms: searchHistory.searchTerms,
    count: sql`count(*)`.as('count')
  })
  .from(searchHistory)
  .groupBy(searchHistory.searchTerms)
  .orderBy(sql`count(*) DESC`)
  .limit(5);

  return result.map(r => r.searchTerms);
}

export async function searchAds(params: any) {
  // Store search history
  await storage.createSearchHistory({
    searchTerms: params.search_terms,
    adType: params.ad_type,
    countries: params.country
  });
  
  return params;
}
