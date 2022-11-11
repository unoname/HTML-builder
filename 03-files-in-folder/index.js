const fsPromises = require('fs/promises');
const path = require('path');

(async function () {
    const files = await fsPromises.readdir(path.join(__dirname, 'secret-folder'));    
   for(let file of files) {
		        const stat = await fsPromises.stat(path.join(__dirname, 'secret-folder', file)); 
       if(stat.isFile()) {        
					 console.log(path.parse(file).name + " - " + path.parse(file).ext.replace('.', '') + " - " + (stat.size / 1024).toFixed(3) + "kb");           
       }      
    }
})()



