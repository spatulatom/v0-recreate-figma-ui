import { OpenAI } from "openai"
import { type NextRequest, NextResponse } from "next/server"

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    let body
    try {
      body = await req.json()
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 })
    }

    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: "OpenAI API key is not configured",
          message: {
            role: "assistant",
            content:
              "Sorry, the OpenAI API key is not configured. Please add your API key to the environment variables.",
          },
        },
        { status: 500 },
      )
    }

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    })

    // Return the response
    return NextResponse.json({
      message: {
        role: "assistant",
        content: response.choices[0].message.content || "No response content",
      },
    })
  } catch (error) {
    console.error("OpenAI API error:", error)

    // Ensure we return a valid JSON response even for errors
    return NextResponse.json(
      {
        error: "Failed to get response from OpenAI",
        details: error instanceof Error ? error.message : "Unknown error",
        message: {
          role: "assistant",
          content: "Sorry, I encountered an error while processing your request. Please try again later.",
        },
      },
      { status: 500 },
    )
  }
}
