import { NextRequest, NextResponse } from "next/server";
import { buildTravelPrompt } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  const finalPrompt = buildTravelPrompt(prompt);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            { role: "system", content: "You are a helpful travel guide AI." },
            { role: "user", content: finalPrompt },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content;

    return NextResponse.json({ result });
  } catch (err) {
    console.error("[GROQ API ERROR]", err);
    return NextResponse.json(
      { error: "Failed to fetch response from Groq" },
      { status: 500 }
    );
  }
}
