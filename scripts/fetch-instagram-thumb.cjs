const https = require('https');
const fs = require('fs');
const path = require('path');

const shortcode = 'DZJtDFWvsGp';
const outDir = path.join(__dirname, '..', 'public');

// Step 1: Follow redirect from /media/?size=l to get the actual image
function getMediaUrl() {
  console.log('Step 1: Getting media URL from Instagram...');
  https.get('https://www.instagram.com/p/' + shortcode + '/media/?size=l', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  }, function(res) {
    var loc = res.headers.location;
    if (res.statusCode === 302 && loc) {
      console.log('Redirect to:', loc);
      downloadImage(loc, 'dygtal-ads-june');
    } else {
      console.log('No redirect, status:', res.statusCode);
      console.log('Content-Type:', res.headers['content-type']);
      res.resume();
    }
  }).on('error', function(e) {
    console.log('Error:', e.message);
  });
}

function downloadImage(url, name) {
  console.log('\nStep 2: Downloading image...');
  var client = url.startsWith('https') ? https : require('http');
  
  client.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  }, function(res) {
    console.log('Status:', res.statusCode);
    console.log('Content-Type:', res.headers['content-type']);
    
    var ct = res.headers['content-type'] || '';
    var ext = '.jpg';
    if (ct.includes('png')) ext = '.png';
    else if (ct.includes('webp')) ext = '.webp';
    else if (ct.includes('gif')) ext = '.gif';
    
    var outPath = path.join(outDir, name + ext);
    var ws = fs.createWriteStream(outPath);
    res.pipe(ws);
    ws.on('finish', function() {
      var size = fs.statSync(outPath).size;
      console.log('Downloaded:', outPath, '(' + size + ' bytes, ' + ct + ')');
      if (size > 5000) {
        console.log('SUCCESS! Now converting to AVIF...');
        convertToAvif(outPath);
      } else {
        console.log('WARNING: Image too small, might not be valid.');
      }
    });
  }).on('error', function(e) {
    console.log('Download error:', e.message);
  });
}

function convertToAvif(jpgPath) {
  try {
    const sharp = require('sharp');
    const avifPath = jpgPath.replace(/\.\w+$/, '.avif');
    sharp(jpgPath)
      .avif({ quality: 65, effort: 4 })
      .toFile(avifPath)
      .then(function() {
        var jpgSize = fs.statSync(jpgPath).size;
        var avifSize = fs.statSync(avifPath).size;
        console.log('AVIF saved:', avifPath, '(' + avifSize + ' bytes)');
        console.log('Compression:', jpgSize + ' -> ' + avifSize + ' (' + Math.round(avifSize/jpgSize*100) + '%)');
        
        // Clean up the JPG
        fs.unlinkSync(jpgPath);
        console.log('Deleted source JPG');
        console.log('\n=== DONE ===');
      })
      .catch(function(e) {
        console.error('AVIF conversion error:', e.message);
      });
  } catch(e) {
    console.error('Sharp not available:', e.message);
  }
}

getMediaUrl();
