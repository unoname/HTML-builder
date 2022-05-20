const fsPromises = require("fs/promises");
const path = require("path");

async function copyDir(pathDir, pathDirCopy) {
await fsPromises.rm(pathDirCopy, { recursive: true, force: true});
await fsPromises.mkdir(pathDirCopy, { recursive: true }); 
  const files = await fsPromises.readdir(pathDir, {withFileTypes: true});
  for (file of files) {
    let srcPath = path.join(pathDir, file.name);
    let destPath = path.join(pathDirCopy, file.name);
    if (file.isFile()) {
      await fsPromises.copyFile(
        path.join(pathDir, `${file.name}`),
        path.join(pathDirCopy, `${file.name}`)
      );
    } else {
        await copyDir(srcPath, destPath);        
    } 
  }
}

copyDir(path.join(__dirname, "files"), path.join(__dirname, "files-copy"));
