import { type NextRequest, NextResponse } from "next/server";

// Hugging Face Inference API endpoint
const HF_INFERENCE_API = "https://api-inference.huggingface.co/models/";

// Using models that are more reliable and commonly available on Hugging Face
// Updated with models that are actively maintained and served on the inference API
const MODELS = [
  // "facebook/bart-large-cnn", // Commented out as responses were "funny"
  "bigscience/bloom-560m", // Smaller BLOOM model, good for text generation
  "EleutherAI/gpt-neo-125m", // Smaller GPT-Neo model, good for general text generation
  "microsoft/DialoGPT-medium", // Good for conversational responses
  // "google/flan-t5-small", // Versatile model good for various text tasks
  "sshleifer/distilbart-cnn-12-6", // Good for summarization, alternative to BART
  "deepset/roberta-base-squad2", // Good for question answering
];

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { messages } = body;
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required and must be an array" },
        { status: 400 }
      );
    }

    // Check if API token is available
    const hfToken = process.env.HUGGINGFACE_API_TOKEN;
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
        { status: 500 }
      );
    }

    // Get the last user message
    const lastMessage = messages.filter((msg) => msg.role === "user").pop();
    if (!lastMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    const prompt = lastMessage.content;
    console.log("Sending request to Hugging Face API with prompt:", prompt);

    // Try each model in sequence until one works
    let response = null;
    let modelUsed = "";
    let rawResult = null;
    const errorDetails = [];

    for (const model of MODELS) {
      try {
        console.log(`Trying model: ${model}`);

        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

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
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          modelUsed = model;
          console.log(
            `Success with model: ${model}, status: ${response.status}`
          );

          // Parse the successful response
          try {
            rawResult = await response.json();
            console.log(
              "Hugging Face API result:",
              JSON.stringify(rawResult).substring(0, 200) + "..."
            );
            break; // Only break if we successfully parsed the response
          } catch (parseError) {
            console.error(`Error parsing response from ${model}:`, parseError);
            errorDetails.push(
              `${model}: Response parsing error - ${
                parseError instanceof Error
                  ? parseError.message
                  : "Unknown error"
              }`
            );
            // Continue to next model if parsing fails
          }
        } else {
          const errorText = await response.text();
          console.error(
            `Model ${model} failed with status ${response.status}: ${errorText}`
          );
          errorDetails.push(`${model}: ${response.status} - ${errorText}`);
        }
      } catch (error) {
        console.error(`Error with model ${model}:`, error);
        errorDetails.push(
          `${model}: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }

    // If all models failed
    if (!response || !response.ok || !rawResult) {
      console.error("All models failed. Error details:", errorDetails);
      return NextResponse.json(
        {
          error: "All Hugging Face models failed",
          details: errorDetails.join("; "),
          message: {
            role: "assistant",
            content:
              "Sorry, I couldn't process your request. All available models failed to respond.",
          },
        },
        { status: 500 }
      );
    } // Extract the generated text based on the model used
    let generatedText = "";

    if (modelUsed.includes("bart")) {
      // BART models return an array with summary_text for summarization tasks
      generatedText =
        Array.isArray(rawResult) && rawResult[0]?.summary_text
          ? rawResult[0].summary_text
          : rawResult?.summary_text ||
            rawResult?.generated_text ||
            "No response generated";
    } else if (
      modelUsed.includes("gpt") ||
      modelUsed.includes("bloom") ||
      modelUsed.includes("DialoGPT")
    ) {
      // GPT models, BLOOM, and DialoGPT typically return generated_text
      generatedText =
        Array.isArray(rawResult) && rawResult[0]?.generated_text
          ? rawResult[0].generated_text
          : rawResult?.generated_text || "No response generated";
    } else if (modelUsed.includes("bert") || modelUsed.includes("roberta")) {
      // BERT and RoBERTa models typically return embeddings or classifications
      if (modelUsed.includes("squad")) {
        // Question answering models return answers
        generatedText =
          rawResult?.answer ||
          "I processed your question but couldn't find a specific answer.";
      } else {
        generatedText =
          "I processed your message, but I'm primarily an understanding model, not a text generation model.";
      }
    } else if (modelUsed.includes("flan-t5")) {
      // T5 models can return various formats depending on the task
      generatedText = Array.isArray(rawResult)
        ? rawResult[0] || "No response generated"
        : typeof rawResult === "string"
        ? rawResult
        : JSON.stringify(rawResult);
    } else {
      // Generic fallback - try all possible response formats
      generatedText =
        Array.isArray(rawResult) && rawResult[0]?.summary_text
          ? rawResult[0].summary_text
          : Array.isArray(rawResult) && rawResult[0]?.generated_text
          ? rawResult[0].generated_text
          : rawResult?.summary_text ||
            rawResult?.generated_text ||
            (typeof rawResult === "string"
              ? rawResult
              : JSON.stringify(rawResult).substring(0, 500));
    }

    // Add debug logging
    console.log("Extracted text:", generatedText);
    console.log(
      "Original result structure:",
      JSON.stringify(rawResult).substring(0, 200)
    );

    // Return the response with the model used
    return NextResponse.json({
      message: {
        role: "assistant",
        content:
          generatedText.trim() ||
          "I processed your request but couldn't generate a proper response.",
      },
      modelUsed: modelUsed,
      rawResponse:
        typeof rawResult === "object"
          ? JSON.stringify(rawResult).substring(0, 500)
          : String(rawResult).substring(0, 500),
    });
  } catch (error) {
    console.error("Hugging Face API error:", error);
    return NextResponse.json(
      {
        error: "Failed to get response from Hugging Face",
        details: error instanceof Error ? error.message : "Unknown error",
        message: {
          role: "assistant",
          content:
            "Sorry, I encountered an error while processing your request. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
