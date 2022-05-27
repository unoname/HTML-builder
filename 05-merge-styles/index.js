const path = require("path");
const fs = require("fs");
const fsPromises = require('fs/promises')

async function copyStyle(srcPath, srcBundle) {
  const writeStreamFile = fs.createWriteStream(srcBundle);
  const files = await fsPromises.readdir(srcPath, {withFileTypes: true});
  for(file of files) {
    if(file.isFile()) {
      if(path.extname(`${file.name}`) == '.css') {
        let readFile = await fsPromises.readFile(path.join(srcPath, `${file.name}`));
        writeStreamFile.write(readFile + '\n');
      }
    }
  }
}
// other solution
// function copyStyle (srcPath, srcBundle) {
//    const writeStreamFile = fs.createWriteStream(srcBundle);
// const readDir = fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
//     if (err) throw err;
//     for (let i = 0; i < files.length; i++) {        
//       if (files[i].isFile()) {
//         if (path.extname(`${files[i].name}`) == '.css') {
//           let readStreamFile = fs.createReadStream(
//             path.join(srcPath, `${files[i].name}`)
//           );
//           let data = "";
//           readStreamFile.on("data", chunk => {
//             data += chunk;
//             writeStreamFile.write(data);
//           });
//           data = "";
//         }
//       }
//     }
//   }
// ); 
// }

copyStyle(path.join(__dirname, "styles"), path.join(__dirname, "project-dist", "bundle.css"));
exports.copyStyle = copyStyle;