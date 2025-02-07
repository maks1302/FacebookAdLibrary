import { searchHistory, type SearchHistory, type InsertSearchHistory } from "@shared/schema";

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
