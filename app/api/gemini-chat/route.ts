"use server";

import { type NextRequest, NextResponse } from "next/server";

// Gemini API endpoint
const GEMINI_API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

const MAX_CHAT_MESSAGES_TO_SEND = 15; // Cap for user/assistant messages

interface ClientMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role?: "user" | "model"; // Role is optional for systemInstruction
  parts: GeminiPart[];
}

interface GeminiRequest {
  contents: GeminiContent[];
  systemInstruction?: GeminiContent;
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

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

    const { messages }: { messages: ClientMessage[] } = body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required, must be a non-empty array" },
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

    let systemInstruction: GeminiContent | undefined = undefined;
    const chatHistoryForGemini: GeminiContent[] = [];

    let messagesForHistoryProcessing = messages;

    // Handle system message for systemInstruction
    if (messages[0]?.role === "system") {
      systemInstruction = {
        // role: "system", // Role is not explicitly set for systemInstruction's content object
        parts: [{ text: messages[0].content }],
      };
      // Remove system message from history to be processed for turns
      messagesForHistoryProcessing = messages.slice(1);
    }

    // Cap the number of user/assistant messages to send
    if (messagesForHistoryProcessing.length > MAX_CHAT_MESSAGES_TO_SEND) {
      messagesForHistoryProcessing = messagesForHistoryProcessing.slice(
        -MAX_CHAT_MESSAGES_TO_SEND
      );
    }

    // Transform remaining messages into Gemini format
    for (const message of messagesForHistoryProcessing) {
      if (message.role === "user") {
        chatHistoryForGemini.push({
          role: "user",
          parts: [{ text: message.content }],
        });
      } else if (message.role === "assistant") {
        chatHistoryForGemini.push({
          role: "model", // Map 'assistant' to 'model'
          parts: [{ text: message.content }],
        });
      }
      // Silently ignore any other system messages in the chat history part
    }

    if (chatHistoryForGemini.length === 0 && !systemInstruction) {
      // This case should ideally be prevented by client-side validation
      // or if systemInstruction is also considered as a valid starting point.
      // For now, if history is empty and no system instruction, it's likely an issue.
      return NextResponse.json(
        {
          error:
            "No valid user or assistant messages to process after handling system instruction.",
        },
        { status: 400 }
      );
    }

    // Log the full request being sent (or a summary)
    console.log(
      `Sending request to Gemini API. System Instruction: ${
        systemInstruction
          ? systemInstruction.parts[0].text.substring(0, 50) + "..."
          : "None"
      }. History messages: ${
        chatHistoryForGemini.length
      } (capped at ${MAX_CHAT_MESSAGES_TO_SEND} user/assistant messages)`
    );
    if (chatHistoryForGemini.length > 0) {
      console.log(
        "Last user/model message:",
        chatHistoryForGemini[
          chatHistoryForGemini.length - 1
        ].parts[0].text.substring(0, 100) + "..."
      );
    }

    // Prepare the request to Gemini API
    const geminiRequest: GeminiRequest = {
      contents: chatHistoryForGemini,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    if (systemInstruction) {
      geminiRequest.systemInstruction = systemInstruction;
    }

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
          .map((part: GeminiPart) => part.text || "") // Ensure GeminiPart is used here
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
