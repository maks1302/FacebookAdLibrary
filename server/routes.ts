import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import { z } from "zod";
import type { Ad } from "@shared/types";

const searchParamsSchema = z.object({
  search_terms: z.string(),
  ad_type: z.enum(["ALL", "POLITICAL_AND_ISSUE_ADS"]),
  country: z.string().length(2),
});

const FB_API_VERSION = "v18.0";
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

type FacebookApiResponse = {
  data: Ad[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
  };
};

export function registerRoutes(app: Express): Server {
  // Test API connection endpoint
  app.get("/api/test-connection", async (_req, res) => {
    try {
      if (!FB_ACCESS_TOKEN) {
        throw new Error("Facebook API access token not configured");
      }

      const response = await fetch(
        `https://graph.facebook.com/${FB_API_VERSION}/ads_archive?` +
          new URLSearchParams({
            access_token: FB_ACCESS_TOKEN,
            search_terms: "test",
            ad_type: "ALL",
            ad_reached_countries: '["US"]',
            limit: "1",
            fields: [
              "id",
              "page_name",
              "ad_creative_bodies",
              "bylines"
            ].join(","),
          }),
      );

      const responseData = await response.json() as any;

      if (!response.ok) {
        throw new Error(`Facebook API error: ${JSON.stringify(responseData)}`);
      }

      res.json({
        status: "connected",
        api_version: FB_API_VERSION,
        response_data: {
          data_count: responseData.data?.length || 0,
          has_paging: !!responseData.paging,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(400).json({ status: "error", message });
    }
  });

  app.get("/api/ads", async (req, res) => {
    try {
      const { search_terms, ad_type, country } = searchParamsSchema.parse(
        req.query,
      );

      if (!FB_ACCESS_TOKEN) {
        throw new Error("Facebook API access token not configured");
      }

      const fields = [
        "id",
        "page_name",
        "ad_creative_bodies",
        "ad_creative_link_captions",
        "ad_creative_link_descriptions",
        "ad_creative_link_titles",
        "ad_creation_time",
        "ad_delivery_start_time",
        "ad_delivery_stop_time",
        "ad_snapshot_url",
        "currency",
        "impressions",
        "spend",
        "demographic_distribution",
        "delivery_by_region",
        "publisher_platforms",
        "target_ages",
        "target_gender",
        "target_locations",
        "bylines",
        "languages"
      ].join(",");

      const response = await fetch(
        `https://graph.facebook.com/${FB_API_VERSION}/ads_archive?` +
          new URLSearchParams({
            access_token: FB_ACCESS_TOKEN,
            search_terms: `"${search_terms}"`,
            ad_type,
            ad_reached_countries: `["${country}"]`,
            limit: "24",
            fields,
            ad_active_status: "ALL",
          }),
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Facebook API Error:", error);
        throw new Error(
          `Facebook API error: ${error.error?.message || JSON.stringify(error)}`
        );
      }

      const apiResponse = (await response.json()) as FacebookApiResponse;
      console.log(`Found ${apiResponse.data?.length || 0} ads`);

      // Store search in history
      await storage.createSearchHistory({
        searchTerms: search_terms,
        adType: ad_type,
        countries: [country],
      });

      res.json(apiResponse.data);
    } catch (error) {
      console.error("Search ads error:", error);
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(400).json({ message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}