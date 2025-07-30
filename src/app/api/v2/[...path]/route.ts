import { NextRequest, NextResponse } from 'next/server';

// Configuration for external API endpoints
const API_CONFIG = {
  // GitHub API (public endpoints, no auth required for basic usage)
  'github': {
    baseUrl: 'https://api.github.com',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
    },
  },
  // CoinGecko API (free crypto data, no auth required)
  'coingecko': {
    baseUrl: 'https://api.coingecko.com/api/v3',
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'DELETE');
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  return handleProxyRequest(request, resolvedParams.path, 'PATCH');
}

async function handleProxyRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string
) {
  try {
    // Extract the API service name from the first path segment
    const [serviceName, ...remainingPath] = pathSegments;
    
    if (!serviceName) {
      return NextResponse.json(
        { error: 'Service name is required. Available services: ' + Object.keys(API_CONFIG).join(', ') },
        { status: 400 }
      );
    }

    const apiConfig = API_CONFIG[serviceName as keyof typeof API_CONFIG];
    
    if (!apiConfig) {
      return NextResponse.json(
        { error: `Unknown service: ${serviceName}. Available services: ${Object.keys(API_CONFIG).join(', ')}` },
        { status: 400 }
      );
    }

    // Construct the target URL
    const targetPath = remainingPath.join('/');
    const targetUrl = `${apiConfig.baseUrl}/${targetPath}`;
    
    // Get query parameters from the original request
    const url = new URL(request.url);
    const queryString = url.search;
    const finalUrl = queryString ? `${targetUrl}${queryString}` : targetUrl;

    // Prepare headers
    const headers = new Headers(apiConfig.headers);
    
    // Forward relevant headers from the original request
    const forwardHeaders = ['authorization', 'content-type', 'user-agent'];
    forwardHeaders.forEach(header => {
      const value = request.headers.get(header);
      if (value) {
        headers.set(header, value);
      }
    });

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
    };

    // Add body for methods that support it
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const body = await request.text();
      if (body) {
        requestOptions.body = body;
      }
    }

    // Make the request to the external API
    const response = await fetch(finalUrl, requestOptions);
    
    // Get the response data
    const responseData = await response.text();
    
    // Try to parse as JSON, fallback to text
    let parsedData;
    try {
      parsedData = JSON.parse(responseData);
    } catch {
      parsedData = responseData;
    }

    // Create response headers
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', response.headers.get('content-type') || 'application/json');
    
    // Forward relevant response headers
    const forwardResponseHeaders = ['cache-control', 'etag', 'last-modified'];
    forwardResponseHeaders.forEach(header => {
      const value = response.headers.get(header);
      if (value) {
        responseHeaders.set(header, value);
      }
    });

    return NextResponse.json(parsedData, {
      status: response.status,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Proxy request failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 