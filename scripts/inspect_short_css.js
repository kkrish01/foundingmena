const fs = require('fs');
const css = fs.readFileSync('app/foundingmena.css', 'utf8');

['shortc', 'sstrip', 'playsm'].forEach(cls => {
  const idx = css.indexOf(cls);
  console.log(`Class .${cls} index:`, idx);
  if (idx !== -1) {
    console.log(css.slice(idx, idx + 400));
  }
});
