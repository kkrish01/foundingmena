const fs = require('fs');
const flight = fs.readFileSync('scripts/deals_flight.txt', 'utf8');

// Find where spot starts and ends
const spotIdx = flight.indexOf('data-module__NYeKAW__spot');
console.log('spotIdx:', spotIdx);
const spotChunk = flight.substring(spotIdx - 50, spotIdx + 6000);
fs.writeFileSync('scripts/spot_chunk.txt', spotChunk);
console.log('Wrote scripts/spot_chunk.txt');
