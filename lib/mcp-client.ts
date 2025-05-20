import { OpenAI } from "openai"

// Function to generate a theme using OpenAI directly
export async function generateTheme(prompt: string) {
  try {
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Use OpenAI to generate a theme
    const result = await openai.chat.completions.create({
      model: "o1",
      messages: [
        {
          role: "system",
          content: `You are a theme generation assistant. Generate a CSS theme based on the user's description.
          Use HSL color format for all colors. Include variables for both light and dark themes.
          Include the following CSS variables:
          - --background
          - --foreground
          - --card
          - --card-foreground
          - --primary
          - --primary-foreground
          - --secondary
          - --secondary-foreground
          - --muted
          - --muted-foreground
          - --accent
          - --accent-foreground
          - --destructive
          - --destructive-foreground
          - --border
          - --input
          - --ring
          
          Format your response as valid CSS with both :root {} and .dark {} sections.`,
        },
        {
          role: "user",
          content: `Generate a theme based on this description: ${prompt}`,
        },
      ],
      temperature: 0.7,
    })

    // Get the generated CSS
    const generatedCSS = result.choices[0].message.content || "/* No CSS generated */"
    return generatedCSS
  } catch (error) {
    console.error("Error generating theme:", error)
    throw error
  }
}
