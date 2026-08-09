const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, '..', 'frontend', 'public', 'photos');
const outputFile = path.join(__dirname, '..', 'frontend', 'public', 'photos.json');

const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const photos = fs.readdirSync(photosDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return validExtensions.includes(ext);
  })
  .map(file => `/photos/${file}`);

fs.writeFileSync(outputFile, JSON.stringify({ photos }, null, 2));
console.log(`Generated photos.json with ${photos.length} photos`);
