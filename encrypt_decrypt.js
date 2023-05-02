const CryptoJS = require("crypto-js");
const fs = require("fs");

let ctstr = "";

function callEncrypt(image, secretKey) {
  let ct = CryptoJS.AES.encrypt(image, secretKey); //encrypts the image present in base64
  ctstr = ct.toString();
  const obj= {
    'image': ctstr
  }
  fs.writeFileSync("encrypt.json", JSON.stringify(obj, null, 2))

}

function callDecrypt(json_file, secretKey) {
  const y= JSON.parse(json_file);

  const decrypted = CryptoJS.AES.decrypt(y.image, secretKey); //decrypts the string and returns a hex value
  
  const bufff = Buffer.from(decrypted.toString(), 'hex'); //converts the hex value to byte array
  const val= bufff.toString('utf8') // converts the byte array to string
  const b2 = Buffer.from(val, 'base64');// converts the string to a byte array with base64 encoding

  fs.writeFileSync("decypted.jpg", b2); //recreates the image from the byte array with the base64 encoding
}

module.exports= {callEncrypt, callDecrypt}