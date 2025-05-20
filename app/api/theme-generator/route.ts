import { type NextRequest, NextResponse } from "next/server"
import { generateTheme } from "@/lib/mcp-client"

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("No OpenAI API key provided, returning example CSS")
      return NextResponse.json({
        css: `/* Example CSS (OPENAI_API_KEY not configured) */\n/* Based on prompt: "${prompt}" */\n\n:root {\n  --background: 0 0% 100%;\n  --foreground: 222.2 84% 4.9%;\n  /* other variables... */\n}`,
        isExample: true,
      })
    }

    // Generate theme
    const generatedCSS = await generateTheme(prompt)

    // Return the generated CSS
    return NextResponse.json({ css: generatedCSS })
  } catch (error) {
    console.error("Error in theme generator API:", error)

    // Improved error response
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : ""

    console.error("Error details:", { message: errorMessage, stack: errorStack })

    return NextResponse.json(
      {
        error: "Failed to generate theme",
        details: errorMessage,
      },
      { status: 500 },
    )
  }
}
