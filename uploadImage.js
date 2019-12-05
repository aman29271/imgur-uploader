const fs = require("fs");
const request = require("request");
const dotenv = require("dotenv");
const chalk = require("chalk");
dotenv.config();

function uploadImage(filename) {
  const options = {
    method: "POST",
    uri: "https://api.imgur.com/3/upload",
    headers: {
      Authorization: `Client-ID ${process.env.clientId}`
    },
    formData: {
      image: {
        value: fs.createReadStream(filename),
        options: {
          filename,
          contentType: null
        }
      }
    }
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    if (response.statusCode == 200) {
      console.log(chalk.green(`Image ${filename} successfully uploaded`));
    } else {
      console.log(chalk.red("An Error occured."));
    }
  });
}
module.exports = uploadImage;
