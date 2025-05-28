// /app/api/uplift/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = "AIzaSyAjSZKGtjaCgrQO_nPY2mTB9KN8WNjx-V0"; // כדאי להעביר לקובץ .env.local

  try {
    const promptBase =
      "Give a short, comforting motivational message (max 20 words) to a student struggling with academic stress and anxiety due to war or crisis. Make it gentle, emotionally supportive, and hopeful.";
    const variations = [
      "Keep it inspiring",
      "Use a metaphor",
      "Make it about perseverance",
      "Focus on hope",
      "Focus on focus!",
      "Make it exam-specific",
      "Include 'you can do it'",
      "End with an exclamation",
    ];
    const randomVariation =
      variations[Math.floor(Math.random() * variations.length)];

    // Final prompt with variation and timestamp (to reduce repetition)
    const prompt = `${promptBase}. ${randomVariation}. Time: ${Date.now()}`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.9,
          },
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Gemini API Error:", errorText);
      return NextResponse.json(
        { message: "Gemini API error: " + errorText },
        { status: 500 }
      );
    }

    const result = await res.json();
    console.log("Gemini API Response:", result);

    const message = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!message) {
      return NextResponse.json(
        { message: "שגיאה: לא התקבל תוכן מג'מיני." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Server-side Error:", error);
    return NextResponse.json(
      { message: "שגיאה כללית: " + error.message },
      { status: 500 }
    );
  }
}
