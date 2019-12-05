var https = require("https");
require("dotenv");
const { clientId, username } = process.env;

var options = {
  method: "GET",
  hostname: "api.imgur.com",
  path: `/3/account/${username}/albums/1`,
  headers: {
    Authorization: `Client-ID ${clientId}`
  }
};

var req = https.request(options, function(res) {
  var chunks = [];

  res.on("data", function(chunk) {
    chunks.push(chunk);
  });

  res.on("end", function(chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function(error) {
    console.error(error);
  });
});

var postData =
  "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; ------WebKitFormBoundary7MA4YWxkTrZu0gW--";

req.setHeader(
  "content-type",
  "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
);

req.write(postData);

req.end();
