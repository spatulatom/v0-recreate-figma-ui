"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Palette, Wand2 } from "lucide-react"

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme()
  const [prompt, setPrompt] = useState("")
  const [generatedCSS, setGeneratedCSS] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState("")
  const [isExample, setIsExample] = useState(false)

  async function generateTheme() {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError("")
    setIsExample(false)

    try {
      const response = await fetch("/api/theme-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Failed to generate theme: ${data.details || data.error || response.statusText}`)
      }

      setGeneratedCSS(data.css || "/* No CSS generated */")
      setIsExample(data.isExample || false)
      setShowPreview(true)
    } catch (err) {
      console.error("Error generating theme:", err)
      setError(`An error occurred: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setIsGenerating(false)
    }
  }

  function applyTheme() {
    try {
      // Create a style element
      const styleElement = document.createElement("style")
      styleElement.textContent = generatedCSS

      // Add an ID to easily find/remove it later
      styleElement.id = "custom-theme-styles"

      // Remove any existing custom theme styles
      const existingStyles = document.getElementById("custom-theme-styles")
      if (existingStyles) {
        existingStyles.remove()
      }

      // Add the new styles to the document head
      document.head.appendChild(styleElement)

      // Alert the user
      alert("Theme applied! The custom theme has been applied to the page.")
    } catch (err) {
      console.error("Error applying theme:", err)
      alert("Failed to apply theme. See console for details.")
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Customizer
        </CardTitle>
        <CardDescription>Describe your ideal theme and our AI will generate it for you.</CardDescription>
      </CardHeader>
      <CardContent>
        {!showPreview ? (
          <div className="space-y-4">
            <textarea
              placeholder="Describe your ideal theme. For example: 'A dark theme with purple accents and good contrast for accessibility'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        ) : (
          <div className="space-y-4">
            {isExample && (
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-md mb-4">
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  This is an example theme. To get AI-generated themes, add your OpenAI API key to the environment
                  variables.
                </p>
              </div>
            )}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto max-h-[300px]">
              <pre className="text-sm">{generatedCSS}</pre>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {showPreview ? (
          <>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Back to Prompt
            </Button>
            <Button onClick={applyTheme}>Apply Theme</Button>
          </>
        ) : (
          <>
            <div></div> {/* Empty div for spacing */}
            <Button onClick={generateTheme} disabled={isGenerating || !prompt.trim()}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Theme
                </>
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
