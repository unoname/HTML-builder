const path = require("path");
const fs = require("fs");

const writeStreamFile = fs.createWriteStream(
  path.join(__dirname, "project-dist", "bundle.css")
);
const readDir = fs.readdir(
  path.join(__dirname, "styles"),
  { withFileTypes: true },
  (err, files) => {
    if (err) throw err;
    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        if (path.extname(`${files[i].name}`)) {
          let readStreamFile = fs.createReadStream(
            path.join(__dirname, "styles", `${files[i].name}`)
          );
          let data = "";
          readStreamFile.on("data", chunk => {
            data += chunk;
            writeStreamFile.write(data);
          });
          data = "";
        }
      }
    }
  }
);
