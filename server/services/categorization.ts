import { GoogleGenerativeAI } from "@google/generative-ai";

export const CATEGORIES = [
  "All",
  "E-Commerce & Online Shopping",
  "Health & Wellness",
  "Beauty & Personal Care",
  "Fashion & Accessories",
  "Home & Living",
  "Parenting & Baby Products",
  "Pets & Animal Care",
  "Technology & Gadgets",
  "Finance & Investing",
  "Education & Online Learning",
  "Business & Entrepreneurship",
  "Relationships & Dating",
  "Self-Improvement & Motivation",
  "Travel & Tourism",
  "Food & Cooking",
  "Automotive & Transportation",
  "Outdoor & Adventure",
  "Entertainment & Pop Culture",
  "Legal & Consulting Services",
  "Events & Experiences",
  "Others",
] as const;

export type Category = typeof CATEGORIES[number];

interface AdContent {
  page_name: string;
  ad_creative_bodies: string[];
  ad_creative_link_captions: string[];
  ad_creative_link_titles: string[];
}

const MAX_CHARS = 800;

export class CategorizationService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  private formatAdContent(ad: AdContent): string {
    const parts = [
      `page_name: ${ad.page_name}`,
      `ad_creative_bodies: ${ad.ad_creative_bodies.join(" ")}`,
      `ad_creative_link_captions: ${ad.ad_creative_link_captions.join(" ")}`,
      `ad_creative_link_titles: ${ad.ad_creative_link_titles.join(" ")}`,
    ];

    let content = parts.join("\n").trim();
    if (content.length > MAX_CHARS) {
      content = content.substring(0, MAX_CHARS) + "...";
    }
    return content;
  }

  private buildPrompt(ads: AdContent[]): string {
    const categoriesList = CATEGORIES.join("\n");
    const formattedAds = ads.map((ad, i) => 
      `#${i + 1} ad: ${this.formatAdContent(ad)}`
    ).join("\n\n");

    return `There are parsed ads from facebook. And I need you to categorize given ads into following categories. One ad can fall into few categories.

${categoriesList}

${formattedAds}

Respond in the following format for each ad:
#1: Category1, Category2
#2: Category1
...
Only include the ad number and categories, nothing else.`;
  }

  private parseResponse(response: string): Map<number, Category[]> {
    const results = new Map<number, Category[]>();
    
    const lines = response.split("\n");
    for (const line of lines) {
      const match = line.match(/^#(\d+):\s*(.+)$/);
      if (match) {
        const adNumber = parseInt(match[1]);
        const categories = match[2].split(",")
          .map(cat => cat.trim())
          .filter(cat => CATEGORIES.includes(cat as Category)) as Category[];
        
        if (categories.length > 0) {
          results.set(adNumber, categories);
        }
      }
    }
    
    return results;
  }

  async categorizeAds(ads: AdContent[]): Promise<Map<number, Category[]>> {
    try {
      const prompt = this.buildPrompt(ads);
      
      console.log("\n=== SENDING TO GEMINI ===");
      console.log(prompt);
      console.log("\n=== END PROMPT ===\n");

      const result = await this.model.generateContent(prompt);
      const response = result.response.text();
      
      console.log("\n=== RECEIVED FROM GEMINI ===");
      console.log(response);
      console.log("\n=== END RESPONSE ===\n");
      
      const categorized = this.parseResponse(response);
      
      console.log("\n=== PARSED CATEGORIES ===");
      categorized.forEach((categories, adIndex) => {
        console.log(`Ad #${adIndex}:`, categories);
      });
      console.log("\n=== END CATEGORIES ===\n");

      return categorized;
    } catch (error) {
      console.error("Error categorizing ads:", error);
      throw error;
    }
  }
}
