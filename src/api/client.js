import { supabase } from "../services/supabase";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";

export class ApiError extends Error {
  constructor(message, status = 500, code = "UNKNOWN_ERROR") {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function apiRequest(endpoint, options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || "";

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = endpoint.startsWith("http") ? endpoint : `${SUPABASE_URL}/functions/v1/${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status}`;
      let code = "API_ERROR";
      try {
        const errorJson = await response.json();
        errorMessage = errorJson.message || errorJson.error || errorMessage;
        code = errorJson.code || code;
      } catch {
        // Fallback to text message
      }

      if (response.status === 429) {
        throw new ApiError(errorMessage || "Daily usage rate limit reached.", 429, "RATE_LIMIT_EXCEEDED");
      }

      throw new ApiError(errorMessage, response.status, code);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || "Network communication failed", 500, "NETWORK_ERROR");
  }
}
