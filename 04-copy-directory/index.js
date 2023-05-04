const path = require('path');
const fs = require('fs');

const sourceFolder = path.join(__dirname, 'files');
const outputFolder = path.join(__dirname, 'files-copy');

const copyDir = async (source, output) => {
  try {
    await deleteFolder(output);
  } catch {
    console.log('Create folder "files-copy"');
  } finally {
    await createFolder(output);
    const folderData = await readFolder(source);
    await copyFiles(folderData, source, output);
  }
};

const deleteFolder = async (folder) => {
  await fs.promises.rm(folder, { recursive: true });
};

const createFolder = async (folder) => {
  fs.promises.mkdir(folder, { recursive: true });
};

const readFolder = async (folder) => {
  const filesNames = await fs.promises.readdir(folder, {
    withFileTypes: true,
  });

  return filesNames;
};

const copyFiles = async (filesNames, sourceFolder, outputFolder) => {
  for (let file of filesNames) {
    const sourceFile = path.join(sourceFolder, file.name);
    const outputFile = path.join(outputFolder, file.name);
    if (file.isFile()) {
      fs.promises.copyFile(sourceFile, outputFile);
    } else {
      await copyDir(sourceFile, outputFile);
    }
  }
};

copyDir(sourceFolder, outputFolder);
