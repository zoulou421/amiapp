// move.js
import { moveFile } from 'move-file'; // Use import instead of require
import path from 'path';
import fs from 'fs/promises'; // Use fs/promises for async file operations

const sourceDir = path.join(process.cwd(), 'dist', 'amiapp', 'browser');
const destDir = path.join(process.cwd(), 'dist', 'amiapp');

(async () => {
  try {
    // Move all files from browser to amiapp
    const files = await fs.readdir(sourceDir);
    await Promise.all(files.map(file => 
      moveFile(path.join(sourceDir, file), path.join(destDir, file))
    ));
    
    // Remove the browser directory after moving files
    await fs.rmdir(sourceDir, { recursive: true });
    console.log('Files moved successfully!');
  } catch (error) {
    console.error('Error moving files:', error);
  }
})();

