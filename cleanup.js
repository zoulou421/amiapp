import fs from 'fs/promises'; // Use fs/promises for promise-based API
import path from 'path';

const browserDir = path.join(process.cwd(), 'dist', 'amiapp', 'browser');

async function removeBrowserDir() {
  try {
    await fs.rm(browserDir, { recursive: true, force: true });
    console.log('Removed browser directory successfully.');
  } catch (err) {
    console.error(`Error removing browser directory: ${err}`);
  }
}

removeBrowserDir();
