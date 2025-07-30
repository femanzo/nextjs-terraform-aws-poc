import Image from "next/image";
import Link from "next/link";
import ApiDemo from "./components/ApiDemo";

export default function Home() {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative w-[180px] h-[38px]">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              fill
              priority
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Next.js Dynamic Routes Demo</h1>
        <p className="text-xl text-gray-600">
          Explore different types of dynamic routing patterns in Next.js 15
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Blog Routes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">📝 Blog Routes</h2>
          <p className="text-gray-600 mb-4">Single dynamic parameter routes</p>
          <div className="space-y-2">
            <Link 
              href="/blog" 
              className="block text-blue-500 hover:text-blue-700 font-medium"
            >
              /blog - Blog listing
            </Link>
            <Link 
              href="/blog/getting-started-with-nextjs" 
              className="block text-blue-500 hover:text-blue-700 font-medium"
            >
              /blog/[slug] - Individual post
            </Link>
          </div>
        </div>

        {/* User Routes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-green-600">👥 User Routes</h2>
          <p className="text-gray-600 mb-4">User profile pages with IDs</p>
          <div className="space-y-2">
            <Link 
              href="/users" 
              className="block text-green-500 hover:text-green-700 font-medium"
            >
              /users - User listing
            </Link>
            <Link 
              href="/users/1" 
              className="block text-green-500 hover:text-green-700 font-medium"
            >
              /users/[id] - User profile
            </Link>
          </div>
        </div>

        {/* Product Routes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">🛍️ Product Routes</h2>
          <p className="text-gray-600 mb-4">Nested dynamic parameters</p>
          <div className="space-y-2">
            <Link 
              href="/products" 
              className="block text-purple-500 hover:text-purple-700 font-medium"
            >
              /products - Categories
            </Link>
            <Link 
              href="/products/electronics" 
              className="block text-purple-500 hover:text-purple-700 font-medium"
            >
              /products/[category] - Category page
            </Link>
            <Link 
              href="/products/electronics/laptop-001" 
              className="block text-purple-500 hover:text-purple-700 font-medium"
            >
              /products/[category]/[productId] - Product detail
            </Link>
          </div>
        </div>

        {/* Documentation Routes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">📚 Documentation Routes</h2>
          <p className="text-gray-600 mb-4">Catch-all dynamic routes</p>
          <div className="space-y-2">
            <Link 
              href="/docs" 
              className="block text-orange-500 hover:text-orange-700 font-medium"
            >
              /docs - Documentation index
            </Link>
            <Link 
              href="/docs/getting-started" 
              className="block text-orange-500 hover:text-orange-700 font-medium"
            >
              /docs/getting-started - Section page
            </Link>
            <Link 
              href="/docs/getting-started/installation" 
              className="block text-orange-500 hover:text-orange-700 font-medium"
            >
              /docs/getting-started/installation - Sub-page
            </Link>
          </div>
        </div>

        {/* API Proxy Section */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-bold mb-4">🔌 API Proxy Examples</h2>
          <p className="text-gray-600 mb-6">
            Test our Next.js API proxy that forwards requests to external APIs. No authentication required!
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <ApiDemo
              title="GitHub API"
              description="Get public repository data"
              endpoint="github/users/octocat"
              color="text-blue-600"
            />
            <ApiDemo
              title="Crypto Prices"
              description="Real-time cryptocurrency data"
              endpoint="coingecko/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
              color="text-yellow-600"
            />
          </div>
          <div className="mt-6 text-center">
            <Link 
              href="/api/v2" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              View Full Documentation
            </Link>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-bold mb-4">✨ Features Demonstrated</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="font-semibold">Static Generation</h3>
              <p className="text-sm text-gray-600">All routes use Server-Side Rendering (SSR)</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold">Next.js 15</h3>
              <p className="text-sm text-gray-600">Async params with await</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <h3 className="font-semibold">Responsive Design</h3>
              <p className="text-sm text-gray-600">Mobile-first Tailwind CSS</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔗</div>
              <h3 className="font-semibold">Navigation</h3>
              <p className="text-sm text-gray-600">Breadcrumbs & back links</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500">
        <p>Built with Next.js 15 and TypeScript</p>
      </footer>
    </div>
  );
}
