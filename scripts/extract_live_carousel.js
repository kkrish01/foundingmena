const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Look for hero / stories data
    console.log('HTML length:', data.length);
    // Find all supabase image links
    const matches = data.match(/https:\/\/qcmmrdyvzrooardtmwmx\.supabase\.co\/[^\"]+/g) || [];
    const unique = [...new Set(matches)];
    console.log('Supabase media:', JSON.stringify(unique.filter(u => u.includes('covers') || u.includes('story') || u.includes('media/uploads')), null, 2));

    // Also look for articles/stories in self.__next_f
    const jsonMatches = data.match(/\"heroStories\":\[.*?\]/);
    if (jsonMatches) {
      console.log('heroStories:', jsonMatches[0]);
    } else {
      // Find stories chunk
      const storyMatches = data.match(/\{\\\"id\\\":\\\"[a-z0-9-]+\\\",\\\"title\\\":\\\"[^\\\"]+\\\",.*?photo[^\"]*?\}/g) || [];
      console.log('Found story items:', storyMatches.length);
      storyMatches.forEach(s => console.log(s.substring(0, 150)));
    }
  });
}).on('error', err => console.error(err));
