import { apiRequest } from "./client";

export const analyticsApi = {
  async trackEvent(eventName, metadata = {}) {
    try {
      await apiRequest("analytics", {
        method: "POST",
        body: JSON.stringify({ eventName, metadata, timestamp: new Date().toISOString() }),
      });
    } catch {
      // Console debug logging in demo environment
      console.log(`[Analytics Telemetry] ${eventName}`, metadata);
    }
  },
};
