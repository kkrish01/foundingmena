const fs = require('fs');
const html = fs.readFileSync('the_30_founders_main.html', 'utf8');

// The listbody has sections: <section class="fgrp">
const sectionMatches = [...html.matchAll(/<section class="fgrp">([\s\S]*?)<\/section>/g)];

const groups = sectionMatches.map(m => {
  const sectionContent = m[1];
  const groupTitleMatch = sectionContent.match(/<h4 class="grouph">([^<]+)<span>(\d+)<\/span><\/h4>/);
  const groupName = groupTitleMatch ? groupTitleMatch[1].trim() : '';
  const count = groupTitleMatch ? parseInt(groupTitleMatch[2]) : 0;

  // Split founders inside .fmgrid
  const founderItems = [...sectionContent.matchAll(/<a class="fm fnd half"[^>]*>([\s\S]*?)<\/a>/g)].map(fm => {
    const raw = fm[0];
    const hrefMatch = raw.match(/href="([^"]+)"/);
    const brandMatch = raw.match(/--brand:([^;"]+)/);
    const bgMatch = raw.match(/background-image:url\(([^)]+)\)/);
    const avatarMatch = raw.match(/<div class="av">[\s\S]*?<img[^>]+src="([^"]+)"/);
    const crestMatch = raw.match(/src="(\/crest\/[^"]+)"/);
    const nameMatch = raw.match(/<h3>([^<]+)<\/h3>/);
    const companyMatch = raw.match(/<span class="co">([^<]+)<\/span>/);
    const roleMatch = raw.match(/<span class="role">([^<]+)<\/span>/);
    const slug = hrefMatch ? hrefMatch[1].replace('/founders/', '') : '';

    return {
      id: slug,
      slug,
      href: hrefMatch ? hrefMatch[1] : '',
      brandColor: brandMatch ? brandMatch[1].trim() : '#F0702F',
      groundBg: bgMatch ? bgMatch[1].trim() : '',
      avatar: avatarMatch ? avatarMatch[1] : '',
      crest: crestMatch ? crestMatch[1] : '',
      name: nameMatch ? nameMatch[1].trim() : '',
      company: companyMatch ? companyMatch[1].trim() : '',
      role: roleMatch ? roleMatch[1].trim() : '',
      rawHtml: raw
    };
  });

  return {
    groupName,
    count,
    founders: founderItems
  };
});

console.log('Parsed groups:', groups.length);
fs.writeFileSync('data/the30FoundersData.json', JSON.stringify(groups, null, 2));
console.log('Saved to data/the30FoundersData.json');
