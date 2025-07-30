'use client';

import { useState } from 'react';

export default function ApiV2TestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testEndpoint = async (endpoint: string, method: string = 'GET', body?: any) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`/api/v2/${endpoint}`, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              API Proxy Test Page
            </h1>
            <p className="text-gray-600">
              Test the proxy functionality with these interactive examples.
            </p>
          </div>

          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* GitHub API Tests */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">GitHub API</h2>
                
                <div className="space-y-3">
                  <button
                    onClick={() => testEndpoint('github/users/octocat')}
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Get Octocat User
                  </button>

                  <button
                    onClick={() => testEndpoint('github/repos/facebook/react')}
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Get React Repository
                  </button>

                  <button
                    onClick={() => testEndpoint('github/search/repositories?q=nextjs&sort=stars')}
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Search Next.js Repos
                  </button>

                  <button
                    onClick={() => testEndpoint('github/rate_limit')}
                    disabled={loading}
                    className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Check Rate Limit
                  </button>
                </div>
              </div>

              {/* CoinGecko API Tests */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">CoinGecko API</h2>
                
                <div className="space-y-3">
                  <button
                    onClick={() => testEndpoint('coingecko/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur')}
                    disabled={loading}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Get Crypto Prices
                  </button>

                  <button
                    onClick={() => testEndpoint('coingecko/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5')}
                    disabled={loading}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Top 5 Cryptocurrencies
                  </button>

                  <button
                    onClick={() => testEndpoint('coingecko/coins/bitcoin')}
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Bitcoin Details
                  </button>

                  <button
                    onClick={() => testEndpoint('coingecko/exchanges?per_page=5')}
                    disabled={loading}
                    className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Top Exchanges
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Making request...
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Response</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <pre className="text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">How it works</h3>
              <p className="text-blue-700 mb-2">
                When you click a button above, it makes a request to your Next.js server at <code className="bg-blue-100 px-1 rounded">/api/v2/[service]/[endpoint]</code>.
              </p>
              <p className="text-blue-700">
                The server then forwards the request to the external API (JSONPlaceholder or HTTPBin) and returns the response back to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 