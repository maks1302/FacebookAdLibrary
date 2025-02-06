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

const FB_API_VERSION = "v22.0";
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
            fields: ["id"].join(","),
          }),
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Facebook API error: ${error}`);
      }

      res.json({ status: "connected" });
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

      const response = await fetch(
        `https://graph.facebook.com/${FB_API_VERSION}/ads_archive?` +
          new URLSearchParams({
            access_token: FB_ACCESS_TOKEN,
            search_terms,
            ad_type,
            ad_reached_countries: `["${country}"]`,
            limit: "24",
            fields: [
              "id",
              "page_name",
              "ad_creative_body",
              "ad_creative_link_caption",
              "ad_creative_link_title",
              "ad_delivery_start_time",
              "ad_delivery_stop_time",
              "currency",
              "funding_entity",
              "impressions",
              "spend",
            ].join(","),
          }),
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Facebook API error: ${error}`);
      }

      const apiResponse = (await response.json()) as FacebookApiResponse;

      // Store search in history
      await storage.createSearchHistory({
        searchTerms: search_terms,
        adType: ad_type,
        countries: [country],
      });

      res.json(apiResponse.data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(400).json({ message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
