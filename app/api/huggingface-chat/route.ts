import { type NextRequest, NextResponse } from "next/server"

// Hugging Face API endpoint - using the Inference API
const HF_API_URL = "https://api-inference.huggingface.co/models/"

// Using a very common and publicly available model
const DEFAULT_MODEL = "gpt2" // Simple text generation model that's widely accessible
const FALLBACK_MODEL = "distilgpt2" // Even smaller fallback model

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

    // Check if API token is available
    const hfToken = process.env.HUGGINGFACE_API_TOKEN
    if (!hfToken) {
      return NextResponse.json(
        {
          error: "Hugging Face API token is not configured",
          message: {
            role: "assistant",
            content:
              "Sorry, the Hugging Face API token is not configured. Please add your API token to the environment variables.",
          },
        },
        { status: 500 },
      )
    }

    // Get the last user message
    const lastMessage = messages.filter((msg) => msg.role === "user").pop()
    if (!lastMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    const prompt = lastMessage.content

    console.log("Sending request to Hugging Face API with prompt:", prompt)
    console.log("Using model:", DEFAULT_MODEL)

    // Try with the default model first
    let response = await fetch(`${HF_API_URL}${DEFAULT_MODEL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hfToken}`,
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          return_full_text: false,
        },
      }),
    })

    // If the default model fails, try the fallback model
    if (!response.ok) {
      console.log(
        `Default model ${DEFAULT_MODEL} failed with status ${response.status}. Trying fallback model ${FALLBACK_MODEL}`,
      )

      response = await fetch(`${HF_API_URL}${FALLBACK_MODEL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hfToken}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: 100,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      })
    }

    console.log("Hugging Face API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Hugging Face API error response:", errorText)
      console.error("Response headers:", Object.fromEntries([...response.headers.entries()]))

      return NextResponse.json(
        {
          error: `Hugging Face API error: ${response.status}`,
          details: errorText,
          message: {
            role: "assistant",
            content: `Sorry, I encountered an error while processing your request. Status: ${response.status}. Please try again later.`,
          },
        },
        { status: 500 },
      )
    }

    const result = await response.json()
    console.log("Hugging Face API result:", JSON.stringify(result))

    // Extract the generated text from the response
    let generatedText = ""

    // Handle different response formats
    if (Array.isArray(result) && result.length > 0) {
      // Format for some models like GPT-2
      generatedText = result[0]?.generated_text || ""
    } else if (typeof result === "object" && result.generated_text) {
      // Format for some other models
      generatedText = result.generated_text
    } else if (typeof result === "string") {
      // Direct string response
      generatedText = result
    } else {
      // Try to extract from any other format
      generatedText = JSON.stringify(result)
      console.warn("Unexpected response format:", result)
    }

    // Return the response
    return NextResponse.json({
      message: {
        role: "assistant",
        content: generatedText.trim() || "I processed your request but couldn't generate a proper response.",
      },
    })
  } catch (error) {
    console.error("Hugging Face API error:", error)

    // Ensure we return a valid JSON response even for errors
    return NextResponse.json(
      {
        error: "Failed to get response from Hugging Face",
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
