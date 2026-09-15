import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are Campus Copilot, an AI companion for a university operating system called Campus OS. You help students navigate their 4-year college journey, suggest societies, explain campus rules, and give helpful advice. Keep responses punchy, helpful, and student-friendly. Answer this student query: ${prompt}`,
            },
          ],
        },
      ],
    });

    const reply = response.text || "I'm not sure about that, check the Campus Pulse!";
    return NextResponse.json({ reply });
  } catch (error) {
  console.error("AI Error:", error);
  // Fallback response if Gemini experiences high demand
  return NextResponse.json({ 
    reply: "Campus Copilot is experiencing high traffic right now! Try asking again in a moment, or check your active timeline." 
  });
}
}