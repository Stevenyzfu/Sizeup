import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  const { market } = await request.json();

  const prompt = `You are a market research analyst. Analyze the market for: "${market}".

Return ONLY valid JSON (no markdown, no preamble) matching exactly this structure:
{
  "marketName": "a clean name for this market",
  "overallConfidence": "High | Medium | Low",
  "tam": { "value": "dollar range e.g. $18B–$24B", "methodology": "1-2 sentence explanation", "confidence": "High | Medium | Low" },
  "sam": { "value": "dollar range", "methodology": "1-2 sentence explanation", "confidence": "High | Medium | Low" },
  "som": { "value": "dollar range", "methodology": "1-2 sentence explanation", "confidence": "High | Medium | Low" },
  "cagr": { "value": "percentage range e.g. 10%–14%", "period": "e.g. 2024–2029", "methodology": "1-2 sentence explanation", "confidence": "High | Medium | Low" }
}

Rules:
- Use ranges, never single-point estimates.
- Base figures on real public companies and market data where possible.
- If there is insufficient public data, set the relevant confidence to "Low" and explain why in the methodology rather than inventing numbers.`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    temperature: 0.2,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text : "";
  const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    const report = JSON.parse(cleaned);
    return NextResponse.json({ report });
  } catch {
    return NextResponse.json(
      { error: "Could not parse the report. Please try again." },
      { status: 500 }
    );
  }
}