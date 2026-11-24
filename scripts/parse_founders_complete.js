const fs = require('fs');
const html = fs.readFileSync('the_30_founders_main.html', 'utf8');

// Find all <section class="fgrp">
const sectionMatches = [...html.matchAll(/<section class="fgrp">([\s\S]*?)<\/section>/g)];

const groups = sectionMatches.map(sm => {
  const secHtml = sm[1];
  const h4Match = secHtml.match(/<h4 class="grouph">([\s\S]*?)<\/h4>/);
  const h4Html = h4Match ? h4Match[1].trim() : '';
  const groupNameMatch = secHtml.match(/<h4 class="grouph">([^<]+)<span>(\d+)<\/span><\/h4>/) ||
                         secHtml.match(/<h4 class="grouph">[\s\S]*?<span[^>]*>([^<]+)<\/span>/);

  // Cards
  const cards = [...secHtml.matchAll(/<a class="fm fnd half"[\s\S]*?<\/a>/g)].map(cm => {
    const raw = cm[0];
    const nameMatch = raw.match(/<h3>([^<]+)<\/h3>/);
    const hrefMatch = raw.match(/href="([^"]+)"/);
    const slug = hrefMatch ? hrefMatch[1].replace('/founders/', '') : '';
    return {
      name: nameMatch ? nameMatch[1].trim() : '',
      slug,
      href: hrefMatch ? hrefMatch[1] : '',
      rawHtml: raw
    };
  });

  return {
    h4Html,
    cards
  };
});

console.log('Total founder groups:', groups.length);
groups.forEach((g, i) => {
  console.log(`Group ${i + 1}: ${g.cards.length} founders`);
});

fs.writeFileSync('data/the30FoundersComplete.json', JSON.stringify(groups, null, 2));
console.log('Saved to data/the30FoundersComplete.json');
