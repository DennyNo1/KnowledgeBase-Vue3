import CryptoJS from 'crypto-js';
//用AES加密密码
// 定义密钥和向量，注意：在实际项目中，这些应该更加随机且安全

// 定义密钥和向量，注意：在实际项目中，这些应该更加随机且安全
const SECRET_KEY = CryptoJS.enc.Utf8.parse('KnowledgeBase123'); // 确保密钥长度为16字节
const IV = CryptoJS.enc.Utf8.parse('1234567890123456'); // 确保IV长度为16字节

// 加密函数
export function encryptData(data) {
  const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

// 解密函数
export function decryptData(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData.toString();
}