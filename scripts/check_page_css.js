const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all css link tags
    const cssLinks = data.match(/<link[^>]+rel="stylesheet"[^>]*>/g) || [];
    console.log('CSS Links count:', cssLinks.length);
    cssLinks.forEach(l => console.log(l));

    // Also check for <style> tags
    const styles = data.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];
    console.log('Style tags count:', styles.length);

    // Also check if any error was logged on page
    if (data.includes('error') || data.includes('Error')) {
      console.log('Error keyword found in HTML');
    }
  });
});
