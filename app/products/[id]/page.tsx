export const dynamic = "force-dynamic" // This forces SSR

// This function runs on every request
export default async function ProductPage({ params }: { params: { id: string } }) {
  // Simulate fetching product data
  const product = await fetchProduct(params.id)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">Product: {product.name}</h1>
        <div className="h-2 w-32 bg-[#ffe492] mb-6"></div>

        <div className="bg-card rounded-lg shadow-md p-6 border border-border">
          <p className="text-muted-foreground mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-foreground">${product.price}</span>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>

        <div className="mt-8">        
          <h2 className="text-2xl font-bold text-foreground mb-4">Product Details</h2>
          <ul className="space-y-2 text-muted-foreground">
            {product.details.map((detail, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Mock function to simulate data fetching
async function fetchProduct(id: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id,
    name: `Product ${id}`,
    description:
      "This is a dynamic server-rendered product page. Each time you navigate to this page, the server generates the HTML with the current theme applied.",
    price: Math.floor(Math.random() * 100) + 9.99,
    details: [
      "Dynamically rendered on each request",
      "Supports dark mode through CSS variables",
      "Price randomly generated to prove SSR",
      "Created at: " + new Date().toLocaleTimeString(),
    ],
  }
}
