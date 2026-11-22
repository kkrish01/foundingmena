const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find hero markup
    const heroIdx = data.indexOf('id="hero"');
    if (heroIdx !== -1) {
      console.log(data.substring(heroIdx - 50, heroIdx + 1500));
    } else {
      const classHero = data.indexOf('class="hero');
      console.log(data.substring(classHero - 50, classHero + 1500));
    }
  });
});
