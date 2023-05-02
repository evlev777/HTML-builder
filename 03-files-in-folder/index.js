const { stdout } = process;
const path = require('path');
const { readdir, stat } = require('fs/promises');

const directory = path.join(__dirname, 'secret-folder');

async function readDirectory(directoryPath) {
  const files = await readdir(directoryPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const fileName = path.basename(file.name, path.extname(file.name));
      const fileExtname = path.extname(file.name).slice(1);
      const stats = await stat(path.join(directoryPath, file.name));
      const fileSize = parseFloat((stats.size / Math.pow(1024, 1)).toFixed(2));

      stdout.write(`\n${fileName} - ${fileExtname} - ${fileSize}kb`);
    }
  }
}

readDirectory(directory);