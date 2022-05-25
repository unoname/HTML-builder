const fs = require('fs');
const fsPromises = require("fs/promises");
const path = require('path');


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
      copyStyle(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'style.css'));
      createIndexHTML(path.join(__dirname, 'project-dist', 'index.html'), path.join(__dirname, 'template.html'), path.join(__dirname, 'components'));
    }

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

function createIndexHTML(pathIndex, pathTemplate, pathComponents) {
const writeStrimIndexHTML = fs.createWriteStream(pathIndex);
const readStrimTemplate = fs.createReadStream(pathTemplate);
fs.readdir((pathComponents), 'utf-8', (err, files) => {
    if(err) throw err;
     let template = '';
readStrimTemplate.on('data', chunk => {
     template += chunk;
     let readFile = '';    
    let result = '';
for(let i = 0; i < files.length; i++) {   
readFile = fs.readFile((path.join(pathComponents, `${files[i]}`)), 'utf-8', (err, data) => {
    if(err) throw err;
    let components = data;
    let name = files[i].split('.').shift();    
    let re = new RegExp(`{{${name}}}`, 'g');
    template = template.replace(re, components);
    if(i == files.length - 1) {
        writeStrimIndexHTML.write(template);
          }
        })
      }
    })        
 })     
}

copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));