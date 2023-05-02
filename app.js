const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { callEncrypt, callDecrypt } = require("./encrypt_decrypt.js");
const serverless = require('serverless-http');

const app = express();
const upload = multer();

app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/', function(req, res){
  res.send("welcome to image encryption. The post and get routes are /encrypt and /decrypt !")
})

app.get("/encrypt", (req, res) => {
  res.download("encrypt.json", (err) => {
    if (err) throw err;
    fs.unlink("encrypt.json", (err) => {
      if (err) throw err;
    });
  });

});

app.get("/decrypt", (req, res) => {
  res.download("decypted.jpg", (err) => {
    if (err) throw err;
    fs.unlink("decypted.jpg", (err) => {
      if (err) throw err;
    });
  });

});

app.post("/encrypt", upload.single("image"), async function (req, res) {
  console.log(req.body.secretKey);
  callEncrypt(req.file.buffer.toString("base64"), req.body.secretKey);
  res.send("done!");
});

app.post("/decrypt", upload.single("json_file"), function (req, res) {
  console.log(req.body.secretKey);
  callDecrypt(req.file.buffer.toString("utf8"), req.body.secretKey);
  res.send("done")
});

app.listen(5000, function () {
  console.log("Server running.");
});

// module.exports.handler = serverless(app);