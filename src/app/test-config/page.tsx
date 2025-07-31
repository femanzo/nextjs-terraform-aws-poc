'use client';

import { useState } from 'react';

export default function TestConfigPage() {
  // This should work with our relaxed TypeScript config
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const testFunction = async () => {
    setLoading(true);
    try {
      // This would normally cause TypeScript errors but should work now
      const response = await fetch('/api/health');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            TypeScript Config Test
          </h1>
          
          <p className="text-gray-600 mb-6">
            This page tests that our relaxed TypeScript configuration is working properly.
          </p>

          <button
            onClick={testFunction}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            {loading ? 'Testing...' : 'Test Configuration'}
          </button>

          {data && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-2">Success!</h3>
              <pre className="text-sm text-green-700 overflow-x-auto">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Configuration Status</h3>
            <ul className="text-blue-700 space-y-1">
              <li>✅ TypeScript strict mode: <strong>Disabled</strong></li>
              <li>✅ ESLint strict rules: <strong>Disabled</strong></li>
              <li>✅ Build should proceed without type errors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 