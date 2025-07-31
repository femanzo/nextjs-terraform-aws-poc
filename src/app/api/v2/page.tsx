export default function ApiV2Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              API Proxy Documentation
            </h1>
            <p className="text-gray-600">
              This proxy allows you to call external APIs through your Next.js server at the `/api/v2` endpoint.
            </p>
          </div>
          
          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Available Services
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  GitHub API
                </h3>
                <p className="text-blue-700 mb-4">
                  Access public GitHub data including repositories, users, and more.
                </p>
                <div className="space-y-2">
                  <div className="bg-white rounded p-3">
                    <code className="text-sm text-gray-800">
                      GET /api/v2/github/users/octocat
                    </code>
                  </div>
                  <div className="bg-white rounded p-3">
                    <code className="text-sm text-gray-800">
                      GET /api/v2/github/repos/facebook/react
                    </code>
                  </div>
                  <div className="bg-white rounded p-3">
                    <code className="text-sm text-gray-800">
                      GET /api/v2/github/search/repositories?q=nextjs
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900 mb-2">
                  CoinGecko API
                </h3>
                <p className="text-green-700 mb-4">
                  Get real-time cryptocurrency data and market information.
                </p>
                <div className="space-y-2">
                  <div className="bg-white rounded p-3">
                    <code className="text-sm text-gray-800">
                      GET /api/v2/coingecko/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10
                    </code>
                  </div>
                  <div className="bg-white rounded p-3">
                    <code className="text-sm text-gray-800">
                      GET /api/v2/coingecko/coins/bitcoin
                    </code>
                  </div>
                  <div className="bg-white rounded p-3">
                    <code className="text-sm text-gray-800">
                      GET /api/v2/coingecko/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Usage Examples
            </h2>
            
            <div className="space-y-4">
                             <div className="bg-gray-50 rounded-lg p-4">
                 <h4 className="font-medium text-gray-900 mb-2">JavaScript/TypeScript</h4>
                 <pre className="text-sm text-gray-800 overflow-x-auto">
{`// Get GitHub user data
const user = await fetch('/api/v2/github/users/octocat');
const userData = await user.json();

// Get cryptocurrency prices
const crypto = await fetch('/api/v2/coingecko/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
const prices = await crypto.json();

// Get top cryptocurrencies
const topCoins = await fetch('/api/v2/coingecko/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5');
const marketData = await topCoins.json();

// Search GitHub repositories
const repos = await fetch('/api/v2/github/search/repositories?q=nextjs&sort=stars');
const repoData = await repos.json();`}
                 </pre>
               </div>

                             <div className="bg-gray-50 rounded-lg p-4">
                 <h4 className="font-medium text-gray-900 mb-2">cURL</h4>
                 <pre className="text-sm text-gray-800 overflow-x-auto">
{`# Get GitHub user data
curl http://localhost:3000/api/v2/github/users/octocat

# Get cryptocurrency prices
curl "http://localhost:3000/api/v2/coingecko/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"

# Get top cryptocurrencies
curl "http://localhost:3000/api/v2/coingecko/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5"

# Search GitHub repositories
curl "http://localhost:3000/api/v2/github/search/repositories?q=nextjs&sort=stars"

# Get React repository details
curl http://localhost:3000/api/v2/github/repos/facebook/react`}
                 </pre>
               </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Features
            </h2>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Supports all HTTP methods (GET, POST, PUT, DELETE, PATCH)</li>
              <li>Forwards query parameters automatically</li>
              <li>Preserves request headers (Authorization, Content-Type, User-Agent)</li>
              <li>Handles both JSON and text responses</li>
              <li>Error handling with detailed error messages</li>
              <li>Easy to extend with new external APIs</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Adding New Services
            </h2>
            
            <p className="text-gray-700 mb-4">
              To add a new external API service, update the <code className="bg-gray-100 px-1 rounded">API_CONFIG</code> object in the route file:
            </p>
            
            <pre className="bg-gray-50 rounded-lg p-4 text-sm text-gray-800 overflow-x-auto">
{`const API_CONFIG = {
  // ... existing services
  'myapi': {
    baseUrl: 'https://api.example.com',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY', // if needed
    },
  },
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
} 