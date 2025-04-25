"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

// Component that will re-render when theme changes
function ThemeAwareComponent() {
  const { theme } = useTheme()
  const [renderCount, setRenderCount] = useState(0)

  // Increment render count on each render
  useEffect(() => {
    setRenderCount((prev) => prev + 1)
  }, [theme])

  return (
    <div className="bg-card p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold text-foreground mb-2">Theme-Aware Component</h3>
      <p className="text-muted-foreground mb-4">
        This component uses the useTheme hook, so it re-renders when theme changes.
      </p>
      <div className="flex space-x-4 items-center">
        <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Current theme: <strong>{theme}</strong>
        </div>
        <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
          Render count: <strong>{renderCount}</strong>
        </div>
      </div>
    </div>
  )
}

// Component that will NOT re-render when theme changes
function ThemeUnawareComponent() {
  // Use ref for tracking renders without re-rendering
  const renderCountRef = useRef(0)
  
  // This will run on every render without causing loops
  useEffect(() => {
    renderCountRef.current += 1
  })

  return (
    <div className="bg-card p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold text-foreground mb-2">Theme-Unaware Component</h3>
      <p className="text-muted-foreground mb-4">
        This component doesn't use the useTheme hook, so it doesn't re-render when theme changes.
      </p>
      <div className="flex space-x-4 items-center">
        <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Uses theme CSS variables</div>
        <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
          Render count: <strong>{renderCountRef.current}</strong>
        </div>
      </div>
    </div>
  )
}

export default function ThemeRenderingDemo() {
  const { theme, setTheme } = useTheme()
  const [renderCount, setRenderCount] = useState(0)

  // Increment render count on each render
  useEffect(() => {
    setRenderCount((prev) => prev + 1)
  }, [theme])

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-8">Theme Rendering Behavior Demo</h1>

      <div className="bg-card p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Parent Component</h2>
        <p className="text-muted-foreground mb-6">
          This component uses the useTheme hook to change the theme, so it re-renders when theme changes.
        </p>
        <div className="flex space-x-4 items-center mb-6">
          <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Current theme: <strong>{theme}</strong>
          </div>
          <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
            Render count: <strong>{renderCount}</strong>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 rounded-md ${theme === "light" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 rounded-md ${theme === "dark" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Dark Mode
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`px-4 py-2 rounded-md ${theme === "system" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            System
          </button>
        </div>
      </div>

      <ThemeAwareComponent />
      <ThemeUnawareComponent />

      <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg mt-8">
        <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">Explanation</h2>

        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
          Re-rendering vs. CSS Changes
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300 mb-4">
          When you change the theme, only components that <strong>directly consume the theme state</strong> via
          useTheme() will re-render. Components that just use theme-based CSS variables will update their appearance
          without re-rendering.
        </p>

        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">How This Works</h3>
        <ol className="list-decimal pl-6 text-yellow-700 dark:text-yellow-300 mb-4">
          <li className="mb-2">When theme changes, ThemeProvider updates the class on the HTML element</li>
          <li className="mb-2">CSS variables change values based on the class</li>
          <li className="mb-2">Elements using those CSS variables update visually</li>
          <li className="mb-2">Only components that call useTheme() re-render</li>
        </ol>

        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Why This Is Efficient</h3>
        <p className="text-yellow-700 dark:text-yellow-300">
          This approach is highly efficient because it separates visual updates (CSS) from component re-rendering
          (React). Most of your UI can update its appearance without the performance cost of re-rendering.
        </p>
      </div>
    </div>
  )
}
