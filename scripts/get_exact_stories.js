const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const chunk4 = data.split('self.__next_f.push(')[4];
    // Find the 5 hero stories block
    // Search around "How Peak Games Became a Starting Point"
    const titles = [
      "The Women Behind Some of MENA’s Biggest Companies",
      "How Peak Games Became a Starting Point for Turkey’s Next Gaming Companies",
      "What It Takes to Take a Gulf Restaurant Brand Abroad",
      "Tabby vs Tamara: The Competition Is Moving Beyond Buy Now, Pay Later",
      "Why Gulf Startups Are Building Around the Corner Shop"
    ];

    titles.forEach(t => {
      const idx = chunk4.indexOf(t);
      if (idx !== -1) {
        console.log("=== " + t + " ===");
        console.log(chunk4.substring(Math.max(0, idx - 100), idx + 600));
      }
    });
  });
});
