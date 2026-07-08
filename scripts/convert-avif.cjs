const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.resolve(__dirname, '../public');

const imageExtensions = ['.jpg', '.jpeg', '.png'];
const skippedFiles = ['favicon.svg', 'logo.svg'];

async function convertToAvif(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const outputPath = path.join(dir, `${baseName}.avif`);

  if (fs.existsSync(outputPath)) {
    console.log(`  ⏭️  Already exists, skipping: ${path.relative(publicDir, outputPath)}`);
    return;
  }

  try {
    await sharp(filePath)
      .avif({ quality: 70, effort: 4 })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(filePath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    console.log(`  ✅ ${path.relative(publicDir, filePath)} → .avif (${savings}% smaller)`);
  } catch (err) {
    console.error(`  ❌ Failed: ${path.relative(publicDir, filePath)} — ${err.message}`);
  }
}

async function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await walkDir(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (imageExtensions.includes(ext) && !skippedFiles.includes(entry.name)) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

(async () => {
  console.log('🔍 Scanning public/ for images to convert to AVIF...\n');
  
  const images = await walkDir(publicDir);
  console.log(`Found ${images.length} images to process.\n`);

  for (let i = 0; i < images.length; i++) {
    const filePath = images[i];
    const relPath = path.relative(publicDir, filePath);
    console.log(`[${i + 1}/${images.length}] ${relPath}`);
    await convertToAvif(filePath);
  }

  console.log('\n✨ AVIF conversion complete!');
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
