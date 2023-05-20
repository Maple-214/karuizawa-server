import CryptoJS from 'crypto-js'
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量

export const encrypt = (pwd: string | CryptoJS.lib.WordArray) => {
  pwd = CryptoJS.enc.Utf8.parse(pwd as string) // 解析明文
  const encrypted = CryptoJS.AES.encrypt(pwd, key, {
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7, // 填充方式
    iv // 向量
  })
  return encrypted.toString() // 加密后的结果是对象，要转为文本
}

export const decrypt = (data: string | CryptoJS.lib.CipherParams) => {
  const encrypted = CryptoJS.AES.decrypt(data, key, {  // 解析的密文必须是base64编码（data） 这很关键！
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7, // 填充方式
    iv // 向量
  })
  return encrypted.toString(CryptoJS.enc.Utf8) // 加密后的结果是对象，要转为文本
}

