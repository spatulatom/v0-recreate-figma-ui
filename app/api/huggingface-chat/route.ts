import { type NextRequest, NextResponse } from "next/server"

// Hugging Face Inference API endpoint - using the correct URL structure
const HF_INFERENCE_API = "https://api-inference.huggingface.co/models/"

// Using models that are definitely available and don't require special access
const MODELS = [
  "facebook/bart-large-cnn", // Summarization model that works well for general text generation
  "google/flan-t5-small", // Small but effective text generation model
  "distilbert-base-uncased", // Fallback for simple text tasks
]

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

    // Try each model in sequence until one works
    let response = null
    let modelUsed = ""
    const errorDetails = []

    for (const model of MODELS) {
      try {
        console.log(`Trying model: ${model}`)

        // Create AbortController for timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5-second timeout

        response = await fetch(`${HF_INFERENCE_API}${model}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${hfToken}`,
          },
          body: JSON.stringify({
            inputs: prompt,
            options: {
              wait_for_model: true,
              use_cache: true,
            },
          }),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          modelUsed = model
          console.log(`Success with model: ${model}, status: ${response.status}`)
          break
        } else {
          const errorText = await response.text()
          console.error(`Model ${model} failed with status ${response.status}: ${errorText}`)
          errorDetails.push(`${model}: ${response.status} - ${errorText}`)
        }
      } catch (error) {
        console.error(`Error with model ${model}:`, error)
        errorDetails.push(`${model}: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    // If all models failed
    if (!response || !response.ok) {
      console.error("All models failed. Error details:", errorDetails)
      return NextResponse.json(
        {
          error: "All Hugging Face models failed",
          details: errorDetails.join("; "),
          message: {
            role: "assistant",
            content: "Sorry, I couldn't process your request. All available models failed to respond.",
          },
        },
        { status: 500 },
      )
    }

    // Parse the successful response
    let result
    try {
      result = await response.json()
      console.log("Hugging Face API result:", JSON.stringify(result).substring(0, 200) + "...")
    } catch (error) {
      console.error("Error parsing response:", error)
      return NextResponse.json(
        {
          error: "Failed to parse response",
          details: error instanceof Error ? error.message : "Unknown error",
          message: {
            role: "assistant",
            content: "Sorry, I received a response but couldn't parse it properly.",
          },
        },
        { status: 500 },
      )
    }

    // Extract the generated text based on the model used
    let generatedText = ""

    if (modelUsed.includes("bart")) {
      // BART models typically return an array with generated_text
      generatedText =
        Array.isArray(result) && result[0]?.generated_text
          ? result[0].generated_text
          : result?.generated_text || "No response generated"
    } else if (modelUsed.includes("t5")) {
      // T5 models typically return an array with generated_text
      generatedText =
        Array.isArray(result) && result[0]?.generated_text
          ? result[0].generated_text
          : result?.generated_text || "No response generated"
    } else if (modelUsed.includes("bert")) {
      // BERT models typically return embeddings or classifications
      generatedText = "I processed your message, but I'm primarily an understanding model, not a text generation model."
    } else {
      // Generic fallback
      generatedText =
        typeof result === "string" ? result : result?.generated_text || JSON.stringify(result).substring(0, 500)
    }

    // Return the response with the model used
    return NextResponse.json({
      message: {
        role: "assistant",
        content: generatedText.trim() || "I processed your request but couldn't generate a proper response.",
      },
      modelUsed: modelUsed,
    })
  } catch (error) {
    console.error("Hugging Face API error:", error)
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
