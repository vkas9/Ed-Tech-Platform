const CryptoJS = require("crypto-js");

require("dotenv").config();
exports.encryptData = (data) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
    process.env.VITE_SECRET_KEY
    ).toString();
    return ciphertext;
  } catch (error) {
    console.error("Error encrypting data:", error);
    return null;
  }
};

exports.decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      ciphertext,
     process.env.VITE_SECRET_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};
