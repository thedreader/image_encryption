const express= require('express');
const multer= require('multer');
const fs = require("fs");
const {callEncrypt, callDecrypt}= require('./encrypt_decrypt.js')

const app = express();
const upload= multer();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// let obj

// app.get('/encrypt', (req, res) =>{
//   res.d(fs.writeFileSync("encrypt.json", JSON.stringify(obj, null, 2)));
// })

app.get('/', (req, res) =>{
  res.json({message: "use /encrypt or /decrypt api endpoint"})
})

app.post('/encrypt',upload.single('image'), function(req, res){
  callEncrypt(req.file.buffer.toString('base64'))
  // res.redirect('/encrypt')
})

app.post('/decrypt',upload.single('json_file'), function(req, res){
  callDecrypt(req.file.buffer.toString('utf8'))
})



// function x() {
//   let cte = CryptoJS.AES.encrypt('hello', "helloworld");
//   console.log(cte);
//   console.log("\n \n");

//   const decrypted = CryptoJS.AES.decrypt(cte, "helloworld");
//   const buf = Buffer.from(decrypted.toString(), 'hex');
//   console.log(buf.toString('utf8'));
// }



app.listen(3001, function () {
  console.log("Server running.");
});
