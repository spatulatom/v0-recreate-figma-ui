export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
        <div className="h-2 w-64 bg-[#ffe492] mx-auto mb-6"></div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Our team is always ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            Fill out the form and our team will get back to you within 24 hours. We're here to help with any questions
            about our products, services, or anything else you might need.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#c4defd] rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#4f9cf9]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Phone</h3>
                <p className="mt-1 text-muted-foreground">+1 (555) 123-4567</p>
                <p className="mt-1 text-muted-foreground">Monday-Friday, 9AM-6PM EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#c4defd] rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#4f9cf9]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Email</h3>
                <p className="mt-1 text-muted-foreground">info@whitepace.com</p>
                <p className="mt-1 text-muted-foreground">support@whitepace.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#c4defd] rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#4f9cf9]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Office</h3>
                <p className="mt-1 text-muted-foreground">123 Innovation Street</p>
                <p className="mt-1 text-muted-foreground">Tech City, 10001</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className="bg-card p-8 rounded-lg shadow-md border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f9cf9] focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f9cf9] focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f9cf9] focus:border-transparent"
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f9cf9] focus:border-transparent"
                placeholder="How can we help you?"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4f9cf9] focus:border-transparent"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4f9cf9] text-white px-6 py-3 rounded-md font-medium hover:bg-[#37a3ff] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">How do I get started with Whitepace?</h3>
            <p className="text-muted-foreground">
              Getting started is easy! Simply sign up for a free account on our website, and you'll be guided through
              the setup process. You can also book a demo with our team for a personalized onboarding experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Is there a free trial available?</h3>
            <p className="text-muted-foreground">
              Yes, we offer a 14-day free trial with full access to all features. No credit card required to get
              started.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">What kind of support do you offer?</h3>
            <p className="text-muted-foreground">
              We provide 24/7 email support for all customers. Premium plans also include priority support and dedicated
              account managers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Can I import data from other tools?</h3>
            <p className="text-muted-foreground">
              Whitepace supports importing data from most popular project management and note-taking tools. Our team can
              also help with custom migrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
