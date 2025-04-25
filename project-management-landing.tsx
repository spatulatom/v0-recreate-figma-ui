import { ArrowRight } from "lucide-react"
import FeaturesSection from "./features-section"
import Image from "next/image"

export default function ProjectManagementLanding() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      {/* First Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-24 relative">
        <div className="relative z-10">
          <div className="relative">
            <h1 className="text-foreground text-5xl font-bold mb-2">
              Project <br />
              Management
            </h1>
            <div className="h-2 w-64 bg-[#ffe492] -mt-3 mb-6"></div>
          </div>
          <p className="text-foreground mb-8 max-w-md">
            Images, videos, PDFs and audio files are supported. Create math expressions and diagrams directly from the
            app. Take photos with the mobile app and save them to a note.
          </p>
          <button className="bg-[#4f9cf9] text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#37a3ff] transition-colors">
            Get Started <ArrowRight size={18} />
          </button>
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

      {/* Second Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-24">
        <div className="relative">
          {/* Outer circle with dots */}
          <div className="relative w-[400px] h-[400px] mx-auto">
            {/* Outer circle */}
            <div className="absolute inset-0 border-2 border-dashed border-[#c4defd] rounded-full"></div>

            {/* Inner circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border-2 border-dashed border-[#c4defd] rounded-full"></div>

            {/* Center icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-background shadow-lg rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-[#4f9cf9] mask mask-triangle-4"></div>
            </div>

            {/* Dots on outer circle */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ffdc4d] rounded-full"></div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#4f9cf9] rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-[#ffbf60] rounded-full"></div>
            <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#ff5758] rounded-full"></div>

            {/* Dots on inner circle */}
            <div className="absolute top-1/4 right-1/4 w-10 h-10 bg-[#4f9cf9] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-10 h-10 bg-[#4f9cf9] rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/4 w-10 h-10 bg-[#4f9cf9] rounded-full"></div>

            {/* Additional dots */}
            <div className="absolute top-[15%] left-[40%] w-10 h-10 bg-[#00ca75] rounded-full"></div>
            <div className="absolute bottom-[15%] right-[30%] w-10 h-10 bg-[#00ca75] rounded-full"></div>
          </div>
        </div>

        <div>
          <h2 className="text-foreground text-5xl font-bold mb-6">Work together</h2>
          <p className="text-foreground mb-8 max-w-md">
            With whitepace, share your notes with your colleagues and collaborate on them. You can also publish a note
            to the internet and share the URL with others.
          </p>
          <button className="bg-[#4f9cf9] text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#37a3ff] transition-colors">
            Try it now <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-32 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-foreground text-4xl font-bold mb-4">What our customers say</h2>
          <div className="h-2 w-64 bg-[#ffe492] mx-auto mb-6"></div>
          <p className="text-foreground max-w-2xl mx-auto">
            Discover how teams of all sizes are using Whitepace to improve their productivity and workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-background rounded-lg p-8 shadow-lg relative">
            <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#ffdc4d] rounded-full"></div>
            <div className="mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.33333 20H4L8 12H5.33333V4H16V14.6667L9.33333 20ZM25.3333 20H20L24 12H21.3333V4H32V14.6667L25.3333 20Z"
                  fill="#4f9cf9"
                />
              </svg>
            </div>
            <p className="text-foreground mb-6">
              "Whitepace has revolutionized how our team collaborates on projects. The ability to share notes and work
              together in real-time has significantly improved our productivity."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#c4defd] rounded-full flex items-center justify-center mr-4">
                <span className="text-[#4f9cf9] font-bold">JD</span>
              </div>
              <div>
                <h4 className="font-bold text-foreground">Jane Doe</h4>
                <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-background rounded-lg p-8 shadow-lg relative">
            <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#00ca75] rounded-full"></div>
            <div className="mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.33333 20H4L8 12H5.33333V4H16V14.6667L9.33333 20ZM25.3333 20H20L24 12H21.3333V4H32V14.6667L25.3333 20Z"
                  fill="#4f9cf9"
                />
              </svg>
            </div>
            <p className="text-foreground mb-6">
              "The math expressions and diagram features are game-changers for our engineering team. We can document
              complex ideas directly in our notes without switching between multiple apps."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#c4defd] rounded-full flex items-center justify-center mr-4">
                <span className="text-[#4f9cf9] font-bold">RS</span>
              </div>
              <div>
                <h4 className="font-bold text-foreground">Robert Smith</h4>
                <p className="text-sm text-muted-foreground">Lead Engineer, InnovateCo</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-background rounded-lg p-8 shadow-lg relative">
            <div className="absolute -top-5 -left-5 w-10 h-10 bg-[#ff5758] rounded-full"></div>
            <div className="mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.33333 20H4L8 12H5.33333V4H16V14.6667L9.33333 20ZM25.3333 20H20L24 12H21.3333V4H32V14.6667L25.3333 20Z"
                  fill="#4f9cf9"
                />
              </svg>
            </div>
            <p className="text-foreground mb-6">
              "As a remote team, we needed a solution that would help us stay connected and organized. Whitepace has
              been that solution. The ability to publish notes to the internet has made sharing with clients seamless."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#c4defd] rounded-full flex items-center justify-center mr-4">
                <span className="text-[#4f9cf9] font-bold">AL</span>
              </div>
              <div>
                <h4 className="font-bold text-foreground">Amanda Lee</h4>
                <p className="text-sm text-muted-foreground">Creative Director, DesignHub</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-background border border-[#4f9cf9] text-[#4f9cf9] px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#f8fafc] transition-colors">
            Read more testimonials <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
