const fsPromises = require('fs/promises');
const path = require('path');

(async function () {
    const files = await fsPromises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});    
   for(file of files) {
       if(file.isFile()) {
           let fileName = file.name.split(".").join(".");         
        const stat = await fsPromises.stat(path.join(__dirname, 'secret-folder', `${fileName}`));      
           console.log(file.name.split(".").join(" - ") + " - " + stat.size + 'Bytes')           
       }      
    }
})()



