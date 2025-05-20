import { ThemeCustomizer } from "@/components/theme-customizer"

export default function ThemeCustomizerPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Theme Customizer</h1>
        <div className="h-2 w-64 bg-[#ffe492] mx-auto mb-6"></div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Use our AI-powered theme customizer to create your perfect theme. Describe what you want, and we'll generate
          it for you.
        </p>
      </div>

      <ThemeCustomizer />

      <div className="mt-16 bg-card p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-foreground mb-4">How It Works</h2>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>Describe your ideal theme in natural language</li>
          <li>Our AI analyzes your request and generates a custom theme</li>
          <li>Preview the theme to see how it looks</li>
          <li>Apply the theme to your account</li>
        </ol>
        <p className="mt-4 text-muted-foreground">
          The theme customizer uses advanced AI to understand your requirements and generate a theme that matches your
          description.
        </p>
      </div>
    </div>
  )
}
