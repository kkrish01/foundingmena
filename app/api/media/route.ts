import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const rangeHeader = request.headers.get('range');
    const headers: Record<string, string> = {
      'Referer': 'https://foundingmena.com/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };

    if (rangeHeader) {
      headers['Range'] = rangeHeader;
    }

    const response = await fetch(targetUrl, {
      headers,
      cache: 'force-cache'
    });

    const responseHeaders = new Headers();
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');
    const contentRange = response.headers.get('content-range');
    const acceptRanges = response.headers.get('accept-ranges') || 'bytes';

    responseHeaders.set('Content-Type', contentType);
    if (contentLength) responseHeaders.set('Content-Length', contentLength);
    if (contentRange) responseHeaders.set('Content-Range', contentRange);
    responseHeaders.set('Accept-Ranges', acceptRanges);
    responseHeaders.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');

    return new NextResponse(response.body, {
      status: response.status,
      headers: responseHeaders
    });
  } catch (error: any) {
    console.error('Media proxy error:', error);
    return new NextResponse(`Proxy error: ${error.message}`, { status: 500 });
  }
}
