import CryptoJS from 'crypto-js';
//用AES加密密码
// 定义密钥和向量，注意：在实际项目中，这些应该更加随机且安全
//密钥通常不变
const SECRET_KEY = 'KnowledgeBase';
//向量可以改变，使得对同一明文输出不同结果
const IV = CryptoJS.lib.WordArray.create(['c','h','i','n','a','t','e','l','e','c','o','m']);

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
  return decryptedData;
}