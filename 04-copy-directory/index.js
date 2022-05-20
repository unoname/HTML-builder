const fsPromises = require("fs/promises");
const path = require("path");

async function copyDir(pathDirCopy, pathDir) {
await fsPromises.rm(path.join(__dirname, "files-copy"), { recursive: true, force: true});
await fsPromises.mkdir(pathDir, { recursive: true });
 
  const files = await fsPromises.readdir(pathDirCopy, {withFileTypes: true});
  for (file of files) {
    let srcPath = path.join(pathDirCopy, file.name);
    let destPath = path.join(pathDir, file.name);
    if (file.isFile()) {
      await fsPromises.copyFile(
        path.join(pathDirCopy, `${file.name}`),
        path.join(pathDir, `${file.name}`)
      );
    } else {
        await copyDir(srcPath, destPath);        
    } 
  }
}

copyDir(path.join(__dirname, "files"), path.join(__dirname, "files-copy"));
