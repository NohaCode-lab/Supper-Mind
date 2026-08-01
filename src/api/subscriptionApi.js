import { apiRequest } from "./client";

export const subscriptionApi = {
  async getSubscriptionStatus(userId) {
    try {
      return await apiRequest(`subscription?userId=${userId}`);
    } catch {
      return { planTier: "free", status: "active", ai_daily_limit: 10 };
    }
  },

  async createCheckoutSession(priceId = "price_premium_monthly") {
    try {
      return await apiRequest("stripe-checkout", {
        method: "POST",
        body: JSON.stringify({ priceId }),
      });
    } catch {
      // Demo simulated checkout redirect URL
      return { url: "https://checkout.stripe.com/demo-supper-mind" };
    }
  },
};
