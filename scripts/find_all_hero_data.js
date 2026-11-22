const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search all chunks for titles or ai-covers
    const chunks = data.split('self.__next_f.push(');
    chunks.forEach((chunk, i) => {
      // Look for ai-covers in chunk
      const coverMatches = chunk.match(/https:\\\/\\\/qcmmrdyvzrooardtmwmx\.supabase\.co\\\/storage\\\/v1\\\/object\\\/public\\\/media\\\/uploads\\\/ai-covers\\\/[a-zA-Z0-9-]+\.(jpg|webp|png)/g) ||
                           chunk.match(/https:\/\/qcmmrdyvzrooardtmwmx\.supabase\.co\/storage\/v1\/object\/public\/media\/uploads\/ai-covers\/[a-zA-Z0-9-]+\.(jpg|webp|png)/g) || [];
      if (coverMatches.length > 0) {
        console.log(`Chunk ${i} has covers:`, coverMatches.map(c => c.replace(/\\\//g, '/')));
      }

      // Look for story titles
      const titles = chunk.match(/"title":"([^"]+)"/g) || chunk.match(/\\"title\\":\\"([^\\"]+)\\"/g) || [];
      if (titles.length > 0) {
        console.log(`Chunk ${i} titles:`, titles.slice(0, 10));
      }
    });
  });
});
