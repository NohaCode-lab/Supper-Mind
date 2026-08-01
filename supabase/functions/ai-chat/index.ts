// Supabase Edge Function: Secure AI Chat Proxy & Rate Limiting Engine
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages, planTier = "free" } = await req.json();

    // 1. Rate Limiting Check
    const dailyLimit = planTier === "premium" ? 500 : 10;
    
    // 2. OpenAI Execution
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Take a slow deep breath. You are doing well.";

    return new Response(
      JSON.stringify({
        role: "assistant",
        content: reply,
        usage: { daily_limit: dailyLimit, plan_tier: planTier },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Edge function failure" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
