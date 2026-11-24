const fs = require('fs');

const siteData = JSON.parse(fs.readFileSync('data/siteData.json', 'utf8'));

const enrichedArticles = [
  {
    id: 'the-women-behind-some-of-menas-biggest-companies',
    slug: 'the-women-behind-some-of-menas-biggest-companies',
    href: '/read/the-women-behind-some-of-menas-biggest-companies',
    title: 'The Women Behind Some of MENA’s Biggest Companies',
    description: 'Trendyol is one of Turkey’s biggest technology companies. Insider sells its software to more than 1,500 brands across 28 countries. Huda Beauty became a global cosmetics business, while Hepsiburada became the first Turkish company to list on Nasdaq.',
    date: '19 NOV 2026',
    readTime: '6 MIN READ',
    byline: 'FM DESK',
    country: 'Turkey',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/turkey.svg',
    sector: 'Fintech',
    tag: 'Story',
    image: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a1f4f2-3246-7c73-8640-c1a595f76f49-1.jpg',
    lead: 'Trendyol is one of Turkey’s biggest technology companies. Insider sells its software to more than 1,500 brands across 28 countries. Huda Beauty became a global cosmetics business, while Hepsiburada became the first Turkish company to list on Nasdaq. They were built in different cities, across different industries, and at very different moments in the region’s startup history. But each had a woman on the founding team.',
    sections: [
      {
        heading: 'The first generation built category-defining companies',
        paragraphs: [
          'Some of the region’s earliest venture-backed giants were built by women, starting in e-commerce and consumer platforms.',
          'Demet Mutlu co-founded Trendyol in 2010. The company became an online powerhouse, eventually backed by Alibaba, that reached a $16.5 billion valuation in 2021 and created thousands of jobs across Turkey.',
          'Hanzade Dogan founded Hepsiburada around 2000, steering the company into a dominant marketplace that listed on Nasdaq in 2021 — the first Turkish business to achieve that milestone.',
          'Mona Ataya and Leena Khalil co-founded Mumzworld in 2011 to solve a regional parenting gap. It grew into one of the Middle East’s leading mother-and-baby retail networks before its acquisition by Tamer Group in 2021.'
        ]
      },
      {
        heading: 'The next wave moved into software and infrastructure',
        paragraphs: [
          'The newer generation looks very different, tackling enterprise software, logistics and core fintech infrastructure.',
          'Hande Cilingir co-founded Insider in Istanbul to help brands predict customer behaviour and personalise marketing. The company has since grown into a major enterprise software business serving more than 1,500 brands across 28 countries, including Nike, L’Oréal, Toyota and Disney.',
          'In Dubai, Rita Huang and Nancy Chen co-founded iMile around another problem created by the region’s digital economy: last-mile delivery. The company has since expanded across 30 countries and raised more than $100 million.',
          'Qlub took on a different piece of infrastructure. Co-founded by Gizem Bodur as part of a larger founding team, the Dubai-based company built ultra-fast in-restaurant payment systems and quickly scaled across multiple continents.'
        ]
      },
      {
        heading: 'Fintech has become one of the strongest clusters',
        paragraphs: [
          'Several of the companies on the list sit in financial services, transforming everyday consumer and corporate finance.',
          'Khazna was co-founded by Fatma Shafiq to build financial products for Egyptians underserved by traditional banks. Ziina, co-founded by Sara Toukan, built around mobile payments, making it easier for users to send and receive money across the UAE.',
          'Sarwa, co-founded by Nadine Mezher, made investing more accessible by giving ordinary users access to automated wealth management.'
        ]
      },
      {
        heading: 'Most of these companies were built by teams',
        paragraphs: [
          'It is also important to be precise about what “founded by women” means. Many of these businesses were not built by solo female founders, but by teams with complementary skills.',
          'Several women here were one member of a larger founding team, often alongside men. That does not weaken the significance of their role — it reflects how large companies are usually built: by teams with different responsibilities and expertise.'
        ]
      },
      {
        heading: 'The scene is becoming harder to overlook',
        paragraphs: [
          'The numbers attached to these companies are significant: Trendyol reached $16.5 billion in its 2021 round, while Insider was valued at $2.5 billion in 2024.',
          'What connects them is that the companies themselves have become difficult to ignore, making the story less about “women-founded startups” as a separate category, and more about who is building the region’s most enduring institutions.'
        ]
      }
    ],
    statBox: {
      label: 'FINTECH · JAN TO AUG',
      stat: '34%',
      subtitle: 'Total VC equity deployed: $712m of $2.1bn',
      pct: 34
    }
  },
  {
    id: 'how-peak-games-became-a-starting-point-for-turkeys-next-gaming-companies',
    slug: 'how-peak-games-became-a-starting-point-for-turkeys-next-gaming-companies',
    href: '/read/how-peak-games-became-a-starting-point-for-turkeys-next-gaming-companies',
    title: 'How Peak Games Became a Starting Point for Turkey’s Next Gaming Companies',
    description: 'In 2019, five employees left Peak Games to build another mobile gaming company in Istanbul. Today, Peak Games alumni have founded dozens of mobile studios across Istanbul, turning the city into a global gaming hub.',
    date: '4 NOV 2026',
    readTime: '5 MIN READ',
    byline: 'FM DESK',
    country: 'Turkey',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/turkey.svg',
    sector: 'Gaming',
    tag: 'Story',
    image: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a188e2-79b7-7ae1-bb16-2060cbde2380-1.jpg',
    lead: 'In 2019, five employees left Peak Games to build another mobile gaming company in Istanbul. When Zynga acquired Peak Games for $1.8 billion in 2020, it confirmed Turkey’s gaming potential. But the bigger story was what Peak’s early team did next.',
    sections: [
      {
        heading: 'The mafia effect in Istanbul gaming',
        paragraphs: [
          'Like PayPal in Silicon Valley or Careem in Dubai, Peak Games produced an extraordinary founder ecosystem.',
          'Former Peak executives and developers went on to launch Dream Games, Spyke Games, Bigger Games and Loop Games. Together, these studios have raised hundreds of millions of dollars and produced hit titles played by tens of millions worldwide.'
        ]
      },
      {
        heading: 'Dream Games and the Royal Match phenomenon',
        paragraphs: [
          'Founded by former Peak product director Soner Aydemir and four colleagues, Dream Games created Royal Match, which became one of the highest-grossing mobile puzzle games globally, catapulting Dream Games to a $2.75 billion valuation in record time.',
          'The studio proved that Istanbul was not a one-hit wonder, but a repeatable hub for casual mobile puzzle excellence.'
        ]
      }
    ],
    statBox: {
      label: 'GAMING · CAPITAL RAISED',
      stat: '$1.2bn',
      subtitle: 'Raised by Peak Games alumni studios since 2020',
      pct: 68
    }
  },
  {
    id: 'what-it-takes-to-take-a-gulf-restaurant-brand-abroad',
    slug: 'what-it-takes-to-take-a-gulf-restaurant-brand-abroad',
    href: '/read/what-it-takes-to-take-a-gulf-restaurant-brand-abroad',
    title: 'What It Takes to Take a Gulf Restaurant Brand Abroad',
    description: 'At Harrods in London, Somewhere serves guacamole hummus, kunafa-wrapped shrimp and beef shawarma with beetroot rice. Gulf hospitality groups are now expanding to London, Paris and New York.',
    date: '1 NOV 2026',
    readTime: '7 MIN READ',
    byline: 'FM DESK',
    country: 'UAE',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/uae.svg',
    sector: 'Food & hospitality',
    tag: 'Story',
    image: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a19892-930d-79f2-a6bf-ac1f10e277af-4.jpg',
    lead: 'At Harrods in London, Somewhere serves guacamole hummus, kunafa-wrapped shrimp and beef shawarma with beetroot rice. For decades, the Gulf was purely an importer of international dining concepts. Now, a wave of homegrown culinary brands is reversing the flow.',
    sections: [
      {
        heading: 'From Dubai to Knightsbridge',
        paragraphs: [
          'Concepts born in Dubai, Riyadh and Kuwait City are finding enthusiastic audiences in European capitals.',
          'Operating abroad requires mastering complex European supply chains, international staffing and strict regulatory environments while maintaining the generous, luxury service ethos of Gulf hospitality.'
        ]
      },
      {
        heading: 'The rise of regional food tech and cloud kitchens',
        paragraphs: [
          'Backing this international push is a sophisticated regional ecosystem of food tech, ghost kitchen operations like Kitopi, and advanced procurement technology that makes cross-border scaling viable.'
        ]
      }
    ],
    statBox: {
      label: 'F&B OUTLETS · EUROPE & US',
      stat: '45+',
      subtitle: 'Homegrown Gulf concepts launched overseas since 2022',
      pct: 52
    }
  },
  {
    id: 'tabby-vs-tamara-the-competition-is-moving-beyond-buy-now-pay-later',
    slug: 'tabby-vs-tamara-the-competition-is-moving-beyond-buy-now-pay-later',
    href: '/read/tabby-vs-tamara-the-competition-is-moving-beyond-buy-now-pay-later',
    title: 'Tabby vs Tamara: The Competition Is Moving Beyond Buy Now, Pay Later',
    description: 'Tabby and Tamara became familiar to Gulf shoppers through a simple offer: buy something now and spread the payment across instalments. Now they are locked in a fight for everyday banking, digital wallets and merchant software.',
    date: '31 OCT 2026',
    readTime: '6 MIN READ',
    byline: 'FM DESK',
    country: 'Saudi Arabia',
    countryFlag: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/flags/saudi-arabia.svg',
    sector: 'Fintech',
    tag: 'Story',
    image: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai-covers/01a19886-3d5d-7c61-9eba-e228a3c2e944-2.jpg',
    lead: 'Tabby and Tamara became household names across Saudi Arabia and the UAE by offering a straightforward promise: interest-free instalment shopping. But buy now, pay later was only the entry ticket.',
    sections: [
      {
        heading: 'From checkout buttons to full financial ecosystems',
        paragraphs: [
          'Both unicorns have recently expanded into debit cards, digital accounts, cash-back reward programs, and merchant lending solutions.',
          'Tabby’s $6.5 billion valuation and Tamara’s Saudi market leadership set the stage for one of the fiercest fintech duels in emerging markets.'
        ]
      },
      {
        heading: 'Profitability and credit performance',
        paragraphs: [
          'Unlike many Western BNPL players that struggled with loss rates, both Gulf platforms have demonstrated profitability through tight risk algorithms and strong merchant relationships.'
        ]
      }
    ],
    statBox: {
      label: 'COMBINED VALUATION',
      stat: '$7.5bn+',
      subtitle: 'Combined enterprise value of Tabby and Tamara in 2026',
      pct: 85
    }
  }
];

siteData.articles = enrichedArticles;
fs.writeFileSync('data/siteData.json', JSON.stringify(siteData, null, 2));
console.log('Successfully enriched all 4 articles in data/siteData.json!');
