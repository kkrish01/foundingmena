const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/siteData.json', 'utf8'));

data.countries = [
  { name: "Bengaluru", slug: "bengaluru", flagSvg: "/flags/india.svg" },
  { name: "Mumbai", slug: "mumbai", flagSvg: "/flags/india.svg" },
  { name: "Delhi NCR", slug: "delhi-ncr", flagSvg: "/flags/india.svg" },
  { name: "Hyderabad", slug: "hyderabad", flagSvg: "/flags/india.svg" },
  { name: "Chennai", slug: "chennai", flagSvg: "/flags/india.svg" },
  { name: "Pune", slug: "pune", flagSvg: "/flags/india.svg" },
  { name: "Ahmedabad", slug: "ahmedabad", flagSvg: "/flags/india.svg" },
  { name: "Gurgaon", slug: "gurgaon", flagSvg: "/flags/india.svg" },
  { name: "Noida", slug: "noida", flagSvg: "/flags/india.svg" },
  { name: "Kolkata", slug: "kolkata", flagSvg: "/flags/india.svg" },
  { name: "Jaipur", slug: "jaipur", flagSvg: "/flags/india.svg" },
  { name: "Kochi", slug: "kochi", flagSvg: "/flags/india.svg" },
  { name: "Chandigarh", slug: "chandigarh", flagSvg: "/flags/india.svg" },
  { name: "Indore", slug: "indore", flagSvg: "/flags/india.svg" },
  { name: "Goa", slug: "goa", flagSvg: "/flags/india.svg" },
  { name: "Surat", slug: "surat", flagSvg: "/flags/india.svg" }
];

data.heroStories = [
  {
    id: "the-women-behind-some-of-menas-biggest-companies",
    title: "The Women Behind Some of MENA’s Biggest Companies",
    tag: "Story",
    image: "https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a1f4f2-3246-7c73-8640-c1a595f76f49-1.jpg",
    excerpt: "Trendyol is one of Turkey’s biggest technology companies. Insider sells its software to more than 1,500 brands across 28 countries. Huda Beauty became a global cosmetics business, while Hepsiburada became the first Turkish company to list on Nasdaq. Across MENA, women have helped build some of the region’s largest companies in e-commerce, enterprise software, beauty, logistics, fintech and investing.",
    url: "/read/the-women-behind-some-of-menas-biggest-companies"
  },
  {
    id: "how-peak-games-became-a-starting-point-for-turkeys-next-gaming-companies",
    title: "How Peak Games Became a Starting Point for Turkey’s Next Gaming Companies",
    tag: "Story",
    image: "https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a188e2-79b7-7ae1-bb16-2060cbde2380-1.jpg",
    excerpt: "In 2019, five employees left Peak Games to build another mobile gaming company in Istanbul. Today, Peak Games alumni have built some of the highest grossing casual puzzle games in mobile history, establishing Istanbul as a global gaming superpower.",
    url: "/read/how-peak-games-became-a-starting-point-for-turkeys-next-gaming-companies"
  },
  {
    id: "what-it-takes-to-take-a-gulf-restaurant-brand-abroad",
    title: "What It Takes to Take a Gulf Restaurant Brand Abroad",
    tag: "Story",
    image: "https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a19892-930d-79f2-a6bf-ac1f10e277af-4.jpg",
    excerpt: "At Harrods in London, Somewhere serves guacamole hummus, kunafa-wrapped shrimp and beef shawarma with beetroot rice. Homegrown Gulf concepts are now exporting regional flavors and hospitality tech across European and Asian capitals.",
    url: "/read/what-it-takes-to-take-a-gulf-restaurant-brand-abroad"
  },
  {
    id: "tabby-vs-tamara-the-competition-is-moving-beyond-buy-now-pay-later",
    title: "Tabby vs Tamara: The Competition Is Moving Beyond Buy Now, Pay Later",
    tag: "Story",
    image: "https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a19886-3d5d-7c61-9eba-e228a3c2e944-2.jpg",
    excerpt: "Tabby and Tamara became familiar to Gulf shoppers through a simple offer: buy something now and spread the payment across instalments. But with combined billions in valuation, the battle is shifting to everyday consumer banking and debit cards.",
    url: "/read/tabby-vs-tamara-the-competition-is-moving-beyond-buy-now-pay-later"
  },
  {
    id: "why-gulf-startups-are-building-around-the-corner-shop",
    title: "Why Gulf Startups Are Building Around the Corner Shop",
    tag: "Story",
    image: "https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a1988e-fe6b-72b2-ad6b-536fb8ee5af6-4.jpg",
    excerpt: "A neighbourhood shop can look like a small customer for a technology company. Across the Gulf, local baqalas process tens of billions in cash, making them the primary battleground for B2B tech and credit infrastructure.",
    url: "/read/why-gulf-startups-are-building-around-the-corner-shop"
  }
];

fs.writeFileSync('data/siteData.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated siteData.json with Indian cities and authentic hero covers!');
