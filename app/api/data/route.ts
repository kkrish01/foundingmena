import { NextResponse } from 'next/server';
import siteData from '@/data/siteData.json';

// API Route: /api/data
// Allows fetching full data or filtering by type (?type=startups | stories | founders | countries | sectors)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'startups') {
    return NextResponse.json(siteData.startups);
  }
  if (type === 'stories') {
    return NextResponse.json(siteData.heroStories);
  }
  if (type === 'founders') {
    return NextResponse.json(siteData.founders);
  }
  if (type === 'countries') {
    return NextResponse.json(siteData.countries);
  }
  if (type === 'sectors') {
    return NextResponse.json(siteData.sectors);
  }

  return NextResponse.json(siteData);
}
