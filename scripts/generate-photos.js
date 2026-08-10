const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, '..', 'frontend', 'public', 'photos');
const outputFile = path.join(__dirname, '..', 'frontend', 'public', 'photos.json');

const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const collectPhotos = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? collectPhotos(filePath) : [filePath];
  });

const photos = collectPhotos(photosDir)
  .filter(file => validExtensions.includes(path.extname(file).toLowerCase()))
  .map(file => {
    const relativePath = path.relative(path.join(__dirname, '..', 'frontend', 'public'), file);
    const encodedPath = relativePath
      .split(path.sep)
      .map(segment => encodeURIComponent(segment))
      .join('/');
    return `/${encodedPath}`;
  });

fs.writeFileSync(outputFile, JSON.stringify({ photos }, null, 2));
console.log(`Generated photos.json with ${photos.length} photos`);
