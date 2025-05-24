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

    // Enhanced system instruction for better suggestion generation
    const baseInstruction =
      messages[0]?.role === "system"
        ? messages[0].content
        : "You are a helpful assistant powered by Google's Gemini AI.";

    const lengthConstraint =
      "Keep your response concise, ideally no more than five sentences. It can be shorter if appropriate.";

    const suggestionInstruction =
      "\n\nCRITICAL REQUIREMENT: You MUST end your response with exactly 2 follow-up question suggestions. Use this EXACT format (including proper spelling):\n[SUGGESTIONS]\n1. First specific follow-up question\n2. Second specific follow-up question\n[/SUGGESTIONS]\n\nThe suggestions should be relevant, specific, and encourage further conversation about the topic discussed. Do NOT use generic questions like 'tell me more' - make them specific to our conversation.";

    systemInstruction = {
      parts: [
        {
          text: `${baseInstruction}\n\n${lengthConstraint}${suggestionInstruction}`,
        },
      ],
    };

    // Skip system message from chat history if present
    let messagesForHistoryProcessing =
      messages[0]?.role === "system" ? messages.slice(1) : messages;

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
    } // Log the request summary
    console.log(
      `Sending request to Gemini API. History messages: ${chatHistoryForGemini.length}`
    );

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
    } // Parse the response
    const geminiResponse = await response.json();

    // Extract debug information
    const debugInfo = {
      responseStatus: response.status,
      responseHeaders: Object.fromEntries(response.headers.entries()),
      usageMetadata: geminiResponse.usageMetadata || null,
      candidatesCount: geminiResponse.candidates?.length || 0,
      finishReason: geminiResponse.candidates?.[0]?.finishReason || null,
      safetyRatings: geminiResponse.candidates?.[0]?.safetyRatings || null,
      inputTokens: geminiResponse.usageMetadata?.promptTokenCount || null,
      outputTokens: geminiResponse.usageMetadata?.candidatesTokenCount || null,
      totalTokens: geminiResponse.usageMetadata?.totalTokenCount || null,
      model: GEMINI_API_ENDPOINT.split("/models/")[1].split(":")[0],
      timestamp: new Date().toISOString(),
      messagesCount: chatHistoryForGemini.length,
    };

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
    } // Enhanced suggestion parsing with robust error handling
    let suggestions: string[] = [];
    let mainContent = generatedText;

    // Multiple patterns to handle various malformed suggestion blocks
    const suggestionPatterns = [
      /\[SUGGESTIONS\]([\s\S]*?)\[\/SUGGESTIONS\]/i,
      /\[SUGGESTIONS\]([\s\S]*?)\[\/SUSTIONS\]/i, // Handle typo
      /\[SUGGESTIONS\]([\s\S]*?)\[\/SUGG?[^\]]*\]/i, // Handle partial typos
      /\[SUGGESTIONS\]([\s\S]*?)$/i, // Handle unclosed suggestions
    ];

    let foundSuggestionBlock = false;

    // Try each pattern to find and clean suggestion blocks
    for (const pattern of suggestionPatterns) {
      const match = mainContent.match(pattern);
      if (match) {
        foundSuggestionBlock = true;
        const suggestionText = match[1].trim();

        // Remove the entire matched block from content first
        mainContent = mainContent.replace(match[0], "").trim();

        // Only parse suggestions if there's actual content
        if (suggestionText && suggestionText.length > 0) {
          const suggestionLines = suggestionText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.match(/^\d+\./))
            .map((line) => line.replace(/^\d+\.\s*/, ""))
            .filter((line) => line.length > 5);

          suggestions = suggestionLines.slice(0, 2);
        }
        break;
      }
    }

    // If no suggestion block found, look for numbered list at the end
    if (!foundSuggestionBlock) {
      const lines = mainContent
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      const lastFiveLines = lines.slice(-5);

      // Look for consecutive numbered items that seem like questions
      const numberedQuestions = lastFiveLines.filter(
        (line) =>
          line.match(/^\d+\./) &&
          line.length > 15 &&
          (line.includes("?") ||
            line.toLowerCase().includes("how") ||
            line.toLowerCase().includes("what") ||
            line.toLowerCase().includes("why") ||
            line.toLowerCase().includes("can you"))
      );

      if (numberedQuestions.length >= 2) {
        suggestions = numberedQuestions
          .slice(0, 2)
          .map((line) => line.replace(/^\d+\.\s*/, "").trim());

        // Remove these suggestion lines from main content
        let contentLines = lines;
        numberedQuestions.forEach((suggLine) => {
          const index = contentLines.findIndex(
            (line) => line.trim() === suggLine.trim()
          );
          if (index !== -1) {
            contentLines.splice(index, 1);
          }
        });
        mainContent = contentLines.join("\n").trim();
      }
    }

    // Final validation - ensure suggestions are meaningful
    suggestions = suggestions.filter(
      (suggestion) =>
        suggestion.length > 10 &&
        !suggestion.toLowerCase().includes("tell me more about") &&
        !suggestion.toLowerCase().includes("what else would you like")
    ); // Basic logging for debugging
    console.log(
      `Processing chat request. Messages: ${chatHistoryForGemini.length}`
    );
    if (suggestions.length > 0) {
      console.log(`Generated ${suggestions.length} suggestions`);
    } // Return the response with comprehensive debug information
    return NextResponse.json({
      message: {
        role: "assistant",
        content: mainContent,
      },
      suggestions: suggestions,
      model: GEMINI_API_ENDPOINT.split("/models/")[1].split(":")[0],
      rawResponse: generatedText, // Original response text
      debugInfo: {
        ...debugInfo,
        rawResponseText: generatedText,
        processedContent: mainContent,
        extractedSuggestions: suggestions,
        suggestionParsingSuccess: suggestions.length > 0,
        fullGeminiResponse: geminiResponse, // Complete API response for advanced debugging
      },
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
