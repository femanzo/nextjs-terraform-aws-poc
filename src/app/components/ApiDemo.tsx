'use client';

import { useState } from 'react';

interface ApiDemoProps {
  title: string;
  description: string;
  endpoint: string;
  color: string;
}

export default function ApiDemo({ title, description, endpoint, color }: ApiDemoProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/v2/${endpoint}`);
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
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className={`font-semibold ${color} mb-2`}>{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <button
        onClick={testApi}
        disabled={loading}
        className={`inline-block ${color.replace('text-', 'bg-').replace('-600', '-500')} hover:${color.replace('text-', 'bg-')} text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50`}
      >
        {loading ? 'Loading...' : 'Test API'}
      </button>

      {error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs">
          <p className="text-red-700 font-medium">Error:</p>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Response:</p>
          <div className="bg-gray-50 border border-gray-200 rounded p-2 text-xs">
            <pre className="text-gray-800 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
} 