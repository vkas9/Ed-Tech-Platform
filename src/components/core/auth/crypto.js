import CryptoJS from "crypto-js";

export const encryptData = (data) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      import.meta.env.VITE_SECRET_KEY
    ).toString();
    return ciphertext;
  } catch (error) {
    console.error("Error encrypting data:", error);
    return null;
  }
};

export const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      ciphertext,
      import.meta.env.VITE_SECRET_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};
