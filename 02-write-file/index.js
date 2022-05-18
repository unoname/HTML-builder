const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
output.write("Hello, student! Enter your text, please.\n");
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
input.on('data', (data) => {
    if(data.toString().trim() === 'exit') {
        output.write('Your text was successfull written in created a file "text.txt". Good bye, student.')
        process.exit();
    } else {
        writeStream.write(data);
    }   
});
process.on('SIGINT', () => {      
    output.write('Your text was successfull written in created a file "text.txt". Good bye, student.');
    process.exit();    
  });