import siteData from '@/data/siteData.json';

export type Startup = typeof siteData.startups[0];
export type HeroStory = typeof siteData.heroStories[0];
export type Founder = typeof siteData.founders[0];
export type Country = typeof siteData.countries[0];
export type Sector = typeof siteData.sectors[0];
export type Short = typeof siteData.shorts[0];
export type Carousel = typeof siteData.carousels[0];
export type Article = typeof siteData.articles[0];

// Centralized Data Layer
export async function getSiteData() {
  return siteData;
}
