const fs = require("fs");
const EventEmitter = require("events");

const uploadImage = require("./uploadImage");

class Watcher extends EventEmitter {
  constructor(watchDir) {
    super();
    this.watchDir = watchDir;
  }
  watch() {
    fs.readdir(this.watchDir, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        this.emit("process", file);
      });
    });
  }
  start() {
    fs.watchFile(this.watchDir, function() {
      this.watch();
    });
  }
}

const watcher = new Watcher('images');
watcher.on('process',)
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
