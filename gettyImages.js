const request = require("request");
const https = require("https");
const fs = require("fs");
const chalk = require("chalk");

async function gDowloader() {
  const url =
    "https://6v0luvcal3.execute-api.us-west-2.amazonaws.com/prod/backgroundimagecached";
  const req = https.get(url, res => {
    let chunks = [];
    res.on("data", chunk => {
      chunks.push(chunk);
    });
    res.on("end", () => {
      const { high_res_comp, id } = JSON.parse(chunks.toString());
      filename = id + ".jpg";
      if (fs.existsSync(`images/Yandex.Disk/gettyImages/${filename}`)) {
        console.log(
          chalk.greenBright("Getty Images -->", filename, " Already exist.")
        );
      } else {
        request(high_res_comp)
          .pipe(
            fs.createWriteStream(`images/Yandex.Disk/gettyImages/${filename}`)
          )
          .on("close", function() {
            console.log(
              chalk.green("gettyimages --> ", filename, " downloaded.")
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

module.exports = gDowloader;
