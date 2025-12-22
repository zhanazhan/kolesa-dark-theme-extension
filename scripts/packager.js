const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');
const manifestPath = path.join(rootDir, 'manifest.json');

const zipFileName = 'midnight-theme.zip';
const outputPath = path.join(rootDir, zipFileName);

// Read version from package.json
const { version } = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Read and update manifest.json
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.version = version;

// Persist change in repo
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`manifest.json updated to version ${version}`);

// Remove old zip
try {
  fs.unlinkSync(outputPath);
  console.log(`Previous ${zipFileName} removed.`);
} catch {}

// Create zip
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`${zipFileName} created. Bytes: ${archive.pointer()}`);
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
