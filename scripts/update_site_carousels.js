const fs = require('fs');

const cleaned = JSON.parse(fs.readFileSync('scripts/cleaned_carousels.json', 'utf8'));
const siteData = JSON.parse(fs.readFileSync('data/siteData.json', 'utf8'));

// Format carousels for siteData
const formatted = [
  {
    id: 'weekly-roundup-sept-21-25',
    slug: 'weekly-roundup-sept-21-25',
    href: '/read/weekly-roundup-sept-21-25',
    title: cleaned['weekly-roundup-sept-21-25'].title,
    description: cleaned['weekly-roundup-sept-21-25'].description,
    image: cleaned['weekly-roundup-sept-21-25'].slides[0],
    slides: cleaned['weekly-roundup-sept-21-25'].slides,
    slideCount: 9,
    dur: '9 slides',
    date: '28 SEP 2026',
    byline: 'FM DESK',
    country: 'Egypt',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/egypt.svg',
    sector: 'Fintech',
    tags: ['Egypt', 'Fintech', 'Weekly Roundup']
  },
  {
    id: 'mckinsey-mafia',
    slug: 'mckinsey-mafia',
    href: '/read/mckinsey-mafia',
    title: cleaned['mckinsey-mafia'].title,
    description: cleaned['mckinsey-mafia'].description,
    image: cleaned['mckinsey-mafia'].slides[0],
    slides: cleaned['mckinsey-mafia'].slides,
    slideCount: 9,
    dur: '9 slides',
    date: '25 SEP 2026',
    byline: 'FM DESK',
    country: 'Saudi Arabia',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/saudi-arabia.svg',
    sector: 'Fintech',
    tags: ['Fintech', 'McKinsey Mafia']
  },
  {
    id: 'top-women-founders',
    slug: 'top-women-founders',
    href: '/read/top-women-founders',
    title: cleaned['top-women-founders'].title,
    description: cleaned['top-women-founders'].description,
    image: cleaned['top-women-founders'].slides[0],
    slides: cleaned['top-women-founders'].slides,
    slideCount: 10,
    dur: '10 slides',
    date: '24 SEP 2026',
    byline: 'FM DESK',
    country: 'Turkey',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/turkey.svg',
    sector: 'Retail',
    tags: ['Retail', 'Top Women Founders']
  },
  {
    id: 'qatar-university',
    slug: 'qatar-university',
    href: '/read/qatar-university-carousel',
    title: cleaned['qatar-university'].title,
    description: cleaned['qatar-university'].description,
    image: cleaned['qatar-university'].slides[0],
    slides: cleaned['qatar-university'].slides,
    slideCount: 9,
    dur: '9 slides',
    date: '22 SEP 2026',
    byline: 'FM DESK',
    country: 'Qatar',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/qatar.svg',
    sector: 'Edtech',
    tags: ['Qatar', 'Edtech', 'Qatar University']
  },
  {
    id: 'careem',
    slug: 'careem',
    href: '/read/careem-carousel',
    title: cleaned['careem'].title,
    description: cleaned['careem'].description,
    image: cleaned['careem'].slides[0],
    slides: cleaned['careem'].slides,
    slideCount: 10,
    dur: '10 slides',
    date: '20 SEP 2026',
    byline: 'FM DESK',
    country: 'UAE',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/uae.svg',
    sector: 'Logistics',
    tags: ['UAE', 'Logistics', 'Careem Mafia']
  }
];

siteData.carousels = formatted;
fs.writeFileSync('data/siteData.json', JSON.stringify(siteData, null, 2));
console.log('Successfully updated siteData.carousels with 5 authentic rich carousels!');
