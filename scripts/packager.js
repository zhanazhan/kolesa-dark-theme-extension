const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const zipFileName = `midnight-theme.zip`;
const outputPath = path.join(__dirname, '..', zipFileName);

// Clean up old zip
try {
  fs.unlinkSync(outputPath);
  console.log(`Previous ${zipFileName} removed successfully.`);
} catch {
  console.log(`No previous zip to remove.`);
}

// Create new zip stream
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

// Log result
output.on('close', () => {
  console.log(`${zipFileName} created successfully. Total bytes: ${archive.pointer()}`);
});

// Handle errors
archive.on('error', (err) => { throw err; });

archive.pipe(output);

// Add individual files
archive.file('manifest.json', { name: 'manifest.json' });
archive.file('readme.md', { name: 'readme.md' });

// ✅ Keep `dist/` as-is in the zip
archive.directory('css/', 'css');
archive.directory('icons/', 'icons');
archive.directory('js/', 'js');

// Finalize
archive.finalize();
