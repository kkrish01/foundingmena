const fs = require('fs');
const html = fs.readFileSync('the_30_founders_main.html', 'utf8');

const groups = [...html.matchAll(/<h4 class="grouph">([^<]+)<span>(\d+)<\/span><\/h4>/g)];
console.log('Founder groups:', groups.map(g => g[1] + ' (' + g[2] + ')'));

const founders = [...html.matchAll(/<a class="fm fnd/g)];
console.log('Total founders:', founders.length);
