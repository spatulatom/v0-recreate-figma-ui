"use server";

import { type NextRequest, NextResponse } from "next/server";

// Gemini API endpoint
const GEMINI_API_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";

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

    let messagesForHistoryProcessing = messages; // Handle system message for systemInstruction
    if (messages[0]?.role === "system") {
      const originalSystemContent = messages[0].content;
      const lengthConstraint =
        "Keep your response concise, ideally no more than five sentences. It can be shorter if appropriate.";
      const suggestionInstruction =
        "\n\nAfter your response, provide exactly 2 follow-up question suggestions that the user might want to ask next. Format them as:\n[SUGGESTIONS]\n1. First suggestion\n2. Second suggestion\n[/SUGGESTIONS]";
      systemInstruction = {
        parts: [
          {
            text: `${originalSystemContent}\n\n${lengthConstraint}${suggestionInstruction}`,
          },
        ],
      };
      // Remove system message from history to be processed for turns
      messagesForHistoryProcessing = messages.slice(1);
    } else {
      // If no system message from client, create one with the length constraint
      const lengthConstraint =
        "Keep your response concise, ideally no more than five sentences. It can be shorter if appropriate.";
      const suggestionInstruction =
        "\n\nAfter your response, provide exactly 2 follow-up question suggestions that the user might want to ask next. Format them as:\n[SUGGESTIONS]\n1. First suggestion\n2. Second suggestion\n[/SUGGESTIONS]";
      systemInstruction = {
        parts: [{ text: `${lengthConstraint}${suggestionInstruction}` }],
      };
      // No need to slice messagesForHistoryProcessing as there was no system message at index 0
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
      JSON.stringify(geminiResponse).substring(0, 30) + "..."
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

    // Parse suggestions from the response
    let suggestions: string[] = [];
    let mainContent = generatedText;

    const suggestionMatch = generatedText.match(
      /\[SUGGESTIONS\]([\s\S]*?)\[\/SUGGESTIONS\]/
    );
    if (suggestionMatch) {
      const suggestionText = suggestionMatch[1].trim();
      const suggestionLines = suggestionText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.match(/^\d+\./))
        .map((line) => line.replace(/^\d+\.\s*/, ""))
        .filter((line) => line.length > 0);

      suggestions = suggestionLines.slice(0, 2); // Take only first 2 suggestions
      mainContent = generatedText
        .replace(/\[SUGGESTIONS\][\s\S]*?\[\/SUGGESTIONS\]/, "")
        .trim();
    } // Return the response
    return NextResponse.json({
      message: {
        role: "assistant",
        content: mainContent,
      },
      suggestions: suggestions,
      model: GEMINI_API_ENDPOINT.split("/models/")[1].split(":")[0], // Dynamically set model name
      rawResponse: JSON.stringify(geminiResponse),
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
