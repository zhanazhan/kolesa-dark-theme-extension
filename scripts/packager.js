const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Paths
const rootDir = path.join(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');
const manifestPath = path.join(rootDir, 'manifest.json');

const zipFileName = 'midnight-theme.zip';
const outputPath = path.join(rootDir, zipFileName);

// Read version from package.json
const { version } = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Read and patch manifest.json
const originalManifest = fs.readFileSync(manifestPath, 'utf8');
const manifest = JSON.parse(originalManifest);
manifest.version = version;

// Write patched manifest
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

// Clean up old zip
try {
  fs.unlinkSync(outputPath);
  console.log(`Previous ${zipFileName} removed successfully.`);
} catch {
  console.log('No previous zip to remove.');
}

// Create zip
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`${zipFileName} created. Total bytes: ${archive.pointer()}`);

  // Restore original manifest
  fs.writeFileSync(manifestPath, originalManifest);
  console.log('manifest.json restored.');
});

archive.on('error', (err) => { throw err; });

archive.pipe(output);

// Files
archive.file(manifestPath, { name: 'manifest.json' });
archive.file('readme.md', { name: 'readme.md' });

archive.directory('css/', 'css');
archive.directory('icons/', 'icons');
archive.directory('js/', 'js');

archive.finalize();
