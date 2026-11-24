const fs = require('fs');
const css = fs.readFileSync('scripts/deals_style_2.css', 'utf8');

const matches = css.match(/[^{}]+data-module__NYeKAW[^{}]*\{[^}]+\}/g);
console.log('Total rules:', matches.length);
fs.writeFileSync('scripts/deals_all_css_rules.css', matches.join('\n'));
console.log('Saved to scripts/deals_all_css_rules.css');
