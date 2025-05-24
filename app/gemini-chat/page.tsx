"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send, AlertCircle, Info } from "lucide-react";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  suggestions?: string[];
};

export default function GeminiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You are a helpful assistant powered by Google's Gemini AI.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<"untested" | "working" | "error">(
    "untested"
  );
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const [currentModelName, setCurrentModelName] = useState<string | null>(null); // New state for model name
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]); // New state for suggested prompts
  const inputRef = useRef<HTMLInputElement>(null);
  const [shouldFocusInput, setShouldFocusInput] = useState(false); // Added state for focusing
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the messages container

  const initialSystemMessage: Message = {
    role: "system",
    content: "You are a helpful assistant powered by Google's Gemini AI.",
  };

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  // Check API status on component mount
  useEffect(() => {
    async function checkApiStatus() {
      try {
        setApiStatus("untested");

        const testMessage =
          "Hello, this is a test message to check if the API is working.";

        const response = await fetch("/api/gemini-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: testMessage },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("API check successful:", data);
          setApiStatus("working");
          if (data.model) {
            setCurrentModelName(data.model);
          }
        } else {
          setApiStatus("error");
          const errorText = await response.text();
          console.error("API check failed:", errorText);
          try {
            const errorData = JSON.parse(errorText);
            setError(
              `API check failed: ${
                errorData.error || errorData.details || response.statusText
              }`
            );
          } catch (e) {
            setError(
              `API check failed: ${response.status} ${
                response.statusText
              }. ${errorText.substring(0, 100)}`
            );
          }
        }
      } catch (err) {
        console.error("API check error:", err);
        setApiStatus("error");
        setError(
          `API check failed: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      }
    }

    checkApiStatus();
  }, []);

  // Effect to focus input when shouldFocusInput is true
  useEffect(() => {
    if (shouldFocusInput && inputRef.current) {
      if (!inputRef.current.disabled) {
        inputRef.current.focus();
      }
      setShouldFocusInput(false);
    }
  }, [shouldFocusInput]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setSuggestedPrompts([]); // Clear suggestions when new message is sent
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      // Get response text first for better error handling
      const responseText = await response.text();

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse response as JSON:", responseText);
        throw new Error(
          `Server returned invalid JSON. Response: ${responseText.substring(
            0,
            100
          )}...`
        );
      }

      // Check if response is ok
      if (!response.ok) {
        throw new Error(
          data.details || data.error || `Server error: ${response.status}`
        );
      } // Add assistant response to chat
      if (data.message) {
        const assistantMessage = {
          ...data.message,
          suggestions: data.suggestions || [],
        };
        setMessages([...newMessages, assistantMessage]);
        setSuggestedPrompts(data.suggestions || []);
        setApiStatus("working");

        if (data.model) {
          setCurrentModelName(data.model);
        }

        // Store raw response for debugging
        if (data.rawResponse) {
          setDebugInfo(data.rawResponse);
        }

        // Log the response for debugging
        console.log("Response from model:", data.model, data.message.content);
      } else {
        throw new Error("Response missing message data");
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setApiStatus("error");

      // Add error message to chat for better UX
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setShouldFocusInput(true); // Trigger focus via useEffect
    }
  }
  function handleNewChat() {
    setMessages([initialSystemMessage]);
    setInput("");
    setError(null);
    setDebugInfo(null);
    setSuggestedPrompts([]);
    // Optionally, reset apiStatus if desired, or keep current model info
    // setApiStatus("untested"); // Uncomment if you want to re-trigger API status check visual
    // setCurrentModelName(null); // Uncomment if you want to clear model name on new chat
    setShouldFocusInput(true);
  }
  async function handleSuggestionClick(suggestion: string) {
    if (!suggestion.trim() || isLoading || apiStatus === "error") return;

    // Add user message to the chat
    const userMessage: Message = { role: "user", content: suggestion };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setSuggestedPrompts([]);
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      // Get response text first for better error handling
      const responseText = await response.text();

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse response as JSON:", responseText);
        throw new Error(
          `Server returned invalid JSON. Response: ${responseText.substring(
            0,
            100
          )}...`
        );
      }

      // Check if response is ok
      if (!response.ok) {
        throw new Error(
          data.details || data.error || `Server error: ${response.status}`
        );
      }

      // Add assistant response to chat
      if (data.message) {
        const assistantMessage = {
          ...data.message,
          suggestions: data.suggestions || [],
        };
        setMessages([...newMessages, assistantMessage]);
        setSuggestedPrompts(data.suggestions || []);
        setApiStatus("working");

        if (data.model) {
          setCurrentModelName(data.model);
        }

        // Store raw response for debugging
        if (data.rawResponse) {
          setDebugInfo(data.rawResponse);
        }

        // Log the response for debugging
        console.log("Response from model:", data.model, data.message.content);
      } else {
        throw new Error("Response missing message data");
      }
    } catch (err) {
      console.error("Chat error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setApiStatus("error");

      // Add error message to chat for better UX
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setShouldFocusInput(true); // Trigger focus via useEffect
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Gemini Chat</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNewChat}
          className="text-xs"
        >
          New Chat
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-2">
        Powered by Google's Gemini AI.{" "}
      </p>

      {/* API Status Indicator */}
      <div
        className={`mb-4 p-3 rounded-md ${
          apiStatus === "working"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : apiStatus === "error"
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        }`}
      >
        <div className="flex items-center">
          {apiStatus === "working" ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>
                API is working correctly. {""}
                {currentModelName
                  ? `Model: ${currentModelName}.`
                  : "Loading model information..."}
              </span>
            </>
          ) : apiStatus === "error" ? (
            <>
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>API error detected: {error}</span>
            </>
          ) : (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Checking API status...</span>
            </>
          )}
        </div>
      </div>

      {/* Model Information */}
      <div className="mb-4 p-3 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        <div className="flex items-start">
          <Info className="h-4 w-4 mr-2 mt-0.5" />
          <div>
            <p className="font-medium">About this demo:</p>
            <p className="text-sm mt-1">
              This chat uses Google's Gemini API to generate responses. The
              model will attempt to respond to your queries in a helpful and
              informative way.
            </p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div
        ref={messagesEndRef} // Assign ref to the messages container
        className="bg-card border border-border rounded-lg p-4 mb-4 max-h-screen overflow-y-auto"
      >
        {" "}
        {messages.slice(1).map((message, index) => (
          <div key={index}>
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                  : "bg-muted text-foreground max-w-[80%]"
              }`}
            >
              <p>{message.content}</p>
            </div>

            {/* Show suggestions only for the last assistant message and when not loading */}
            {message.role === "assistant" &&
              index === messages.slice(1).length - 1 &&
              message.suggestions &&
              message.suggestions.length > 0 &&
              !isLoading && (
                <div className="mb-4 max-w-[80%]">
                  <p className="text-sm text-muted-foreground mb-2">
                    Suggested prompts:
                  </p>
                  <div className="space-y-2">
                    {message.suggestions.map((suggestion, suggestionIndex) => (
                      <Button
                        key={suggestionIndex}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left justify-start h-auto p-3 text-sm whitespace-normal"
                        disabled={isLoading || apiStatus === "error"}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
        {/* Dummy div to help with scrolling to the very bottom if needed, though scrollTop = scrollHeight should work for the container itself */}
        {/* <div ref={messagesEndRef} /> */}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
          disabled={isLoading || apiStatus === "error"}
        />
        <Button
          type="submit"
          disabled={isLoading || apiStatus === "untested"}
          className="ml-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>

      {/* Controls Row */}
      <div className="mt-4 flex items-center">
        {/* Debug Information Button */}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs text-muted-foreground"
          >
            {showDebug ? "Hide Debug Info" : "Show Debug Info"}
          </Button>
        </div>

        {/* New Chat Button has been moved to the header */}
      </div>

      {showDebug && debugInfo && (
        <div className="mt-2 p-3 bg-muted rounded-md overflow-auto text-xs">
          <pre className="whitespace-pre-wrap break-all">{debugInfo}</pre>
        </div>
      )}

      <div className="mt-4 text-sm text-muted-foreground">
        <p>
          Note: You need to add a GEMINI_API_KEY environment variable to use
          this feature.
        </p>
        <p>
          Get your API key from{" "}
          <a
            href="https://ai.google.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google AI Studio
          </a>
        </p>
      </div>
    </div>
  );
}
