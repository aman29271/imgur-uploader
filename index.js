const fs = require("fs");
const uploadImage = require("./uploadImage");

fs.readdir("images/", "utf8", (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    uploadImage(`images/${file}`);
  });
});

fs.watch("images/", { recursive: true }, (event, filename) => {
  if (event == "change") {
    console.log(filename, " is being changed.");
  }
});
