const sDownloader = require("./shutterstock");
const gDownloader = require("./gettyImages");

const num = process.argv[2];
for (let i = 0; i < num; i++) {
  (async function() {
    await sDownloader();
    await gDownloader();
  })();
}
