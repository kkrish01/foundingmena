const fs = require('fs');
const html = fs.readFileSync('the_30_founders_main.html', 'utf8');

const listbodyStart = html.indexOf('<div class="listbody">');
const listbodyEnd = html.indexOf('</div><div class="fmfoot"', listbodyStart);
console.log('Listbody start:', listbodyStart, 'end:', listbodyEnd);
const listbodyHtml = html.slice(listbodyStart + '<div class="listbody">'.length, listbodyEnd);
fs.writeFileSync('scripts/founders_listbody.html', listbodyHtml);
console.log('Saved scripts/founders_listbody.html, length:', listbodyHtml.length);
