import { describe, it, expect, vi } from "vitest";
import { apiRequest, ApiError } from "../api/client";
import { aiApi } from "../api/aiApi";

describe("Full-Stack API Layer & Error Handling", () => {
  it("instantiates ApiError with status and error code", () => {
    const err = new ApiError("Daily rate limit exceeded", 429, "RATE_LIMIT_EXCEEDED");
    expect(err.message).toBe("Daily rate limit exceeded");
    expect(err.status).toBe(429);
    expect(err.code).toBe("RATE_LIMIT_EXCEEDED");
  });

  it("handles fallback AI service when Edge Function fails in offline dev mode", async () => {
    const res = await aiApi.sendChatMessage([{ role: "user", content: "Hello AI" }]);
    expect(res).toBeDefined();
    expect(res.content).toBeDefined();
    expect(res.role).toBe("assistant");
  });
});
