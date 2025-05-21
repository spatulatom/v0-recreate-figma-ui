import { type NextRequest, NextResponse } from "next/server"

// Hugging Face API endpoint
const HF_API_URL = "https://api-inference.huggingface.co/models/"
// Default model - you can change this to any conversational model on Hugging Face
const DEFAULT_MODEL = "meta-llama/Llama-2-7b-chat-hf"

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

    // Format messages for Hugging Face
    // For most models, we need to convert the messages array into a single text prompt
    const formattedPrompt = formatMessagesForModel(messages)

    // Call Hugging Face API
    const response = await fetch(`${HF_API_URL}${DEFAULT_MODEL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hfToken}`,
      },
      body: JSON.stringify({
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: 250,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Hugging Face API error:", errorText)

      return NextResponse.json(
        {
          error: `Hugging Face API error: ${response.status}`,
          details: errorText,
          message: {
            role: "assistant",
            content: "Sorry, I encountered an error while processing your request. Please try again later.",
          },
        },
        { status: 500 },
      )
    }

    const result = await response.json()

    // Extract the generated text from the response
    // The response format can vary depending on the model
    let generatedText = ""
    if (Array.isArray(result) && result.length > 0) {
      generatedText = result[0]?.generated_text || ""
    } else if (result.generated_text) {
      generatedText = result.generated_text
    } else {
      generatedText = JSON.stringify(result)
    }

    // Clean up the response to extract just the assistant's reply
    const cleanedResponse = cleanModelResponse(generatedText, formattedPrompt)

    // Return the response
    return NextResponse.json({
      message: {
        role: "assistant",
        content: cleanedResponse,
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

// Helper function to format messages for the model
function formatMessagesForModel(messages: any[]): string {
  // Skip the system message (first message) if it exists
  const conversationMessages = messages[0]?.role === "system" ? messages.slice(1) : messages

  // Format for Llama-2-chat style
  let prompt = ""

  // Add system prompt if it exists
  if (messages[0]?.role === "system") {
    prompt += `<s>[INST] <<SYS>>\n${messages[0].content}\n<</SYS>>\n\n`
  } else {
    prompt += "<s>[INST] "
  }

  // Add conversation history
  for (let i = 0; i < conversationMessages.length; i++) {
    const message = conversationMessages[i]

    if (message.role === "user") {
      // If this is not the first user message and follows another user message, add formatting
      if (i > 0 && i === conversationMessages.length - 1) {
        prompt += `${message.content} [/INST]`
      } else {
        prompt += `${message.content}`
      }
    } else if (message.role === "assistant") {
      prompt += ` [/INST] ${message.content} </s><s>[INST] `
    }
  }

  return prompt
}

// Helper function to clean up the model response
function cleanModelResponse(response: string, prompt: string): string {
  // Remove the original prompt from the beginning of the response
  if (response.startsWith(prompt)) {
    response = response.substring(prompt.length)
  }

  // Remove any trailing [/INST] or similar tokens
  response = response.replace(/\[\/INST\]/g, "").trim()

  // Remove any assistant: or AI: prefixes
  response = response.replace(/^(assistant:|AI:)/i, "").trim()

  return response
}
