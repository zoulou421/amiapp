const { moveFile } = require('move-file');
const path = require('path');

(async () => {
  try {
    // Définir les chemins source et destination
    const sourceDir = path.join(__dirname, 'dist', 'amiapp', 'browser', '*');
    const destDir = path.join(__dirname, 'dist', 'amiapp');

    // Déplacer tous les fichiers du dossier browser vers amiapp
    await moveFile(sourceDir, destDir);
    console.log('Fichiers déplacés avec succès !');
  } catch (error) {
    console.error('Erreur lors du déplacement des fichiers :', error);
  }
})();
