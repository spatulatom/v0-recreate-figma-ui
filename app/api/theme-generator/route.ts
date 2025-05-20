import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // If no OpenAI API key is provided, return example CSS
    if (!process.env.OPENAI_API_KEY) {
      console.log("No OpenAI API key provided, returning example CSS")
      return NextResponse.json({
        css: `/* Example CSS (OPENAI_API_KEY not configured) */\n/* Based on prompt: "${prompt}" */\n\n:root {\n  --background: 0 0% 100%;\n  --foreground: 222.2 84% 4.9%;\n  /* other variables... */\n}`,
        isExample: true,
      })
    }

    // Call OpenAI API to generate theme
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a CSS expert specializing in theme creation. Generate CSS variables for both light and dark themes based on the user's description. Use HSL color format. Include variables for background, foreground, primary, secondary, accent, border, etc.",
        },
        {
          role: "user",
          content: `Create CSS variables for a theme based on this description: ${prompt}. Return only the CSS code without any explanation.`,
        },
      ],
      temperature: 0.7,
    })

    const generatedCSS = completion.choices[0].message.content || "/* No CSS generated */"

    // Return the generated CSS
    return NextResponse.json({ css: generatedCSS })
  } catch (error) {
    console.error("Error in theme generator API:", error)
    return NextResponse.json(
      {
        error: "Failed to generate theme",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
