import CryptoJS from 'crypto-js';

const SECRET_KEY = 'KJB#nz{P":!@#%^@#^BBi1S@$#4';
export const encryptData = (data) => {
  try {  
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return ciphertext;
  } catch (error) {
    console.error('Error encrypting data:', error);
    return null;
  }
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};