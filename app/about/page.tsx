import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#212529] mb-4">About Whitepace</h1>
        <div className="h-2 w-64 bg-[#ffe492] mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Learn about our mission to create the best project management tool for teams of all sizes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-[#212529] mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Whitepace was founded in 2020 with a simple mission: to help teams work better together. We noticed that
            many teams were struggling with fragmented tools and complex workflows that hindered rather than helped
            their productivity.
          </p>
          <p className="text-gray-600 mb-4">
            Our founders, having experienced these challenges firsthand in their previous roles, set out to create a
            solution that would bring together document collaboration, project management, and team communication in one
            intuitive platform.
          </p>
          <p className="text-gray-600">
            Today, Whitepace is used by thousands of teams worldwide, from small startups to large enterprises, all
            benefiting from our approach to streamlined collaboration.
          </p>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Galeries%20Lafayette%20Building-Se97ENPrtcBHCmCeUu9I64Wf6MMaRL.jpeg"
            alt="Galeries Lafayette Building"
            fill
            className="rounded-lg object-cover shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold text-[#212529] mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#ffe492] rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#212529]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#212529] mb-3">Simplicity</h3>
            <p className="text-gray-600">
              We believe that the best tools get out of your way. We focus on creating intuitive interfaces that don't
              require extensive training.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#4f9cf9] rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#212529] mb-3">Collaboration</h3>
            <p className="text-gray-600">
              We're passionate about helping teams work together effectively, breaking down silos and fostering
              communication.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-[#00ca75] rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#212529] mb-3">Security</h3>
            <p className="text-gray-600">
              We take the security of your data seriously, implementing industry-leading practices to keep your
              information safe.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#212529] mb-6">Join Our Team</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          We're always looking for talented individuals who are passionate about creating great software and helping
          teams collaborate better.
        </p>
        <a
          href="#"
          className="bg-[#4f9cf9] text-white px-6 py-3 rounded-md inline-flex items-center gap-2 hover:bg-[#37a3ff] transition-colors"
        >
          View Open Positions
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
