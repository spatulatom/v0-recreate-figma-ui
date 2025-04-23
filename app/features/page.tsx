import Image from "next/image"

const FeaturesPage = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold text-center mb-8">Our Amazing Features</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Customizable Dashboard</h2>
          <div className="relative w-full h-[300px]">
            <Image
              src="/images/features-customize.png"
              alt="Customizable Dashboard"
              fill
              className="rounded-lg object-cover shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p className="text-gray-700 mt-4 text-center">
            Tailor your dashboard to see the information that matters most to you.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Advanced Analytics</h2>
          <div className="bg-[#c4defd] rounded-lg h-80 w-full"></div>
          <p className="text-gray-700 mt-4 text-center">
            Gain deep insights into your data with our powerful analytics tools.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Real-time Collaboration</h2>
          <div className="bg-[#c4defd] rounded-lg h-80 w-full"></div>
          <p className="text-gray-700 mt-4 text-center">
            Work seamlessly with your team in real-time, no matter where they are.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Advanced Features</h2>
          <div className="relative w-full h-[300px]">
            <Image
              src="/images/features-customize.png"
              alt="Advanced Features"
              fill
              className="rounded-lg object-cover shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p className="text-gray-700 mt-4 text-center">
            Unlock the full potential of our platform with advanced features.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPage
