import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"

const FeaturesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Customise Section */}
      <section className="mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Galeries%20Lafayette%20Building-Se97ENPrtcBHCmCeUu9I64Wf6MMaRL.jpeg"
              alt="Galeries Lafayette Building"
              fill
              className="rounded-lg object-cover shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-[#212529] mb-2">
              Customise it to
              <br />
              your needs
            </h2>
            <div className="h-2 w-32 bg-[#ffe492] mb-6"></div>
            <p className="text-gray-600 mb-6">
              Customise the app with plugins, custom themes and multiple text editors (Rich Text or Markdown). Or create
              your own scripts and plugins using the Extension API.
            </p>
            <button className="bg-[#4f9cf9] text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#37a3ff] transition-colors">
              Let's Go <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#212529] mb-2">
            Choose{" "}
            <span className="relative inline-block">
              Your Plan
              <div className="absolute bottom-0 left-0 h-2 w-full bg-[#ffe492]"></div>
            </span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6">
            Whether you want to get organized, keep your personal life on track, or boost workplace productivity,
            Whitepace has the right plan for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-4">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
            </div>
            <p className="text-gray-600 mb-6">Capture ideas and find them quickly</p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Sync unlimited devices</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>10 GB monthly uploads</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>200 MB max. note size</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Customize Home dashboard and access extra widgets</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Connect primary Google Calendar account</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Add due dates, reminders, and notifications to your tasks</span>
              </li>
            </ul>

            <button className="w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
              Get Started
            </button>
          </div>

          {/* Personal Plan */}
          <div className="bg-[#003366] text-white rounded-lg p-8 shadow-xl transform scale-105">
            <h3 className="text-xl font-bold mb-4">Personal</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$11.99</span>
            </div>
            <p className="text-gray-300 mb-6">Keep home and family on track</p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Sync unlimited devices</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>10 GB monthly uploads</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>200 MB max. note size</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Customize Home dashboard and access extra widgets</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Connect primary Google Calendar account</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Add due dates, reminders, and notifications to your tasks</span>
              </li>
            </ul>

            <button className="w-full bg-[#4f9cf9] text-white font-medium py-2 px-4 rounded-md hover:bg-[#37a3ff] transition-colors">
              Get Started
            </button>
          </div>

          {/* Organization Plan */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-4">Organization</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$49.99</span>
            </div>
            <p className="text-gray-600 mb-6">Capture ideas and find them quickly</p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Sync unlimited devices</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>10 GB monthly uploads</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>200 MB max. note size</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Customize Home dashboard and access extra widgets</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Connect primary Google Calendar account</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-[#4f9cf9] mr-2 mt-0.5 flex-shrink-0" />
                <span>Add due dates, reminders, and notifications to your tasks</span>
              </li>
            </ul>

            <button className="w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#212529] mb-2">
              Advanced
              <br />
              collaboration tools
            </h2>
            <div className="h-2 w-32 bg-[#ffe492] mb-6"></div>
            <p className="text-gray-600 mb-6">
              Work together seamlessly with your team with real-time editing, comments, and notifications. Share
              projects with anyone, anywhere.
            </p>
            <button className="bg-[#4f9cf9] text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#37a3ff] transition-colors">
              Learn More <ArrowRight size={18} />
            </button>
          </div>

          <div className="relative h-[400px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Galeries%20Lafayette%20Building-E3e74ecoAiN9fxJrenuICgqATCqWN7.jpeg"
              alt="Galeries Lafayette Building"
              fill
              className="rounded-lg object-cover shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturesPage
