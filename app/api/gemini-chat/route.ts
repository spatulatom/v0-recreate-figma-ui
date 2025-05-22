"use server";

import { type NextRequest, NextResponse } from "next/server";

// Gemini API endpoint
const GEMINI_API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

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

    // Check if API key is available
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Gemini API key is not configured",
          message: {
            role: "assistant",
            content:
              "Sorry, the Gemini API key is not configured. Please add your API key to the environment variables.",
          },
        },
        { status: 500 }
      );
    }

    // Get the last user message and format it for Gemini
    const userMessages = messages.filter((msg) => msg.role === "user");
    if (userMessages.length === 0) {
      return NextResponse.json(
        { error: "No user messages found" },
        { status: 400 }
      );
    }

    // Transform messages into Gemini format
    // For simplicity, we'll just use the last user message
    const lastUserMessage = userMessages[userMessages.length - 1];
    console.log(
      "Sending request to Gemini API with prompt:",
      lastUserMessage.content
    );

    // Prepare the request to Gemini API
    const geminiRequest = {
      contents: [
        {
          parts: [
            {
              text: lastUserMessage.content,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    // Make the API call to Gemini
    const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geminiRequest),
    });

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Gemini API error: ${response.status} ${response.statusText}`,
        errorText
      );
      return NextResponse.json(
        {
          error: `Gemini API error: ${response.status}`,
          details: errorText,
          message: {
            role: "assistant",
            content:
              "Sorry, I encountered an error while processing your request. Please try again later.",
          },
        },
        { status: response.status }
      );
    }

    // Parse the response
    const geminiResponse = await response.json();
    console.log(
      "Gemini API response:",
      JSON.stringify(geminiResponse).substring(0, 200) + "..."
    );

    // Extract the generated text
    let generatedText = "";

    // Navigate the response structure to find the text
    if (geminiResponse.candidates && geminiResponse.candidates.length > 0) {
      const candidate = geminiResponse.candidates[0];
      if (
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts.length > 0
      ) {
        // Extract text from all parts and join them
        generatedText = candidate.content.parts
          .map((part) => part.text || "")
          .join("")
          .trim();
      }
    }

    if (!generatedText) {
      console.error(
        "Failed to extract text from Gemini response:",
        geminiResponse
      );
      generatedText =
        "I processed your request but couldn't generate a proper response.";
    }

    // Return the response
    return NextResponse.json({
      message: {
        role: "assistant",
        content: generatedText,
      },
      model: "gemini-1.5-flash-latest",
      rawResponse: JSON.stringify(geminiResponse).substring(0, 500),
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      {
        error: "Failed to get response from Gemini",
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
