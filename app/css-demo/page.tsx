"use client"

import { useState, useRef } from "react"

export default function CssDemo() {
  // React state approach
  const [isRedBackground, setIsRedBackground] = useState(false)
  const [isLargeText, setIsLargeText] = useState(false)

  // Direct DOM manipulation approach
  const boxRef = useRef<HTMLDivElement>(null)

  // Toggle function using React state
  const toggleBackground = () => {
    setIsRedBackground((prev) => !prev)
  }

  // Toggle function using React state
  const toggleTextSize = () => {
    setIsLargeText((prev) => !prev)
  }

  // Toggle function using direct DOM manipulation
  const toggleBorder = () => {
    if (boxRef.current) {
      boxRef.current.classList.toggle("border-4")
      boxRef.current.classList.toggle("border-blue-500")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-8">CSS Class Manipulation Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-foreground mb-4">React State Approach (Recommended)</h2>
          <p className="text-muted-foreground mb-6">
            This approach uses React state to toggle classes, following React's principles of declarative UI.
          </p>

          <div
            className={`p-4 rounded-lg mb-4 transition-all duration-300 ${
              isRedBackground ? "bg-red-500 text-white" : "bg-gray-100 dark:bg-gray-800"
            }`}
          >
            <p className={`${isLargeText ? "text-xl" : "text-base"} transition-all duration-300`}>
              This box changes based on React state
            </p>
          </div>

          <div className="flex space-x-4">
            <button onClick={toggleBackground} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              Toggle Background
            </button>
            <button onClick={toggleTextSize} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              Toggle Text Size
            </button>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-foreground mb-4">Direct DOM Manipulation (Not Recommended)</h2>
          <p className="text-muted-foreground mb-6">
            This approach directly manipulates the DOM using classList, which is generally not recommended in React.
          </p>

          <div ref={boxRef} className="p-4 rounded-lg mb-4 bg-gray-100 dark:bg-gray-800 transition-all duration-300">
            <p>This box changes using direct DOM manipulation</p>
          </div>

          <button onClick={toggleBorder} className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Toggle Border
          </button>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-foreground mb-4">Explanation</h2>

        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">React State Approach</h3>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Uses React state to track UI changes</li>
          <li>Changes are declarative - we describe what the UI should look like</li>
          <li>React handles the DOM updates efficiently</li>
          <li>Follows React's mental model and best practices</li>
          <li>Works well with React's reconciliation process</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Direct DOM Approach</h3>
        <ul className="list-disc pl-6 text-muted-foreground mb-4">
          <li>Directly manipulates the DOM using classList</li>
          <li>Bypasses React's reconciliation process</li>
          <li>Can lead to inconsistencies between React's virtual DOM and the actual DOM</li>
          <li>May cause unexpected behavior during component re-renders</li>
          <li>Generally considered an anti-pattern in React</li>
        </ul>

        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Note</h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            CSS changes <strong>are</strong> side effects in React terms. They modify the DOM outside of React's normal
            rendering flow. That's why the React state approach is preferred - it keeps these changes within React's
            control.
          </p>
        </div>
      </div>
    </div>
  )
}
