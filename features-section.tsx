import {
  ArrowRight,
  FileText,
  Users,
  Lock,
  Bell,
  BarChart,
  Zap,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-foreground text-4xl font-bold mb-4">
            links to docs and blogs
          </h2>
          <div className="h-2 w-64 bg-[#ffe492] mx-auto mb-6"></div>
          <p className="text-foreground max-w-2xl mx-auto">
            a variety of demonstrations and tools built with
             web and AI technologies
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#c4defd] rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#4f9cf9]" /> {/* Changed icon */}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              AI Chat Integrations
            </h3>
            <p className="text-muted-foreground mb-4">
              Experiment with conversational AI models from Hugging Face and
              Google Gemini.
            </p>
            <a
              href="https://vercel.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore Vercel's Blog for AI Chat info"
              className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline"
            >
              Vercel Blog (AI Chats) <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 2 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#ffe492] rounded-lg flex items-center justify-center mb-4">
              {/* Using a generic Next.js or React icon might be better if available, for now, keeping Users as placeholder or changing */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-[#212529]"
              >
                <path d="M13 2L3 14h9l-1 8 10-12H11l1-8z" />
              </svg>{" "}
              {/* Changed icon to represent Next.js/React */}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Next.js 15+ Exploration
            </h3>
            <p className="text-muted-foreground mb-4">
              Leveraging the App Router, Server Components, API Routes, and
              other modern Next.js features.
            </p>
            <a
              href="https://react.dev/blog"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore React Blog for Next.js Demos"
              className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline"
            >
              React Blog (Next.js) <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 3 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#00ca75] rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" /> {/* Changed icon */}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              UI Component Showcase
            </h3>
            <p className="text-muted-foreground mb-4">
              Interactive demonstrations of Shadcn/UI components styled with
              Tailwind CSS.
            </p>
            <a
              href="https://tailwindcss.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore Tailwind CSS Blog for UI Components"
              className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline"
            >
              Tailwind CSS Blog (UI) <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 4 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#ff5758] rounded-lg flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Dynamic Theming
            </h3>
            <p className="text-muted-foreground mb-4">
              Customize the look and feel of the application with light, dark,
              and system themes.
            </p>
            <a
              href="https://web.dev/blog"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore web.dev Blog for Theming info"
              className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline"
            >
              web.dev Blog (Theming) <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 5 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#4f9cf9] rounded-lg flex items-center justify-center mb-4">
              <BarChart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              API Route Examples
            </h3>
            <p className="text-muted-foreground mb-4">
              Backend logic demonstrations using Next.js API routes for various
              functionalities.
            </p>
            <a
              href="https://devblogs.microsoft.com/typescript/"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore TypeScript Blog for API Examples"
              className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline"
            >
              TypeScript Blog (APIs) <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Feature 6 */}
          <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#ffbf60] rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" /> {/* Changed icon */}
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Code & Concept Demos
            </h3>
            <p className="text-muted-foreground mb-4">
              Small, focused examples illustrating specific coding techniques
              and web concepts.
            </p>
            <a
              href="https://vercel.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              title="Explore Vercel's Blog for Code Snippets"
              className="text-[#4f9cf9] font-medium flex items-center gap-1 hover:underline"
            >
              Vercel Blog (Snippets) <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <a
            href="https://vercel.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            title="Explore Vercel's Blog for All Experiments"
            className="bg-[#4f9cf9] text-white px-8 py-4 rounded-md inline-flex items-center gap-2 hover:bg-[#37a3ff] transition-colors"
          >
            Vercel Blog <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
