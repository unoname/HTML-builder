const fs = require('fs');
const path = require('path');
const { stdout } = process;
const pathTextFile = path.join(__dirname, 'text.txt')
const rr = fs.createReadStream(pathTextFile, 'utf-8');
let data = '';
rr.on('data', (chunk) => { data += chunk; stdout.write(data);});

