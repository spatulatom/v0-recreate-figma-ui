import { experimental_createMCPClient } from "ai"
import { openai } from "@ai-sdk/openai"

// Function to create and initialize the MCP client
export async function createMCPClient() {
  // Initialize an MCP client to connect to a server
  const client = await experimental_createMCPClient({
    transport: {
      type: "sse",
      url: process.env.MCP_SERVER_URL || "https://api.zapier.com/v1/mcp/sse",
    },
  })

  return client
}

// Function to generate text using the OpenAI model
export async function generateWithOpenAI(prompt: string) {
  try {
    const { text } = await openai.generateText({
      model: "gpt-4o",
      prompt,
    })
    return text
  } catch (error) {
    console.error("Error generating text:", error)
    return "Error generating response. Please try again."
  }
}

// Helper function to close the MCP client
export async function closeMCPClient(client: any) {
  if (client) {
    await client.close()
  }
}
