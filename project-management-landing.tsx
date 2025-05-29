import { ArrowRight } from "lucide-react";
import FeaturesSection from "./features-section";
import Image from "next/image";

export default function ProjectManagementLanding() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      {/* First Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-24 relative">
        <div className="relative z-10">
          <div className="relative">
            <h1 className="text-foreground text-5xl font-bold mb-2">
              react, nextjs & ai <br />
            </h1>
            <div className="h-2 w-64 bg-[#ffe492] -mt-3 mb-6"></div>
          </div>
          <p className="text-foreground mb-8 max-w-md">
            playground with various AI integrations.
          </p>
          <div className="text-foreground mb-8 max-w-md">
            <p className="font-semibold mb-2">Learn more about performance:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <a
                  href="https://developer.chrome.com/docs/devtools/memory-problems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-500"
                >
                  Chrome DevTools: Memory Problems
                </a>
              </li>
              <li>
                <a
                  href="https://web.dev/articles/rendering-performance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-500"
                >
                  Web.dev: Rendering Performance
                </a>
              </li>
              <li>
                <a
                  href="https://developer.chrome.com/docs/devtools/performance/reference"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-500"
                >
                  Chrome DevTools: Performance Reference
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative z-10">
          <div className="relative z-10 w-full h-[350px] md:h-[400px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Galeries%20Lafayette%20Building-E3e74ecoAiN9fxJrenuICgqATCqWN7.jpeg"
              alt="Galeries Lafayette Building"
              fill
              className="rounded-lg object-cover shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Background pattern */}
        <div className="absolute left-0 top-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="w-[600px] h-[600px] border border-gray-200 rounded-full absolute -left-64 -top-64"></div>
          <div className="w-[500px] h-[500px] border border-gray-200 rounded-full absolute -left-48 -top-48"></div>
          <div className="w-[400px] h-[400px] border border-gray-200 rounded-full absolute -left-32 -top-32"></div>
          <div className="w-[300px] h-[300px] border border-gray-200 rounded-full absolute -left-16 -top-16"></div>
          <div className="w-[200px] h-[200px] border border-gray-200 rounded-full absolute -left-0 -top-0"></div>
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
}
