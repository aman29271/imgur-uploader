const request = require("request");
const http = require("http");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

async function sDownloader() {
  const url = "http://tab.shutterstock.com/photos";
  const req = http.get(url, res => {
    let chunks = [];
    res.on("data", chunk => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      const { image_url } = JSON.parse(chunks.toString());
      filename = path.basename(image_url);
      if (fs.existsSync(`images/Yandex.Disk/shutterstock/${filename}`)) {
        console.log(
          chalk.greenBright("shutterstock-->", filename, " Already exist.")
        );
      } else {
        request(image_url)
          .pipe(
            fs.createWriteStream(`images/Yandex.Disk/shutterstock/${filename}`)
          )
          .on("close", function() {
            console.log(
              chalk.green("shutterstock--> ", filename, " downloaded.")
            );
          });
      }
    });
  });
  req.on("error", err => {
    console.log(err);
  });

  req.end();
}
module.exports = sDownloader;
