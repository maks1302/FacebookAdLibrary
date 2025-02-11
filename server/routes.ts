import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { FacebookApiServiceFactory } from "./services/facebook-api.factory";
import { type SearchParams, searchParamsSchema } from "./services/facebook-api.types";
import { CategorizationService } from './services/categorization';

const facebookApi = FacebookApiServiceFactory.create({
  accessToken: process.env.FB_ACCESS_TOKEN || '',
  apiVersion: 'v22.0'
});
const categorizationService = new CategorizationService(process.env.GEMINI_API_KEY || '');

export function registerRoutes(app: Express): Server {
  // Test API connection endpoint
  app.get("/api/test-connection", async (_req, res) => {
    try {
      const result = await facebookApi.testConnection();
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(400).json({ status: "error", message });
    }
  });

  app.get("/api/ads", async (req, res) => {
    try {
      const country = Array.isArray(req.query.country) ? req.query.country : [req.query.country];
      const searchParams: SearchParams = {
        ...searchParamsSchema.omit({ country: true }).parse(req.query),
        country,
        search_type: (req.query.search_type as string || "KEYWORD_UNORDERED"),
        ad_active_status: (req.query.ad_active_status as any) || "ACTIVE",
        media_type: (req.query.media_type as any) || "ALL",
      };

      // Log query parameters
      console.log('=== Facebook API Query Parameters ===');
      console.log({
        ...searchParams,
        access_token: '***' // Hide token in logs
      });

      const response = await facebookApi.searchAds(searchParams);
      
      // Store search history
      await storage.createSearchHistory({
        search_terms: searchParams.search_terms,
        ad_type: searchParams.ad_type,
        country: searchParams.country,
        ad_active_status: searchParams.ad_active_status,
        media_type: searchParams.media_type,
        ad_delivery_date_min: searchParams.ad_delivery_date_min,
        ad_delivery_date_max: searchParams.ad_delivery_date_max,
        results_count: response.data.length,
      });

      // Categorize ads if needed
      if (response.data.length > 0) {
        try {
          const categories = await categorizationService.categorizeAds(
            response.data.map(ad => ({
              page_name: ad.page_name,
              ad_creative_bodies: ad.ad_creative_bodies || [],
              ad_creative_link_captions: ad.ad_creative_link_captions || [],
              ad_creative_link_titles: ad.ad_creative_link_titles || [],
            }))
          );

          // Attach categories to ads
          response.data = response.data.map((ad, index) => ({
            ...ad,
            categories: categories.get(index) || [],
          }));
        } catch (error) {
          console.error('Error categorizing ads:', error);
          // Continue without categories if categorization fails
        }
      }

      res.json(response);
    } catch (error) {
      console.error('Error processing request:', error);
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(400).json({ error: message });
    }
  });

  app.get("/api/search-history", async (_req, res) => {
    try {
      const history = await storage.getSearchHistory();
      res.json(history);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(400).json({ error: message });
    }
  });

  app.get("/api/ad-preview", async (req, res) => {
    try {
      const { url } = req.query;

      if (!url || typeof url !== 'string') {
        throw new Error("Missing or invalid ad preview URL");
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch ad preview: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }

      const content = await response.text();
      res.send(content);
    } catch (error) {
      console.error("Ad preview error:", error);
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(400).json({ message });
    }
  });

  return createServer(app);
}