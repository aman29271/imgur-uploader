var https = require("https");
require("dotenv");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

fileName = "images/867506.jpg";

fs.readFile(fileName, "utf8", (err, data) => {
  if (err) throw err;
  //   console.log(data);
  uploadImage(fileName, data);
});
function uploadImage(fileName, binaryImageFile) {
  var options = {
    method: "POST",
    hostname: "api.imgur.com",
    path: "/3/upload",
    headers: {
      Authorization: `Client-ID ${process.env.clientId}`
    }
  };

  var req = https.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function(chunk) {
      if (res.statusCode == 200) {
        console.log(chalk.green(`Image ${fileName} successfully uploaded.`));
      } else {
        console.log(chalk.red("An Error Occured."));
      }
    });

    res.on("error", function(error) {
      console.error(error);
    });
  });

  var postData = `type=file&
    name=${fileName}&
    image=${binaryImageFile}`;
  req.setHeader("content-type", "multipart/form-data;");

  req.write(postData);

  req.end();
}
